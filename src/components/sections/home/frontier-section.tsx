import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FrontierSection() {
  const text = "AdofLabs started with one question: how do we build intelligence that maintains an evolving understanding of the world while perceiving, reasoning and acting continuously at real world speed, within practical compute, and toward verifiable outcomes?";
  
  return (
    <section 
      id="frontier" 
      className="relative z-10 w-full overflow-hidden bg-[var(--background)] border-t border-white/5"
    >
      <div className="w-full max-w-[1400px] mx-auto px-[var(--page-gutter)] py-24 sm:py-32 md:py-40 lg:py-48 flex items-center justify-center min-h-[70svh] md:min-h-[80svh]">
        <div className="max-w-[1040px] text-center">
          <ScrollReveal 
            text={text}
            className="text-[var(--foreground)] font-[family-name:var(--font-oliveira)] text-[clamp(1.75rem,4.25vw,3.5rem)] leading-[1.18] md:leading-[1.15] font-light text-center text-pretty" 
          />
        </div>
      </div>
    </section>
  );
}
