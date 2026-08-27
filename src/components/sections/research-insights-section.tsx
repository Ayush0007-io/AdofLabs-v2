"use client";

import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    date: "01 — RESEARCH NOTE",
    title: "When real-time interaction becomes a systems problem",
    description: "What latency, state, tool execution, verification and compute reveal when intelligence has to remain present rather than respond one turn at a time.",
    image: "/images/r1.png",
    linkText: "READ NOTE →",
    link: "#"
  },
  {
    id: 2,
    date: "02 — ENGINEERING INSIGHT",
    title: "What measuring the live speech stack taught us",
    description: "Lessons from instrumenting capture, transport and speech understanding — and why perceived speed is different from measured system latency.",
    image: "/images/r2.png",
    linkText: "READ INSIGHT →",
    link: "#"
  },
  {
    id: 3,
    date: "03 — RESEARCH DIRECTION",
    title: "Should intelligence run on more than one clock?",
    description: "Exploring architectures where perception, speech, reasoning, action and learning operate at different timescales instead of forcing every process through the same computational rhythm.",
    image: "/images/r3.png",
    linkText: "EXPLORE RESEARCH →",
    link: "#"
  }
];

export function ResearchInsightsSection() {
  return (
    <section className="relative z-10 w-full bg-[var(--background)] py-24 md:py-32 flex flex-col items-center">
      <h2 className="font-[family-name:var(--font-oliveira)] text-4xl md:text-5xl text-[#FAFAFA] mb-16 text-center font-normal">
        Research and Insights
      </h2>

      <div className="w-full max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={article.link}
            className="flex flex-col group cursor-pointer"
          >
            {/* Image with Bottom Fade */}
            <div className="relative w-full aspect-[4/3] mb-6 rounded-t-2xl rounded-b-lg overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient matching the section background to create the seamless fade effect at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col px-2 flex-grow">
              <span className="text-[#888888] text-xs font-bold tracking-widest uppercase mb-3">
                {article.date}
              </span>
              <h3 className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-2xl font-medium leading-tight mb-4 group-hover:text-[#A0A0A0] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed font-light mb-6">
                {article.description}
              </p>
              <div className="mt-auto mb-2">
                <span className="text-xs font-bold tracking-widest text-[#FAFAFA] group-hover:text-[#A0A0A0] transition-colors duration-300 uppercase">
                  {article.linkText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <Link 
          href="/research"
          className="group inline-flex items-center gap-3 bg-white text-black h-[48px] md:h-[52px] px-6 md:px-8 rounded-full font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] font-medium tracking-wide hover:bg-[#e0e0e0] transition-colors duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
          READ MORE
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
