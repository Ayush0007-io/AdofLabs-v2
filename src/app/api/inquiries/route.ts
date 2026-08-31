import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Configure external services
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

const resendApiKey = process.env.RESEND_API_KEY!;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AdofLabs <hello@adoflabs.com>';
const ADMIN_EMAIL = process.env.INQUIRIES_ADMIN_EMAIL!;

// Validation Schema
const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(255),
  organization: z.string().trim().max(150).optional(),
  inquiryType: z.enum(['research', 'partnership', 'investment', 'join', 'media', 'general']),
  message: z.string().trim().min(5).max(5000),
  website: z.string().max(0).optional(), // Honeypot field
});

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  research: 'Research / technical discussion',
  partnership: 'Partnership',
  investment: 'Investment',
  join: 'Join AdofLabs',
  media: 'Media / press',
  general: 'General inquiry',
};

const VISITOR_EMAIL_OPENINGS: Record<string, string> = {
  research: 'Thanks for reaching out about our research and technical work.',
  partnership: 'Thanks for reaching out about a potential partnership with AdofLabs.',
  investment: 'Thanks for your interest in AdofLabs.',
  join: 'Thanks for your interest in working with AdofLabs.',
  media: 'Thanks for reaching out to AdofLabs regarding media or press.',
  general: 'Thanks for getting in touch with AdofLabs.',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server Validation
    const parsed = inquirySchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission data' }, { status: 400 });
    }
    
    const data = parsed.data;

    // Honeypot check
    if (data.website && data.website.length > 0) {
      // Act like it succeeded to confuse bots, but do nothing
      return NextResponse.json({ ok: true });
    }

    // Database check
    if (!supabase) {
      console.error('Supabase is not configured properly.');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Database Insertion (Authoritative)
    const { data: dbRecord, error: dbError } = await supabase
      .from('inquiries')
      .insert([
        {
          name: data.name,
          email: data.email,
          organization: data.organization || null,
          inquiry_type: data.inquiryType,
          message: data.message,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (dbError || !dbRecord) {
      console.error('Database insertion failed:', dbError);
      return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
    }

    // At this point, the database insert succeeded. 
    // Email failures will NOT rollback or fail the HTTP response.
    
    if (resend && ADMIN_EMAIL) {
      // Send Emails Concurrently
      const visitorEmailPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'We received your note — AdofLabs',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
            <p>Hi ${data.name},</p>
            <p>${VISITOR_EMAIL_OPENINGS[data.inquiryType]}</p>
            <p>We’ve received your message and will review it. If there’s a useful next step, someone from AdofLabs will follow up.</p>
            <br/>
            <p>— AdofLabs</p>
          </div>
        `
      });

      const adminEmailPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: data.email, // Allows admin to reply directly to the visitor
        subject: `New AdofLabs inquiry — ${INQUIRY_TYPE_LABELS[data.inquiryType]}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
            <h2>NEW ADOFLABS INQUIRY</h2>
            <p><strong>Type:</strong><br/>${INQUIRY_TYPE_LABELS[data.inquiryType]}</p>
            <p><strong>Name:</strong><br/>${data.name}</p>
            <p><strong>Email:</strong><br/>${data.email}</p>
            ${data.organization ? `<p><strong>Company:</strong><br/>${data.organization}</p>` : ''}
            <p><strong>Message:</strong><br/><pre style="white-space: pre-wrap; font-family: inherit;">${data.message}</pre></p>
            <p><strong>Submitted:</strong><br/>${new Date().toLocaleString()}</p>
            <p><strong>Inquiry ID:</strong><br/>${dbRecord.id}</p>
          </div>
        `
      });

      Promise.allSettled([visitorEmailPromise, adminEmailPromise]).then(results => {
        results.forEach((result, idx) => {
          if (result.status === 'rejected') {
            const recipient = idx === 0 ? 'Visitor' : 'Admin';
            console.error(`Failed to send ${recipient} email:`, result.reason);
          }
        });
      });
    } else {
      console.warn('Resend is not configured, skipping emails.');
    }

    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.error('Unhandled server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
