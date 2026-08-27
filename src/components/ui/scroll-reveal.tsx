"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "motion/react";

interface ScrollRevealProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ScrollReveal({ text, children, className }: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start 85%", "end 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeOpacity = useTransform(smoothProgress, [0, 1], [0.2, 1]);
  const fadeY = useTransform(smoothProgress, [0, 1], [20, 0]);

  if (!text) {
    return (
      <motion.div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={className}
        style={{
          opacity: fadeOpacity,
          y: fadeY,
        }}
      >
        {children}
      </motion.div>
    );
  }

  const words = text.split(" ");

  return (
    <p
      ref={containerRef as React.RefObject<HTMLParagraphElement>}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => {
        // Distribute the start times between 0 and 0.8, leaving 0.2 for the final word's animation duration
        const start = (i / words.length) * 0.8;
        // Each word takes 20% of the total scroll distance to fully appear
        const end = start + 0.2;
        
        return (
          <Word
            key={i}
            word={word}
            progress={smoothProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blurValue = useTransform(progress, range, [12, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <span
      className="inline-block"
      style={{ marginRight: "0.25em", marginTop: "0.15em" }}
    >
      <motion.span
        style={{
          opacity,
          filter,
          y,
          display: "inline-block",
          willChange: "opacity, filter, transform",
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

