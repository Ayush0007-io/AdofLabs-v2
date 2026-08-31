export const homeLabs = [
  {
    id: "001",
    tag: "LAB / 001 · REALTIME SYSTEMS",
    title: "Measuring the real-time speech stack, layer by layer.",
    description: "An instrumented baseline of browser capture, encoded audio transport and the first speech-recognition integration.",
    results: [
      {
        label: "A1 / VALIDATED",
        items: [
          { value: "84–105 ms", text: "observed application RTT" },
          { value: "17.9–25.9 ms", text: "measured server processing" }
        ]
      },
      {
        label: "A2-A / INCOMPLETE",
        items: [
          { value: " ", text: "The first integration exposed a measurement boundary before it produced a valid speech-recognition benchmark." }
        ]
      }
    ],
    specs: "48 kHz · Mono · WebM/Opus · ~8.3 chunks/s",
    report: {
      href: "/lab/001",
      label: "OPEN TECHNICAL REPORT",
    },
    image: "/images/bg 1.png",
  },
  {
    id: "002",
    tag: "LAB / 002 — CONCURRENT EXECUTION",
    title: "Keeping interaction alive while actions execute.",
    description: "We’re testing whether speech, state updates and tool execution can run concurrently instead of forcing the system into a sequential listen → reason → act → wait → respond pipeline. The goal is to keep the interaction responsive while work continues in the background, without losing state or execution context.",
    results: [],
    specs: "Concurrent pipeline · Background execution · Stateful context",
    image: "/images/bg 2.png",
  }
];

export type HomeLab = (typeof homeLabs)[number];
