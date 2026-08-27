"use client";

import { motion } from "motion/react";

export function InsightsHero() {
  return (
    <section className="relative w-full bg-[var(--background)] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden z-10 flex flex-col justify-center">
      
      {/* Hero Content Group (Perfectly Centered) */}
      <div className="w-full flex flex-col items-center text-center z-10 px-[var(--page-gutter)]">
        
        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[700px] mx-auto flex flex-col items-center"
        >
          <h1 
            className="text-[var(--foreground)] font-[family-name:var(--font-oliveira)] font-light tracking-[-0.02em] text-center w-full"
            style={{ fontSize: 'clamp(36px, 8vw, 72px)', lineHeight: '1.1' }}
          >
            Ideas shaped by the work.
          </h1>
          
          <p className="text-[var(--muted-foreground)] text-[15px] md:text-[17px] leading-[1.6] font-light text-justify [text-align-last:center] mt-[24px] max-w-[650px]">
            Research notes, engineering insights and evaluations emerging from what we build and measure at AdofLabs.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
