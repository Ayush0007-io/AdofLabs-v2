import Link from "next/link";

export function CompanyStatus() {
  return (
    <section className="relative w-full bg-[var(--background)] pb-20 md:pb-32">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
        
        <div className="w-full bg-[#050505] border border-white/5 p-10 md:p-16 rounded-2xl flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          
          <div className="w-full md:w-1/3 flex flex-col">
             <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-6 block">05 / Where We Are Now</span>
             <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] text-[#FAFAFA] leading-[1.15] tracking-tight">
               Early, by design.
             </h2>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <p className="text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6]">
              AdofLabs is currently in the research and development stage. Our first proving ground is real-time interaction, where speech, reasoning, state, tools and computation meet under tight timing constraints.
            </p>
            <p className="text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6] mb-4">
              We are evaluating existing systems, establishing our own baselines and using those measurements to guide work on the model and runtime architecture underneath them.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 pt-2">
              <Link href="/progress" className="font-mono text-[11px] tracking-[0.15em] text-[#FAFAFA] uppercase hover:text-[#A0A0A0] transition-colors group flex items-center gap-2">
                FOLLOW PROGRESS <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/lab" className="font-mono text-[11px] tracking-[0.15em] text-[#FAFAFA] uppercase hover:text-[#A0A0A0] transition-colors group flex items-center gap-2">
                ENTER THE LAB <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
