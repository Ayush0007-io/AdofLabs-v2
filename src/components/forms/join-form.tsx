"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type FormState = "idle" | "submitting" | "success" | "error";

export function JoinForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    otherInquiry: "",
    links: "",
    message: "",
    website: "", // honeypot
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client validation (UX only)
    if (!formData.name.trim() || !formData.email.trim() || !formData.inquiryType || !formData.message.trim()) {
      return;
    }
    if (formData.inquiryType === "others" && !formData.otherInquiry.trim()) {
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setFormState("success");
    } catch (err) {
      console.error(err);
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#111] border border-[#222] p-8 md:p-12 rounded-2xl"
      >
        <h3 className="text-xl md:text-2xl font-light text-[#FAFAFA] mb-4">MESSAGE RECEIVED.</h3>
        <p className="text-[#A0A0A0] leading-relaxed mb-8">
          Thanks for reaching out. We’ll review your note and follow up if there’s a useful next step.
        </p>
        <button 
          onClick={() => router.push("/")}
          type="button"
          className="group inline-flex items-center text-[#FAFAFA] text-sm uppercase tracking-widest font-medium hover:text-[#CCC] transition-colors"
        >
          Back to AdofLabs
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Honeypot field */}
        <div aria-hidden="true" className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden pointer-events-none">
          <label htmlFor="website" tabIndex={-1}>Website</label>
          <input 
            type="text" 
            id="website" 
            name="website" 
            value={formData.website} 
            onChange={handleChange}
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[13px] text-[#A0A0A0]">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Your name"
            required 
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[13px] text-[#A0A0A0]">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="you@email.com"
            required 
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="inquiryType" className="text-[13px] text-[#A0A0A0]">I'm reaching out about</label>
          <select 
            id="inquiryType" 
            name="inquiryType" 
            required 
            value={formData.inquiryType}
            onChange={handleChange}
            style={{ colorScheme: 'dark', backgroundColor: '#131313', color: formData.inquiryType ? '#FAFAFA' : '#555' }}
            className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors cursor-pointer"
          >
            <option value="" disabled style={{ backgroundColor: '#000000', color: '#555' }}>Select a topic...</option>
            <option value="join" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Join AdofLabs</option>
            <option value="research" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Research / technical discussion</option>
            <option value="partnership" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Partnership</option>
            <option value="investment" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Investment</option>
            <option value="general" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>General inquiry</option>
            <option value="others" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Others</option>
          </select>
        </div>

        {formData.inquiryType === "others" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-2"
          >
            <label htmlFor="otherInquiry" className="text-[13px] text-[#A0A0A0]">Please specify</label>
            <input 
              type="text" 
              id="otherInquiry" 
              name="otherInquiry" 
              required
              value={formData.otherInquiry}
              onChange={handleChange}
              className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] text-[#FAFAFA] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors"
            />
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="links" className="text-[13px] text-[#A0A0A0]">Links — optional</label>
          <input 
            type="text" 
            id="links" 
            name="links"
            placeholder="GitHub, LinkedIn, portfolio, paper..."
            value={formData.links}
            onChange={handleChange}
            className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[13px] text-[#A0A0A0]">Message</label>
          {formData.inquiryType === "join" && (
            <p className="text-[12px] text-[#888] mb-1">
              Tell us what you’ve worked on, what you’re unusually good at, and what kind of problem you want to spend time solving.
            </p>
          )}
          <textarea 
            id="message" 
            name="message" 
            required 
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#131313] border border-transparent rounded-lg px-4 py-3 text-[15px] text-[#FAFAFA] focus:outline-none focus:bg-[#181818] focus:border-[#333] transition-colors resize-y"
          />
        </div>

        {formState === "error" && (
          <div className="text-red-400 text-sm py-2 px-4 bg-red-400/10 rounded border border-red-400/20" role="alert">
            We couldn’t send your message. Please try again.
          </div>
        )}

        <button 
          type="submit" 
          disabled={formState === "submitting"}
          className="mt-4 group flex items-center justify-center self-end bg-[#FAFAFA] text-black font-semibold rounded-full hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:bg-[#333] disabled:text-[#888] disabled:cursor-not-allowed transition-all duration-300 text-[11px] tracking-[0.1em] uppercase px-[32px] h-[48px] gap-2 whitespace-nowrap"
        >
          {formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
          {formState !== "submitting" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
