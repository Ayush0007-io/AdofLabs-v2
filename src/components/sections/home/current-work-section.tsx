"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export function CurrentWorkSection() {
  return (
    <section className="relative z-10 w-full bg-[var(--background)] py-16 md:py-24 flex justify-center text-[#FAFAFA] overflow-hidden">
      <div className="w-full max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[115%] -ml-[7.5%] md:w-[65%] md:ml-0 flex items-start justify-center group mb-16 md:mb-0 mt-8 md:mt-0"
          >
            <Image
              src="/images/what we build new.png"
              alt="What we build"
              width={1600}
              height={1600}
              quality={100}
              unoptimized
              className="w-full h-auto object-contain scale-[1.3] md:scale-[1.4] origin-center md:origin-right transition-transform duration-700 group-hover:scale-[1.35] md:group-hover:scale-[1.45]"
              priority
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[35%] flex flex-col justify-start pt-12 md:pt-4"
          >
            <h2 className="font-[family-name:var(--font-oliveira)] text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] font-light tracking-[-0.02em] mb-8 text-[#FAFAFA] text-pretty">
              We’re developing architectures for intelligence that can remain continuously aware and act in real time.
            </h2>

            <div className="w-full h-px bg-white/10 mb-8" />

            <p className="text-[#A0A0A0] text-[15px] md:text-[16px] leading-[1.7] font-light mb-10 max-w-[580px]">
              Instead of forcing perception, memory, reasoning, tool use and verification through one expensive loop, we’re exploring how they can operate concurrently at the speed and compute each requires, while sharing an evolving understanding of the world. The goal is intelligence that stays responsive, revises its understanding as conditions change, and can act toward verifiable outcomes.
            </p>

            <div>
              <Link prefetch={true}
                href="/research"
                className="group/btn inline-flex items-center justify-center bg-[#1A1A1A] border border-[#333] text-[#EDEDED] font-medium rounded-full hover:bg-[#222] hover:border-[#444] transition-all duration-300 text-[13px] md:text-[14px] tracking-wider px-8 py-4 gap-3 whitespace-nowrap uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Explore our research
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-1 opacity-90">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
