-- Create inquiries table
CREATE TABLE public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  inquiry_type text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  
  -- Constraints
  CONSTRAINT inquiries_type_check CHECK (inquiry_type IN ('research', 'partnership', 'investment', 'join', 'media', 'general')),
  CONSTRAINT inquiries_status_check CHECK (status IN ('new', 'replied', 'archived'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- No public anonymous access policies (all access happens via service-role key on the server)

-- Add Indexes
CREATE INDEX inquiries_created_at_idx ON public.inquiries(created_at);
CREATE INDEX inquiries_status_idx ON public.inquiries(status);
