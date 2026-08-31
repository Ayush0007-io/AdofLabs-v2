"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      // We use duration and a custom easing curve instead of lerp.
      // This is much lighter on the CPU and provides a guaranteed buttery smooth
      // deceleration without dropping frames on low-end devices.
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
      // CRITICAL FOR LOW-END DEVICES: We must NOT hijack touch scrolling.
      // Native touch momentum is hardware-accelerated. Hijacking it (syncTouch)
      // forces JavaScript to calculate every pixel, which causes severe lag on weak phones.
      // smoothTouch: false, (Removed because it is invalid in this Lenis version)
    });

    let frame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
