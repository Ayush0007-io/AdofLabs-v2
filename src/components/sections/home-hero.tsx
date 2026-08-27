"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function HomeHero() {
  const words = ["listen.", "see.", "reason.", "act.", "verify."];
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Slow down playback so it's ambient and not distracting
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIndex((current) => (current + 1) % words.length);
        setIsFading(false);
      }, 500); 
    }, 3000); 
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative w-full min-h-[100svh] pt-[76px] bg-[var(--background)] flex flex-col justify-center overflow-hidden">
      
      {/* Background Video (Fixed behind everything) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Very dark overlay to push video into background and keep text readable */}
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-30 scale-105"
          src="/Sky.webm" 
        />
      </div>

      {/* Hero Content Group (Perfectly Centered) */}
      <div className="w-full flex flex-col items-center text-center relative px-[var(--page-gutter)]">
        
        <div className="w-full max-w-[700px] mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 
            className="text-[var(--foreground)] font-[family-name:var(--font-oliveira)] font-light tracking-[-0.02em] text-center w-full"
            style={{ fontSize: 'clamp(36px, 8vw, 72px)', lineHeight: '1.1' }}
          >
            Building intelligence <br />
            that can{" "}
            <span 
              className={`inline-block transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
            >
              {words[wordIndex]}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-[var(--muted-foreground)] text-[15px] md:text-[17px] leading-[1.6] font-light text-justify [text-align-last:center] mt-[24px] max-w-[650px]">
            AdofLabs is building real time intelligence that forms an evolving understanding of the world, adapts as it changes, and turns intent into verified action.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-row flex-wrap items-center justify-center w-full mt-[40px] gap-[16px] sm:gap-[24px]">
          {/* Primary Button (Larger) */}
          <Link 
            href="/research" 
            className="group flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] font-semibold rounded-full hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[10px] sm:text-[11px] tracking-[0.1em] uppercase px-[24px] sm:px-[32px] h-[44px] sm:h-[48px] gap-2 whitespace-nowrap"
          >
            <span className="transition-transform duration-300 group-hover:scale-105">Explore Research</span> 
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          
          {/* Secondary Button (Glassmorphic) */}
          <Link 
            href="/lab" 
            className="group flex items-center justify-center bg-white/5 border border-white/20 text-[var(--foreground)] font-semibold rounded-full hover:border-white/40 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[10px] sm:text-[11px] tracking-[0.1em] uppercase px-[24px] sm:px-[32px] h-[44px] sm:h-[48px] whitespace-nowrap gap-2"
          >
            <span className="transition-transform duration-300 group-hover:scale-105">Explore the Lab</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300 opacity-70">→</span>
          </Link>
        </div>
      </div>

    </section>
  );
}
