export function CompanyCulture() {
  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32 border-t border-white/5">
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">06 / The Company We Want to Build</span>
        <h2 className="font-[family-name:var(--font-oliveira)] text-[32px] md:text-[42px] text-[#FAFAFA] leading-[1.15] tracking-tight mb-10">
          Small teams. Hard problems. Long horizons.
        </h2>
        <div className="flex flex-col gap-6 text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6] max-w-[650px]">
          <p>
            We want AdofLabs to remain research-led, technically demanding and unusually close to the systems we build. Small teams should be able to question assumptions, run experiments quickly and follow evidence even when it changes the direction of the work.
          </p>
          <p className="text-[#FAFAFA] font-normal">
            We care more about depth, speed of learning and intellectual honesty than about appearing larger than we are.
          </p>
        </div>
      </div>
    </section>
  );
}
