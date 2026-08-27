import Link from "next/link";
import Image from "next/image";

export function ResearchListSection() {
  const articles = [
    {
      id: "01",
      type: "RESEARCH NOTE",
      date: "AUG 2026",
      title: "When real-time interaction becomes a systems problem",
      summary: "What latency, state, tool execution, verification and compute reveal when intelligence has to remain present rather than respond one turn at a time.",
      link: "#",
      image: "/images/r1.png"
    },
    {
      id: "02",
      type: "ENGINEERING INSIGHT",
      date: "AUG 2026",
      title: "What measuring the live speech stack taught us",
      summary: "Lessons from instrumenting capture, transport and speech understanding — and why perceived speed is different from measured system latency.",
      link: "#",
      image: "/images/r2.png"
    },
    {
      id: "03",
      type: "RESEARCH DIRECTION",
      date: "AUG 2026",
      title: "Should intelligence run on more than one clock?",
      summary: "Exploring architectures where perception, speech, reasoning, action and learning operate at different timescales instead of forcing every process through the same computational rhythm.",
      link: "#",
      image: "/images/r3.png"
    },
    {
      id: "04",
      type: "ARCHITECTURE NOTE",
      date: "AUG 2026",
      title: "Execution is not completion.",
      summary: "Building agents that act through software exposed a reliability gap: a successful tool call does not guarantee the intended outcome. Reliable action requires observing results, verifying state and recovering when execution diverges from intent.",
      link: "#",
      image: "/runtime_architecture.jpg"
    }
  ];

  return (
    <section className="relative w-full bg-[var(--background)] pb-32 md:pb-48 z-10">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="w-full flex items-center justify-between mb-16">
          <h2 className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-lg tracking-wide uppercase">
            03 / All Research
          </h2>
          <span className="font-[family-name:var(--font-oliveira)] text-[#666] text-sm tracking-[0.2em] uppercase hidden sm:block">
            RESEARCH & INSIGHTS
          </span>
        </div>

        {/* Editorial List */}
        <div className="w-full flex flex-col border-t border-white/10">
          {articles.map((article, idx) => (
            <Link 
              key={idx} 
              href={article.link}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between py-12 md:py-16 border-b border-white/10 transition-colors duration-500 overflow-hidden -mx-6 md:-mx-12"
            >
              {/* Background Image on Hover */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out opacity-20 md:opacity-[0.25]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black md:via-black/40" />
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-baseline gap-6 sm:gap-16 md:gap-32 w-full max-w-[900px] px-6 md:px-12">
                
                {/* Meta Column (Number, Type, Date) */}
                <div className="flex flex-col gap-1 sm:min-w-[200px]">
                  <span className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-xl md:text-2xl font-light mb-2">
                    {article.id}
                  </span>
                  <span className="text-[#888] group-hover:text-white transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-[0.1em] uppercase">
                    {article.type}
                  </span>
                  <span className="text-[#666] group-hover:text-[#aaa] transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-[0.1em] uppercase">
                    {article.date}
                  </span>
                </div>

                {/* Title Column */}
                <div className="flex flex-col gap-3 flex-1 mt-2 sm:mt-0">
                  <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl text-[#FAFAFA] font-light leading-snug group-hover:text-[#A0A0A0] transition-colors duration-300">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-[#A0A0A0] text-sm md:text-base font-light leading-relaxed group-hover:text-[#ccc] transition-colors duration-300">
                      {article.summary}
                    </p>
                  )}
                </div>

              </div>

              <div className="relative z-10 mt-8 sm:mt-0 px-6 md:px-12 text-[#666] group-hover:text-white transition-all duration-500 group-hover:translate-x-2 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
