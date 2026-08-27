"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

import { progressCards, type ProgressCardContent } from "@/content/home/progress";

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
          {progressCards.map((card) => (
            <ProgressCard
              key={card.id} 
              card={card}
              className="w-[85vw] md:w-[800px] lg:w-[900px] md:h-[600px] md:min-h-0 flex-shrink-0"
            />
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
          {progressCards.map((card) => (
            <ProgressCard
              key={`mobile-${card.id}`} 
              card={card}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressCard({ card, className }: { card: ProgressCardContent; className?: string }) {
  return (
    <div
      className={`h-auto min-h-[480px] bg-[#0F0F0F] rounded-[32px] flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-10 relative group transition-all duration-700 md:hover:-translate-y-2 md:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ${className || ""}`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 -1px 1px rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      {/* Subtle top-left glare */}
      <div className="hidden md:block absolute inset-0 rounded-[32px] pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />

      {/* Left: Image / Placeholder */}
      <div
        className={`w-full md:w-1/2 relative overflow-hidden flex items-center justify-center ${
          card.image
            ? "aspect-[4/3] sm:aspect-video -mt-2 rounded-[20px] bg-[#050505] md:h-full md:aspect-auto md:mt-0 md:rounded-[24px]"
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
              className="object-cover opacity-90 transition-transform duration-700 md:group-hover:scale-105"
            />
            {/* Inner shadow/vignette to blur and soften the edges of the cropped image */}
            <div
              className="hidden md:block absolute inset-0 z-10 pointer-events-none rounded-[24px]"
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
        <div className="hidden md:block absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* Right: Content */}
      <div className="w-full flex flex-col justify-center relative z-10 py-2 md:w-1/2 md:py-4 md:pr-4">
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

        <p className="text-[#A0A0A0] text-[17px] md:text-[19px] leading-[1.6] font-light mb-8 md:max-w-[400px]">
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
  );
}
