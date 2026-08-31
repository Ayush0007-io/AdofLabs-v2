export function ProgressCompany() {
  return (
    <section className="relative w-full bg-[var(--background)] py-24 md:py-40 z-10">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">

          {/* Left Text Block */}
          <div className="flex flex-col">
            <span className="font-mono text-[#666] text-[10px] tracking-[0.2em] uppercase mb-6">03 / Company Updates</span>
            <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl lg:text-6xl text-[#FAFAFA] leading-[1.05] tracking-tight mb-8">
              What’s changing<br className="hidden lg:block" /> around the work.
            </h2>
            <p className="text-[#A0A0A0] text-base md:text-lg font-light leading-relaxed max-w-[480px]">
              Important updates from AdofLabs including collaborations, hiring, company milestones and major research announcements.
            </p>
          </div>

          {/* Right Monolithic Log Box */}
          <div className="flex flex-col md:items-end">
            <div className="w-full max-w-[500px] bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-2xl relative">
              {/* Terminal-like dots decoration */}
              <div className="flex gap-2 mb-12">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>

              <h3 className="font-mono text-sm text-[#FAFAFA] uppercase tracking-[0.1em] mb-4">Nothing to announce yet.</h3>
              <p className="text-[#666] font-mono text-xs md:text-sm leading-relaxed max-w-[340px]">
                We’ll use this space for updates that materially change what AdofLabs is doing — not routine company posts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
