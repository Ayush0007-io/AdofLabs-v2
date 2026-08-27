export const researchArticles = [
  {
    id: "01",
    type: "RESEARCH NOTE",
    date: "AUG 2026",
    title: "When real-time interaction becomes a systems problem",
    summary: "What latency, state, tool execution, verification and compute reveal when intelligence has to remain present rather than respond one turn at a time.",
    image: "/images/r1.png"
  },
  {
    id: "02",
    type: "ENGINEERING INSIGHT",
    date: "AUG 2026",
    title: "What measuring the live speech stack taught us",
    summary: "Lessons from instrumenting capture, transport and speech understanding — and why perceived speed is different from measured system latency.",
    image: "/images/r2.png"
  },
  {
    id: "03",
    type: "RESEARCH DIRECTION",
    date: "AUG 2026",
    title: "Should intelligence run on more than one clock?",
    summary: "Exploring architectures where perception, speech, reasoning, action and learning operate at different timescales instead of forcing every process through the same computational rhythm.",
    image: "/images/r3.png"
  },
  {
    id: "04",
    type: "ARCHITECTURE NOTE",
    date: "AUG 2026",
    title: "Execution is not completion.",
    summary: "Building agents that act through software exposed a reliability gap: a successful tool call does not guarantee the intended outcome. Reliable action requires observing results, verifying state and recovering when execution diverges from intent.",
    image: "/runtime_architecture.jpg"
  }
];

export type ResearchArticle = (typeof researchArticles)[number];
