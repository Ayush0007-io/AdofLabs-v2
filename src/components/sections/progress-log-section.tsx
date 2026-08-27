import Link from "next/link";

export function ProgressLogSection() {
  return (
    <section className="relative w-full bg-[var(--background)] pb-24 md:pb-40 z-10">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* STICKY SIDEBAR (Left on desktop, hidden on mobile for cleaner flow) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col relative">
            <div className="sticky top-40 flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase">Section 01</span>
                <h3 className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-xl tracking-wide">Research & Development</h3>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase">Section 02</span>
                <h3 className="font-[family-name:var(--font-oliveira)] text-[#666] text-xl tracking-wide hover:text-[#FAFAFA] transition-colors cursor-default">Releases</h3>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase">Section 03</span>
                <h3 className="font-[family-name:var(--font-oliveira)] text-[#666] text-xl tracking-wide hover:text-[#FAFAFA] transition-colors cursor-default">Company Updates</h3>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-32">
            
            {/* 01 R&D PROGRESS */}
            <div className="flex flex-col">
              <div className="mb-16">
                <span className="lg:hidden font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase block mb-4">Section 01 / R&D</span>
                <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-6">
                  Building the foundations, one measured layer at a time.
                </h2>
                <p className="text-[#A0A0A0] text-lg font-light leading-relaxed max-w-[600px]">
                  Short updates from ongoing experiments, evaluations and engineering work.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 flex flex-col gap-24 py-8">
                
                {/* Item A1 */}
                <div className="relative">
                  {/* Timeline Node */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-mono text-[#888] text-[10px] tracking-[0.2em] uppercase mb-4">
                      BASELINE A1 · ESTABLISHED
                    </span>
                    <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl text-[#FAFAFA] tracking-tight mb-4">
                      Real-time audio transport baseline
                    </h3>
                    <p className="text-[#A0A0A0] text-base font-light leading-relaxed mb-6 max-w-[600px]">
                      Instrumented browser audio capture, WebM/Opus chunking, transport and server processing to establish the first measurable path before adding intelligence layers.
                    </p>
                    <div className="bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 inline-flex mb-8 self-start overflow-x-auto max-w-full">
                      <code className="font-mono text-[#FAFAFA]/80 text-[11px] md:text-xs whitespace-nowrap">
                        98.0 ms best observed round-trip · 18.7 ms server processing
                      </code>
                    </div>
                    <Link href="/lab/001" className="flex items-center gap-3 font-[family-name:var(--font-oliveira)] text-sm text-[#FAFAFA] tracking-widest uppercase hover:text-[#A0A0A0] transition-colors group">
                      VIEW PROGRESS
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

                {/* Item A2 */}
                <div className="relative">
                  {/* Timeline Node - Active/In Progress style */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-amber-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-mono text-amber-500/80 text-[10px] tracking-[0.2em] uppercase mb-4">
                      BASELINE A2 · IN PROGRESS
                    </span>
                    <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl text-[#FAFAFA] tracking-tight mb-4">
                      Speech understanding enters the measured path
                    </h3>
                    <p className="text-[#A0A0A0] text-base font-light leading-relaxed mb-6 max-w-[600px]">
                      Extending the A1 baseline with Sarvam Saaras v3 STT and measuring what changes when speech understanding becomes part of the loop.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 inline-flex mb-8 self-start overflow-x-auto max-w-full">
                      <code className="font-mono text-amber-500/90 text-[11px] md:text-xs whitespace-nowrap">
                        260.5 ms first instrumented audio-to-transcript round-trip
                      </code>
                    </div>
                    <Link href="#" className="flex items-center gap-3 font-[family-name:var(--font-oliveira)] text-sm text-[#FAFAFA] tracking-widest uppercase hover:text-[#A0A0A0] transition-colors group">
                      VIEW CURRENT WORK
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* 02 RELEASES */}
            <div className="flex flex-col pt-16 border-t border-white/10">
              <div className="mb-12">
                <span className="lg:hidden font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase block mb-4">Section 02 / Releases</span>
                <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-6">
                  Work ready to leave the lab.
                </h2>
                <p className="text-[#A0A0A0] text-lg font-light leading-relaxed max-w-[600px]">
                  Technical reports, demos, models, tools and other research outputs that we make publicly available.
                </p>
              </div>

              {/* Empty State Box */}
              <div className="w-full rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 border border-white/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#666]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-oliveira)] text-xl text-[#FAFAFA] mb-3">No public releases yet.</h3>
                <p className="text-[#888] font-light max-w-[400px]">
                  Our first releases will appear here when the work is ready to be inspected, tested or used outside AdofLabs.
                </p>
              </div>
            </div>

            {/* 03 COMPANY UPDATES */}
            <div className="flex flex-col pt-16 border-t border-white/10">
              <div className="mb-12">
                <span className="lg:hidden font-mono text-[#444] text-[10px] tracking-[0.2em] uppercase block mb-4">Section 03 / Company</span>
                <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-6">
                  What’s changing around the work.
                </h2>
                <p className="text-[#A0A0A0] text-lg font-light leading-relaxed max-w-[600px]">
                  Important updates from AdofLabs including collaborations, hiring, company milestones and major research announcements.
                </p>
              </div>

              {/* Empty State Box */}
              <div className="w-full rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 border border-white/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#666]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-oliveira)] text-xl text-[#FAFAFA] mb-3">Nothing to announce yet.</h3>
                <p className="text-[#888] font-light max-w-[400px]">
                  We’ll use this space for updates that materially change what AdofLabs is doing — not routine company posts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
