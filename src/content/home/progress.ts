export const progressCards = [
  {
    id: 1,
    title: "APPLIED RESEARCH + EVALS",
    status: "ACTIVE",
    statusColor: "text-white border-white/30 bg-white/10",
    text: "We’re studying current real-time systems and building our own evaluations around response timing, interruptions, naturalness, state continuity, tool completion and inference cost.",
    subtext: null,
    image: "/images/adoflabs-applied-research-under-500kb.webp"
  },
  {
    id: 2,
    title: "REALTIME BASELINE A1",
    status: "COMPLETED",
    statusColor: "text-[#FAFAFA] border-white/20 bg-white/10",
    text: "Built and instrumented the first live audio transport path.",
    subtext: "320 ms → ~100–121 ms\nObserved round-trip latency across successive runs.",
    image: "/images/voice_baseline_A1.webp"
  },
  {
    id: 3,
    title: "REALTIME BASELINE A2",
    status: "IN TESTING",
    statusColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    text: "Added speech understanding to the same measured pipeline.",
    subtext: "The first integration exposed an empty-transcription failure. We’re isolating it before adding another layer.",
    image: "/images/voice_applied_research_A2.webp"
  }
] as const;

export type ProgressCardContent = (typeof progressCards)[number];
