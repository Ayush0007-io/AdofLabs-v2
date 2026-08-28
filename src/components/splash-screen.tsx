"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after a shorter delay to make it snappier
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const text = "AdofLabs";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#111111] text-[#FAFAFA]"
        >
          <motion.div 
            className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide flex items-start"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.1 }
              }
            }}
          >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.sup
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
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
