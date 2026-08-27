"use client";

export function CompanyHero() {
  return (
    <section className="relative w-full bg-[var(--background)] pt-40 pb-16 md:pt-48 md:pb-24 flex flex-col items-center">
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-12 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
        <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">01 / Company</span>
        <h1 className="font-[family-name:var(--font-oliveira)] text-[36px] md:text-[48px] lg:text-[56px] text-[#FAFAFA] leading-[1.1] tracking-tight mb-10">
          Built from the problems we couldn&apos;t ignore.
        </h1>
        <p className="text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6] max-w-[650px] mx-auto text-left md:text-center">
          AdofLabs began by building AI systems for real businesses. Working close to real users exposed problems that demos often hide: latency, broken interaction, lost state, unreliable tool execution, verification failures and the cost of keeping intelligence running. Those problems pushed us deeper into models, systems and architecture.
        </p>
      </div>
    </section>
  );
}
