
import Image from "next/image";
import Link from "next/link";

import { homeLabs } from "@/content/home/labs";

export function LabsSection() {
  return (
    <section className="relative z-10 w-full bg-[var(--background)] py-24 md:py-32 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mb-16 md:mb-24">
        <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] mb-6 tracking-tight">
          Built, tested, and released from our research.
        </h2>
        <p className="text-[#A0A0A0] text-lg md:text-xl font-light leading-relaxed max-w-[600px]">
          Reports, experiments, demos and systems that make our work inspectable.
        </p>
      </div>

      <div className="w-full border-t border-white/10">
        {homeLabs.map((lab) => (
          <div
            key={lab.id}
            className="group relative w-full border-b border-white/10 overflow-hidden transition-colors duration-500"
          >
            {/* Background Image on Hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <Image
                src={lab.image}
                alt={lab.title}
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row gap-8 lg:gap-16">

              {/* Left Column: Tag */}
              <div className="w-full lg:w-1/4 flex-shrink-0">
                <span className="text-[#A0A0A0] group-hover:text-white transition-colors duration-300 text-sm tracking-widest font-bold uppercase">
                  {lab.tag}
                </span>
              </div>

              {/* Right Column: Details */}
              <div className="w-full lg:w-3/4 flex flex-col">
                <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl lg:text-4xl text-[#FAFAFA] mb-6 leading-tight">
                  {lab.title}
                </h3>

                <p className="text-[#888] group-hover:text-[#ccc] transition-colors duration-300 text-base md:text-lg leading-relaxed font-light mb-12 max-w-[700px]">
                  {lab.description}
                </p>

                <div className="mb-10 flex flex-col md:flex-row gap-10 md:gap-16">
                  {lab.results.map((resultGroup, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-2">
                        {resultGroup.label}
                      </h4>
                      <div className="flex flex-col gap-3">
                        {resultGroup.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {item.value.trim() !== "" && (
                              <code className="bg-white/10 text-white group-hover:bg-white/20 px-2 py-1 rounded text-sm font-mono transition-colors duration-300">
                                {item.value}
                              </code>
                            )}
                            <span className="text-[#777] group-hover:text-[#aaa] transition-colors duration-300 text-sm leading-relaxed">
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between mt-4">
                  <div className="text-[#555] group-hover:text-[#888] transition-colors duration-300 font-mono text-xs uppercase tracking-widest">
                    {lab.specs}
                  </div>

                  {lab.linkText && lab.linkUrl && (
                    <Link
                      href={lab.linkUrl}
                      className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors uppercase group/link"
                    >
                      {lab.linkText}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/link:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
