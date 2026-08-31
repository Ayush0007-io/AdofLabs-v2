export const researchArticles = [
  {
    id: "01",
    slug: "real-time-systems",
    type: "RESEARCH NOTE",
    date: "AUG 2026",
    title: "When real-time interaction becomes a systems problem",
    summary: "What latency, state, tool execution, verification and compute reveal when intelligence has to remain present rather than respond one turn at a time.",
    image: "/images/research_illustration_1.jpg",
    isAvailable: true
  },
  {
    id: "02",
    slug: "live-speech-measurements",
    type: "ENGINEERING INSIGHT",
    date: "AUG 2026",
    title: "What measuring the live speech stack taught us",
    summary: "Lessons from instrumenting capture, transport and speech understanding — and why perceived speed is different from measured system latency.",
    image: "/images/research_illustration_2.jpg",
    isAvailable: true
  },
  {
    id: "03",
    slug: "multi-clock-intelligence",
    type: "RESEARCH DIRECTION",
    date: "AUG 2026",
    title: "Should intelligence run on more than one clock?",
    summary: "Exploring architectures where perception, speech, reasoning, action and learning operate at different timescales instead of forcing every process through the same computational rhythm.",
    image: "/images/research_illustration_3.jpg",
    isAvailable: true
  },
  {
    id: "04",
    slug: "execution-is-not-completion",
    type: "ARCHITECTURE NOTE",
    date: "AUG 2026",
    title: "Execution is not completion.",
    summary: "Building agents that act through software exposed a reliability gap: a successful tool call does not guarantee the intended outcome. Reliable action requires observing results, verifying state and recovering when execution diverges from intent.",
    image: "/runtime_architecture.jpg",
    isAvailable: false
  }
];

export type ResearchArticle = (typeof researchArticles)[number];
