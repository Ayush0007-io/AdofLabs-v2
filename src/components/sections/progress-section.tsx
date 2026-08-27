"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "APPLIED RESEARCH + EVALS",
    status: "ACTIVE",
    statusColor: "text-white border-white/30 bg-white/10",
    text: "We’re studying current real-time systems and building our own evaluations around response timing, interruptions, naturalness, state continuity, tool completion and inference cost.",
    subtext: null,
    image: "/images/adoflabs-applied-research-under-500kb.webp"
  },
  {
    id: 2,
    title: "REALTIME BASELINE A1",
    status: "COMPLETED",
    statusColor: "text-[#FAFAFA] border-white/20 bg-white/10",
    text: "Built and instrumented the first live audio transport path.",
    subtext: "320 ms → ~100–121 ms\nObserved round-trip latency across successive runs.",
    image: "/images/voice_baseline_A1.webp"
  },
  {
    id: 3,
    title: "REALTIME BASELINE A2",
    status: "IN TESTING",
    statusColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    text: "Added speech understanding to the same measured pipeline.",
    subtext: "The first integration exposed an empty-transcription failure. We’re isolating it before adding another layer.",
    image: "/images/voice_applied_research_A2.webp"
  }
];

export function ProgressSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, (pos) => {
    return `calc(-${pos * 100}% + ${pos * 100}vw)`;
  });

  return (
    <section ref={targetRef} className="relative z-10 md:h-[300vh] h-auto bg-[var(--background)]">
      {/* Desktop View */}
      <div className="hidden md:flex sticky top-0 h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 lg:px-24 w-max">
          
          {/* Intro Text for the section */}
          <div className="w-[300px] md:w-[400px] flex-shrink-0 flex flex-col justify-center pr-10">
            <h2 className="font-[family-name:var(--font-oliveira)] text-4xl md:text-5xl text-[#FAFAFA] mb-6">
              Our Progress
            </h2>
            <p className="text-[#A0A0A0] text-lg font-light leading-relaxed">
              We are working in the open. Here is a look at what we are building, measuring, and testing right now.
            </p>
          </div>

          {/* Cards */}
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="w-[85vw] md:w-[800px] lg:w-[900px] h-auto min-h-[480px] md:h-[600px] md:min-h-0 flex-shrink-0 bg-[#0F0F0F] rounded-[32px] flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-10 relative group transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 -1px 1px rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              {/* Subtle top-left glare */}
              <div className="absolute inset-0 rounded-[32px] pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />

              {/* Left: Image / Placeholder */}
              <div 
                className={`w-full md:w-1/2 relative overflow-hidden flex items-center justify-center ${
                  card.image 
                    ? "h-[220px] md:h-full md:bg-[#050505] md:rounded-[24px]" 
                    : "hidden md:flex h-full bg-[#050505] rounded-[24px]"
                }`}
                style={!card.image ? {
                  boxShadow: "inset 0 10px 40px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.03)"
                } : {}}
              >
                {card.image ? (
                  <>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain md:object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Inner shadow/vignette to blur and soften the edges of the cropped image */}
                    <div 
                      className="absolute inset-0 z-10 pointer-events-none rounded-[24px]"
                      style={{ boxShadow: "inset 0 0 60px 20px #050505" }}
                    />
                  </>
                ) : (
                  <>
                    {/* Elegant subtle pattern */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <span className="relative z-10 text-[#444] font-[family-name:var(--font-oliveira)] text-sm md:text-base tracking-widest uppercase shadow-black drop-shadow-md">Image Space</span>
                  </>
                )}
                {/* Hover shine */}
                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10 py-4 md:pr-4">
                <div className="flex items-center gap-3 mb-8 md:mb-10">
                  <div 
                    className={`px-4 py-1.5 text-[11px] font-bold tracking-widest rounded-full border uppercase shadow-lg ${card.statusColor}`}
                    style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.3)" }}
                  >
                    {card.status}
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05] text-[#FAFAFA] mb-6 tracking-[-0.01em] drop-shadow-md">
                  {card.title}
                </h3>
                
                <p className="text-[#A0A0A0] text-[17px] md:text-[19px] leading-[1.6] font-light mb-8 max-w-[400px]">
                  {card.text}
                </p>

                {card.subtext && (
                  <div className="mt-auto">
                    <div className="h-px w-full bg-white/[0.08] mb-6 shadow-[0_1px_0_rgba(0,0,0,0.8)]" />
                    <p className="text-[#888] text-sm md:text-[15px] whitespace-pre-line font-light leading-relaxed">
                      {card.subtext}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Outro space to ensure the last card isn't completely flush with the screen edge if not desired, 
              but since we use exact calc, a small padding element works well */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden flex-col gap-10 px-6 py-20">
        <div className="w-full flex flex-col justify-center">
          <h2 className="font-[family-name:var(--font-oliveira)] text-4xl text-[#FAFAFA] mb-4">
            Our Progress
          </h2>
          <p className="text-[#A0A0A0] text-lg font-light leading-relaxed">
            We are working in the open. Here is a look at what we are building, measuring, and testing right now.
          </p>
        </div>

        <div className="flex flex-col gap-12 mt-4">
          {cards.map((card) => (
            <div 
              key={`mobile-${card.id}`} 
              className="w-full h-auto min-h-[480px] bg-[#0F0F0F] rounded-[32px] flex flex-col p-6 gap-6 relative"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 -1px 1px rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              {card.image && (
                <div className="w-full aspect-[4/3] sm:aspect-video relative overflow-hidden flex items-center justify-center -mt-2 rounded-[20px] bg-[#050505]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              )}

              <div className="w-full flex flex-col justify-center relative z-10 py-2">
                <div className="flex items-center gap-3 mb-8">
                  <div 
                    className={`px-4 py-1.5 text-[11px] font-bold tracking-widest rounded-full border uppercase shadow-lg ${card.statusColor}`}
                    style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.3)" }}
                  >
                    {card.status}
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-oliveira)] text-3xl leading-[1.05] text-[#FAFAFA] mb-6 tracking-[-0.01em] drop-shadow-md">
                  {card.title}
                </h3>
                
                <p className="text-[#A0A0A0] text-[17px] leading-[1.6] font-light mb-8">
                  {card.text}
                </p>

                {card.subtext && (
                  <div className="mt-auto">
                    <div className="h-px w-full bg-white/[0.08] mb-6 shadow-[0_1px_0_rgba(0,0,0,0.8)]" />
                    <p className="text-[#888] text-sm whitespace-pre-line font-light leading-relaxed">
                      {card.subtext}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
