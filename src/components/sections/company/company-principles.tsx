export function CompanyPrinciples() {
  const principles = [
    { title: "Measure before claiming", desc: "We instrument the system and establish baselines before deciding what needs to change." },
    { title: "Change one layer at a time", desc: "We isolate bottlenecks before adding complexity, so improvements and failures remain attributable." },
    { title: "Go deeper only when the evidence points there", desc: "We do not replace existing models or architectures simply because building our own sounds more ambitious. We move deeper when the current layer becomes the constraint." },
    { title: "Publish what survives the work", desc: "Progress can be messy. What enters the Lab should be measurable, reproducible enough to inspect and honest about its limitations." }
  ];

  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          <div className="w-full md:w-1/3 flex flex-col relative">
            <div className="md:sticky md:top-32">
              <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">04 / How We Work</span>
              <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] text-[#FAFAFA] leading-[1.15] tracking-tight">
                Evidence before architecture.
              </h2>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-12 md:gap-16">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-col border-t border-white/5 pt-8 first:border-0 first:pt-0">
                <span className="font-mono text-[#FAFAFA] text-[10px] tracking-[0.2em] uppercase mb-4 block">Principle 0{i+1}</span>
                <h3 className="font-[family-name:var(--font-oliveira)] text-[20px] md:text-[24px] text-[#FAFAFA] tracking-tight mb-4">{p.title}</h3>
                <p className="text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6] max-w-[500px]">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
