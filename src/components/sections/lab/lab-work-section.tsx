import Link from "next/link";

export function LabWorkSection() {
  return (
    <section className="relative w-full bg-[var(--background)] pb-24 md:pb-32 z-10">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="w-full flex items-center justify-between mb-16">
          <h2 className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-lg tracking-wide uppercase">
            02 / Lab Work
          </h2>
        </div>
        
        {/* Lab Items Container */}
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* ITEM 1: BASELINE A1 */}
          <div className="w-full flex flex-col border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-colors duration-500">
            {/* Top section (Split) */}
            <div className="flex flex-col md:flex-row w-full border-b border-white/10">
               {/* Left Content */}
               <div className="w-full md:w-3/5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                 <div className="flex items-center justify-between mb-8">
                   <span className="font-mono text-[#888] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                     LAB / 001 · BASELINE A1
                   </span>
                   <span className="px-3 py-1 border border-white/20 text-[#FAFAFA] text-[10px] tracking-widest uppercase rounded-full bg-white/[0.03]">
                     ESTABLISHED
                   </span>
                 </div>
                 <h3 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-4xl lg:text-[42px] text-[#FAFAFA] leading-[1.1] tracking-tight mb-6">
                   Instrumenting the real-time audio path.
                 </h3>
                 <p className="text-[#A0A0A0] text-[16px] md:text-[18px] font-light leading-relaxed">
                   A controlled baseline measuring browser capture, WebM/Opus chunking, transport and server processing before introducing speech or model inference.
                 </p>
               </div>
               
               {/* Right Metrics */}
               <div className="w-full md:w-2/5 flex flex-col">
                 <div className="flex-1 p-8 md:p-12 border-b border-white/10 flex flex-col justify-center">
                   <span className="font-[family-name:var(--font-oliveira)] text-5xl md:text-6xl text-[#FAFAFA] tracking-tight mb-3">
                     98.0 ms
                   </span>
                   <span className="font-mono text-[#888] text-[10px] md:text-xs uppercase tracking-[0.1em] leading-relaxed">
                     Best observed client round-trip
                   </span>
                 </div>
                 <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                   <span className="font-[family-name:var(--font-oliveira)] text-5xl md:text-6xl text-[#FAFAFA] tracking-tight mb-3">
                     18.7 ms
                   </span>
                   <span className="font-mono text-[#888] text-[10px] md:text-xs uppercase tracking-[0.1em] leading-relaxed">
                     Best observed server processing
                   </span>
                 </div>
               </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:px-12 md:py-6 bg-white/[0.02]">
              <span className="font-mono text-[#666] text-[10px] md:text-xs tracking-[0.15em] uppercase mb-4 sm:mb-0">
                48 kHz · Mono · WebM/Opus · ~8.3 chunks/s
              </span>
              <Link 
                href="/lab/001" 
                className="flex items-center gap-3 font-[family-name:var(--font-oliveira)] text-[13px] text-[#FAFAFA] tracking-[0.15em] uppercase hover:text-[#A0A0A0] transition-colors"
              >
                OPEN TECHNICAL REPORT 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="w-full flex flex-col border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-colors duration-500">
            {/* Top section */}
            <div className="flex flex-col md:flex-row w-full border-b border-white/10">
               {/* Content */}
               <div className="w-full p-8 md:p-12 relative overflow-hidden">
                 {/* Subtle glowing accent for "In Progress" status */}
                 <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-900/10 blur-[80px] pointer-events-none rounded-full" />
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                   <span className="font-mono text-[#888] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                     LAB / 002 — CONCURRENT EXECUTION
                   </span>
                   <span className="px-3 py-1 border border-amber-500/30 text-amber-500 text-[10px] tracking-widest uppercase rounded-full bg-amber-500/5">
                     IN PROGRESS
                   </span>
                 </div>
                 <h3 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-4xl lg:text-[42px] text-[#FAFAFA] leading-[1.1] tracking-tight mb-6 relative z-10 max-w-[800px]">
                   Keeping interaction alive while actions execute.
                 </h3>
                 <p className="text-[#A0A0A0] text-[16px] md:text-[18px] font-light leading-relaxed relative z-10 md:w-3/4 max-w-[900px]">
                   We’re testing whether speech, state updates and tool execution can run concurrently instead of forcing the system into a sequential listen → reason → act → wait → respond pipeline. The goal is to keep the interaction responsive while work continues in the background, without losing state or execution context and we are in working we didnt invent numbers yet
                 </p>
               </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:px-12 md:py-6 bg-white/[0.02]">
              <span className="font-mono text-[#666] text-[10px] md:text-xs tracking-[0.15em] uppercase mb-4 sm:mb-0">
                Concurrent pipeline · Background execution · Stateful context
              </span>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
