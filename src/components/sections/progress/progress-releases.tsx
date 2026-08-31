export function ProgressReleases() {
  return (
    <section className="relative w-full bg-white/[0.015] py-24 md:py-32 z-10 border-b border-white/5">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto flex flex-col items-center text-center">

        <span className="font-mono text-[#666] text-[10px] tracking-[0.2em] uppercase mb-6">02 / Releases</span>

        <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-6 max-w-[700px]">
          Work ready to leave the lab.
        </h2>

        <p className="text-[#A0A0A0] text-base md:text-lg font-light leading-relaxed max-w-[600px] mb-16">
          Technical reports, demos, models, tools and other research outputs that we make publicly available.
        </p>

        {/* Huge Empty State Architectural Box */}
        <div className="w-full max-w-[900px] h-[300px] md:h-[400px] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group bg-[var(--background)]">

          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <span className="font-[family-name:var(--font-oliveira)] text-2xl text-[#FAFAFA] mb-4">No public releases yet.</span>
            <p className="text-[#888] font-light max-w-[400px] leading-relaxed">
              Our first releases will appear here when the work is ready to be inspected, tested or used outside AdofLabs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
