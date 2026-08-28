import Link from "next/link";
import Image from "next/image";

export function ProgressTimeline() {
  return (
    <section className="relative w-full bg-[var(--background)] py-24 md:py-32 z-10 border-b border-white/5">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

          {/* Left title column */}
          <div className="w-full md:w-1/3 flex flex-col">
            <span className="font-mono text-[#666] text-[10px] tracking-[0.2em] uppercase mb-6">
              01 / R&amp;D Progress
            </span>
            <h2 className="font-[family-name:var(--font-oliveira)] text-3xl md:text-5xl text-[#FAFAFA] leading-[1.1] tracking-tight mb-6">
              Building the foundations.
            </h2>
            <p className="text-[#A0A0A0] text-base md:text-lg font-light leading-relaxed">
              Short updates from ongoing experiments, evaluations and engineering work as we measure each layer.
            </p>
          </div>

          {/* Right timeline column */}
          <div className="w-full md:w-2/3">
            <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-8 md:pl-12 flex flex-col gap-20 pb-8">

              {/* ── A1 ── */}
              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>

                <div className="flex flex-col">
                  <span className="font-mono text-[#888] text-[10px] tracking-[0.2em] uppercase mb-4">
                    BASELINE A1 · ESTABLISHED
                  </span>
                  <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl text-[#FAFAFA] tracking-tight mb-4">
                    Real-time audio transport baseline
                  </h3>
                  <p className="text-[#A0A0A0] text-base font-light leading-relaxed mb-8 max-w-[500px]">
                    Instrumented browser audio capture, WebM/Opus chunking, transport and server processing to establish the first measurable path before adding intelligence layers.
                  </p>

                  {/* Image — full width on mobile, capped on larger screens */}
                  <div className="w-full mb-8 relative rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
                    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src="/images/voice_baseline_A1.webp"
                        alt="Baseline A1 Architecture"
                        fill
                        sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 768px) calc(100vw - 96px), (max-width: 1200px) 500px, 600px"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 inline-flex mb-8 self-start max-w-full overflow-x-auto">
                    <code className="font-mono text-[#FAFAFA]/80 text-[11px] md:text-xs whitespace-nowrap">
                      98.0 ms best observed round-trip · 18.7 ms server processing
                    </code>
                  </div>

                  <Link
                    href="#"
                    className="flex items-center gap-3 font-[family-name:var(--font-oliveira)] text-sm text-[#FAFAFA] tracking-widest uppercase hover:text-[#A0A0A0] transition-colors group self-start"
                  >
                    VIEW PROGRESS
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* ── A2 ── */}
              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-amber-500/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                </div>

                <div className="flex flex-col">
                  <span className="font-mono text-amber-500/80 text-[10px] tracking-[0.2em] uppercase mb-4">
                    BASELINE A2 · IN PROGRESS
                  </span>
                  <h3 className="font-[family-name:var(--font-oliveira)] text-2xl md:text-3xl text-[#FAFAFA] tracking-tight mb-4">
                    Speech understanding enters the measured path
                  </h3>
                  <p className="text-[#A0A0A0] text-base font-light leading-relaxed mb-8 max-w-[500px]">
                    Extending the A1 baseline with Sarvam Saaras v3 STT and measuring what changes when speech understanding becomes part of the loop.
                  </p>

                  {/* Image — full width on mobile, capped on larger screens */}
                  <div className="w-full mb-8 relative rounded-xl overflow-hidden border border-white/10 bg-amber-500/5 group">
                    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src="/images/voice_applied_research_A2.webp"
                        alt="Baseline A2 Applied Research"
                        fill
                        sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 768px) calc(100vw - 96px), (max-width: 1200px) 500px, 600px"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 inline-flex mb-8 self-start max-w-full overflow-x-auto">
                    <code className="font-mono text-amber-500/90 text-[11px] md:text-xs whitespace-nowrap">
                      260.5 ms first instrumented audio-to-transcript round-trip
                    </code>
                  </div>

                  <Link
                    href="#"
                    className="flex items-center gap-3 font-[family-name:var(--font-oliveira)] text-sm text-[#FAFAFA] tracking-widest uppercase hover:text-[#A0A0A0] transition-colors group self-start"
                  >
                    VIEW CURRENT WORK
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
