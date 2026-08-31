"use client";

import Image from "next/image";


export function BentoGrid() {
  return (
    <section className="relative w-full bg-[#0F0F10] px-4 py-24 flex flex-col items-center cursor-crosshair">
      <div className="max-w-[1135.2px] w-full mx-auto">

        {/* Title Section (Optional, could just be the grid) */}
        <div className="text-center mb-16">
          <h2 className="text-[#f9f5ef] text-[32px] md:text-[48px] font-serif font-light mb-4">
            Frontier AI models<br/>for everything you ship.
          </h2>
          <p className="text-[#A0A0A0] text-sm md:text-base font-sans tracking-wide">
            Reasoning, code, voice, images, and video.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

          {/* Card 1: Chat/Reasoning (7 columns) */}
          <div className="md:col-span-7 bg-[#161616] border border-[#333333] rounded-[24px] p-8 relative overflow-hidden group min-h-[400px] flex flex-col justify-end transition-colors duration-500 hover:bg-[#1a1a1a] hover:border-[#444]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/80 z-10 pointer-events-none"></div>

            {/* Animated Chat Mockup */}
            <div className="absolute top-8 left-8 right-8 flex flex-col gap-4 animate-[float_8s_ease-in-out_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <div className="self-end bg-[#222] text-[#f9f5ef] px-4 py-2 rounded-2xl rounded-tr-sm text-xs font-sans max-w-[80%] border border-[#333]">
                Why is the sky blue?
              </div>
              <div className="self-start bg-[#1A1A1A] text-[#A0A0A0] px-4 py-3 rounded-2xl rounded-tl-sm text-xs font-sans max-w-[85%] border border-[#222]">
                Shorter blue wavelengths scatter more off air molecules than longer red ones.
              </div>
              <div className="self-end bg-[#222] text-[#f9f5ef] px-4 py-2 rounded-2xl rounded-tr-sm text-xs font-sans max-w-[80%] border border-[#333]">
                How do black holes form?
              </div>
              <div className="self-start bg-[#1A1A1A] text-[#A0A0A0] px-4 py-3 rounded-2xl rounded-tl-sm text-xs font-sans max-w-[85%] border border-[#222]">
                A massive star exhausts its fuel and gravity collapses the core into a singularity.
              </div>
            </div>

            <div className="relative z-20 flex justify-between items-end w-full">
              <span className="text-[#f9f5ef] font-semibold tracking-wide text-sm font-sans">Chat</span>
              <span className="text-[#A0A0A0] text-xs flex items-center gap-1 group-hover:text-[#f9f5ef] transition-colors cursor-pointer font-sans">
                Explore <span>→</span>
              </span>
            </div>
          </div>

          {/* Card 2: Code/Build (5 columns) */}
          <div className="md:col-span-5 bg-[#161616] border border-[#333333] rounded-[24px] p-8 relative overflow-hidden group min-h-[400px] flex flex-col justify-end transition-colors duration-500 hover:bg-[#1a1a1a] hover:border-[#444]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/80 z-10 pointer-events-none"></div>

            {/* Animated Code Mockup */}
            <div className="absolute top-8 left-8 right-8 flex flex-col animate-[float_9s_ease-in-out_infinite_reverse] opacity-80 group-hover:opacity-100 transition-opacity duration-700 font-mono text-[10px] sm:text-xs">
              <div className="flex items-center gap-2 mb-4 text-[#555]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <span className="ml-2 text-[#888]">projects/main</span>
              </div>

              <div className="text-[#A0A0A0] space-y-1">
                <p><span className="text-[#FF5F56]">33</span> <span className="text-[#c678dd]">if</span> (!data.name) <span className="text-[#c678dd]">throw</span> Error;</p>
                <p className="bg-[#2a4d2e]/30 px-1 border-l-2 border-[#27C93F]"><span className="text-[#27C93F]">34</span> <span className="text-[#c678dd]">return</span> schema.parse(data);</p>
                <p className="mt-3 text-[#61afef] flex items-center gap-2"><span className="animate-pulse">❯</span> Migrate auth to JWT</p>
                <p className="text-[#e5c07b] mt-2">! Thinking...</p>
                <p className="text-[#98c379] opacity-70"> • read_file src/middleware/auth.ts</p>
                <p className="text-[#98c379] opacity-70"> • grep &quot;session&quot; src/ 4 matches</p>
              </div>
            </div>

            <div className="relative z-20 flex justify-between items-end w-full">
              <span className="text-[#f9f5ef] font-semibold tracking-wide text-sm font-sans">Build</span>
              <span className="text-[#A0A0A0] text-xs flex items-center gap-1 group-hover:text-[#f9f5ef] transition-colors cursor-pointer font-sans">
                Explore <span>→</span>
              </span>
            </div>
          </div>

          {/* Card 3: Vision/Imagine (5 columns) */}
          <div className="md:col-span-5 bg-[#161616] border border-[#333333] rounded-[24px] p-8 relative overflow-hidden group min-h-[400px] flex flex-col justify-end transition-colors duration-500 hover:bg-[#1a1a1a] hover:border-[#444]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none h-32 bottom-0"></div>

            {/* Animated Vision Mockup */}
            <div className="absolute inset-0 flex justify-center items-center opacity-70 group-hover:opacity-100 transition-opacity duration-700">
               {/* Abstract geometric shapes representing "Vision" that float gently */}
               <div className="w-32 h-32 rounded-lg bg-gradient-to-tr from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#fff]/10 absolute -ml-10 -mt-10 animate-[float_7s_ease-in-out_infinite] backdrop-blur-md"></div>
               <div className="w-24 h-40 rounded-full bg-gradient-to-bl from-[#f43f5e]/20 to-[#fb923c]/20 border border-[#fff]/10 absolute ml-16 mt-12 animate-[float_6s_ease-in-out_infinite_reverse] backdrop-blur-sm"></div>

               {/* Viewfinder brackets */}
               <div className="absolute w-40 h-40 border border-[#A0A0A0]/30 rounded-sm">
                 <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#f9f5ef]"></div>
                 <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#f9f5ef]"></div>
                 <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#f9f5ef]"></div>
                 <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#f9f5ef]"></div>
               </div>
            </div>

            <div className="relative z-20 flex justify-between items-end w-full">
              <span className="text-[#f9f5ef] font-semibold tracking-wide text-sm font-sans">Imagine</span>
              <span className="text-[#A0A0A0] text-xs flex items-center gap-1 group-hover:text-[#f9f5ef] transition-colors cursor-pointer font-sans">
                Explore <span>→</span>
              </span>
            </div>
          </div>

          {/* Card 4: Voice/Orb (7 columns) */}
          <div className="md:col-span-7 bg-[#161616] border border-[#333333] rounded-[24px] p-8 relative overflow-hidden group min-h-[400px] flex flex-col justify-end transition-colors duration-500 hover:bg-[#1a1a1a] hover:border-[#444]">

            {/* Animated Orb from user image */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] animate-[float_6s_ease-in-out_infinite] opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105">
                <Image
                  src="/images/sphere.jpg"
                  alt="Voice Orb"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain mix-blend-screen pointer-events-none"
                />
              </div>
            </div>

            <div className="relative z-20 flex justify-between items-end w-full">
              <span className="text-[#f9f5ef] font-semibold tracking-wide text-sm font-sans">Voice</span>
              <span className="text-[#A0A0A0] text-xs flex items-center gap-1 group-hover:text-[#f9f5ef] transition-colors cursor-pointer font-sans">
                Explore <span>→</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
