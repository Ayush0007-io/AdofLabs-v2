export function CompanyDirection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 md:py-32 border-y border-white/5">
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">03 / Direction</span>
        <h2 className="font-[family-name:var(--font-oliveira)] text-[32px] md:text-[42px] text-[#FAFAFA] leading-[1.15] tracking-tight mb-10">
          Make intelligence capable of staying with the world as it changes.
        </h2>
        <div className="flex flex-col gap-6 text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6] max-w-[650px]">
          <p>
            Our work is directed toward models and systems that can maintain understanding over time, interact naturally, reason when needed, take action, learn from feedback and operate within practical computational limits.
          </p>
          <p>
            We are starting with real-time interaction because it exposes these constraints immediately. The broader direction extends beyond any single interface toward intelligence that can eventually operate across software, devices and physical environments.
          </p>
        </div>
      </div>
    </section>
  );
}
