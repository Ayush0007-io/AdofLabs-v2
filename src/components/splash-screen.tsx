"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 500ms duration for the splash to appear on every page transition as requested
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const text = "AdofLabs";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Use only transform (y) and opacity for GPU acceleration, avoiding layout thrashing on low-end devices
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          // Silky smooth cinematic curve
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#111111] text-[#FAFAFA] pointer-events-none"
        >
          <motion.div
            className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide flex items-start"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0.1 }
              }
            }}
          >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  // Only animate opacity and Y translation (GPU optimized)
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.sup
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } }
              }}
              className="text-lg md:text-xl ml-1 mt-1"
            >
              ®
            </motion.sup>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
