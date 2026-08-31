import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Measuring the Real-Time Speech Stack, Layer by Layer | AdofLabs",
  description:
    "From browser-level instrumentation to a measured progressive speech control — and the architectural questions it exposed.",
};

// Simple reusable section component matching the design
function Section({
  num,
  title,
  children,
}: {
  num?: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="lg:grid lg:grid-cols-[160px_minmax(0,760px)] lg:gap-[72px] mb-24 md:mb-32">
      <div className="mb-6 lg:mb-0 flex-shrink-0">
        <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase sticky top-32">
          {num && (
            <>
              {num} <br className="hidden lg:block" />
            </>
          )}
          <span className="lg:mt-4 block">{title}</span>
        </div>
      </div>
      <div className="text-[#F5F5F5] text-base md:text-lg font-light leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th className={`py-3 px-2 border-b border-[#242424] text-xs font-mono text-[#A3A3A3] font-normal tracking-widest uppercase text-${align}`}>
      {children}
    </th>
  );
}

function Td({ children, align = "left", bold = false }: { children: React.ReactNode; align?: "left" | "right"; bold?: boolean }) {
  return (
    <td className={`py-3 px-2 border-b border-[#242424]/50 text-sm font-mono ${bold ? 'text-white font-bold' : 'text-[#A3A3A3]'} text-${align}`}>
      {children}
    </td>
  );
}

export default function Lab001Report() {
  return (
    <main className="w-full bg-[#050505] text-[#F5F5F5] min-h-screen pt-32 md:pt-48 pb-24 font-sans selection:bg-white/20">
      <article className="max-w-[1180px] mx-auto px-6 lg:px-12">

        {/* HERO */}
        <header className="mb-32">
          <div className="font-mono text-xs text-[#A3A3A3] uppercase tracking-widest mb-12 flex justify-between max-w-[992px]">
            <span>LAB / 001</span>
            <span>REALTIME SYSTEMS · AUGUST 2026</span>
          </div>

          <h1 className="font-[family-name:var(--font-oliveira)] text-4xl md:text-6xl leading-[1.1] mb-8 max-w-[800px] text-white">
            Measuring the real-time speech stack, layer by layer.
          </h1>

          <p className="text-xl md:text-2xl text-[#A3A3A3] font-light leading-relaxed max-w-[800px] mb-16">
            From browser-level instrumentation to a measured progressive speech control — and the architectural questions it exposed.
          </p>
        </header>

        {/* INTRO */}
        <Section title="Abstract">
          <p className="mb-6">
            Real-time speech systems are often described with one number: latency.
          </p>
          <p className="mb-6">
            That number hides most of the system.
          </p>
          <p className="mb-6">
            Between a person finishing a thought and hearing a response, audio must be captured, represented, transported, interpreted, reasoned over, converted back into speech and scheduled for playback. Some of those stages are computational. Some are network-bound. Some exist only because of the architecture we chose.
          </p>
          <p className="mb-6">
            We built the stack layer by layer so that we could measure those boundaries before trying to optimize them.
          </p>
          <p className="mb-6">
            The result was not a single record latency number. The more important finding was that several of our largest improvements came from <strong>removing computation and removing waits</strong>, rather than making existing stages incrementally faster.
          </p>
          <p className="mb-6">That eventually changed the question we were asking.</p>
          <p className="mb-6">We started with:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-white">
            How do we make the speech pipeline faster?
          </blockquote>
          <p className="mb-6">We ended this phase asking:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-white">
            What computation actually needs to run continuously for realtime intelligence?
          </blockquote>

          <div className="mt-16 border border-[#242424] bg-[#0A0A0A] p-8">
            <h3 className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-6">B3 / FROZEN ENGINEERING CONTROL</h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <Th>Measurement</Th>
                    <Th align="right">Median</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Input end → browser playback</Td>
                    <Td align="right" bold>1637.8 ms</Td>
                  </tr>
                  <tr>
                    <Td>Streaming speech TTFA</Td>
                    <Td align="right" bold>611.8 ms</Td>
                  </tr>
                  <tr>
                    <Td>First client audio → playback</Td>
                    <Td align="right" bold>4.7 ms</Td>
                  </tr>
                  <tr>
                    <Td>Speech generation completion</Td>
                    <Td align="right" bold>895.2 ms</Td>
                  </tr>
                  <tr>
                    <Td>Observed playback underruns</Td>
                    <Td align="right" bold>0 / 3</Td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-[#777] mt-6">
              Three frozen smoke sessions. These numbers describe the experimental control, not universal production latency. B3 is currently preserved as the engineering control against which later realtime architectures can be compared. The control still contains turn-oriented barriers and is deliberately not presented as full duplex.
            </p>
          </div>
        </Section>

        <div className="w-full max-w-[1180px] h-[1px] bg-[#242424] my-24 hidden lg:block"></div>

        {/* 01 START WITH THE MEASUREMENT BOUNDARY */}
        <Section num="01" title="Start with the measurement boundary">
          <p className="mb-6">
            Before speech recognition, language models or synthesis, we needed to know what the surrounding system itself was doing.
          </p>
          <p className="mb-6">
            The first apparatus captured browser audio, preserved per-session evidence and measured events independently on the client and backend.
          </p>
          <p className="mb-6">
            This immediately exposed a basic but important measurement problem:
          </p>

          <div className="my-12">
            <BlockMath math="\text{browser clock} \neq \text{server clock}" />
          </div>

          <p className="mb-6">
            The browser and backend operate in independent monotonic clock domains. Therefore a timestamp produced by one system cannot simply be subtracted from a timestamp produced by another and called one-way latency.
          </p>
          <p className="mb-6">
            Instead, we measured intervals locally:
          </p>

          <div className="my-10 flex flex-col gap-6">
            <BlockMath math="L_{\text{client}} = t_{\text{response}} - t_{\text{request}}" />
            <BlockMath math="L_{\text{server}} = t_{\text{server,end}} - t_{\text{server,start}}" />
          </div>

          <p className="mb-6">For one representative transport observation:</p>

          <div className="my-10">
            <BlockMath math="L_{\text{outside}} = 98.0 - 18.7 = 79.3\text{ ms}" />
          </div>

          <p className="mb-6">
            The important result was not that <code>98.0 ms</code> was unusually fast. It was that the measurement told us where <strong>not</strong> to spend engineering time.
          </p>
          <p className="mb-12">
            Only <code>18.7 ms</code> of that observed application round trip was inside the instrumented server section. Eliminating the server work entirely would still leave most of the observed path untouched.
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:block">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12">FIGURE 01 — INITIAL MEASUREMENT BOUNDARY</div>
            <svg viewBox="0 0 800 220" className="w-full text-white font-mono text-xs" stroke="currentColor" fill="none">
              <text x="400" y="20" textAnchor="middle" fill="#A3A3A3">independent timing domains</text>
              <line x1="400" y1="30" x2="400" y2="180" stroke="#242424" strokeDasharray="4 4" />

              <text x="200" y="40" textAnchor="middle" fill="white" className="font-bold tracking-widest uppercase">BROWSER</text>
              <text x="600" y="40" textAnchor="middle" fill="white" className="font-bold tracking-widest uppercase">SERVER</text>

              <text x="100" y="70" textAnchor="middle" fill="#A3A3A3">microphone</text>
              <line x1="100" y1="80" x2="100" y2="100" stroke="#555" markerEnd="url(#arrow)" />

              <text x="600" y="70" textAnchor="middle" fill="#A3A3A3">request received</text>
              <line x1="600" y1="80" x2="600" y2="100" stroke="#555" markerEnd="url(#arrow)" />

              <text x="100" y="115" textAnchor="middle" fill="white">capture</text>
              <line x1="140" y1="110" x2="180" y2="110" stroke="#555" />
              <text x="200" y="115" textAnchor="middle" fill="white">encode</text>
              <line x1="220" y1="110" x2="260" y2="110" stroke="#555" />
              <text x="280" y="115" textAnchor="middle" fill="white">request</text>
              <line x1="310" y1="110" x2="550" y2="110" stroke="#555" />

              <text x="600" y="115" textAnchor="middle" fill="white">processing</text>

              <line x1="280" y1="125" x2="280" y2="145" stroke="#555" />
              <line x1="600" y1="125" x2="600" y2="145" stroke="#555" />

              <line x1="580" y1="150" x2="330" y2="150" stroke="#555" markerEnd="url(#arrow)" />
              <text x="455" y="145" textAnchor="middle" fill="#A3A3A3">response</text>
              <line x1="280" y1="145" x2="280" y2="150" stroke="#555" />
              <line x1="280" y1="150" x2="300" y2="150" stroke="#555" />
              <line x1="600" y1="145" x2="600" y2="150" stroke="#555" />
              <line x1="600" y1="150" x2="580" y2="150" stroke="#555" />

              <line x1="100" y1="180" x2="380" y2="180" stroke="#A3A3A3" strokeDasharray="2 2" />
              <line x1="100" y1="175" x2="100" y2="185" stroke="#A3A3A3" />
              <line x1="380" y1="175" x2="380" y2="185" stroke="#A3A3A3" />
              <text x="240" y="195" textAnchor="middle" fill="#A3A3A3">measured client round trip</text>

              <line x1="560" y1="180" x2="640" y2="180" stroke="#A3A3A3" strokeDasharray="2 2" />
              <line x1="560" y1="175" x2="560" y2="185" stroke="#A3A3A3" />
              <line x1="640" y1="175" x2="640" y2="185" stroke="#A3A3A3" />
              <text x="600" y="195" textAnchor="middle" fill="#A3A3A3">measured server</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#555" stroke="none" />
                </marker>
              </defs>
            </svg>
          </div>

          <h3 className="text-xl font-[family-name:var(--font-oliveira)] text-white mt-12 mb-6">What this changed</h3>
          <p className="mb-6 text-[#A3A3A3]">The first lesson was methodological:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-white">
            Before optimizing a stage, establish that the number attributed to that stage is actually measuring it.
          </blockquote>
          <p className="text-[#A3A3A3]">This principle remained important throughout the rest of the experiments.</p>
        </Section>

        {/* 02 LATENCY IS NOT UNDERSTANDING */}
        <Section num="02" title="Latency is not the same as understanding">
          <p className="mb-6">
            The next experiments introduced speech recognition.
          </p>
          <p className="mb-6">
            Whole-utterance recognition gave us a useful semantic control because the recognizer had access to the complete spoken sequence before finalizing its interpretation.
          </p>
          <p className="mb-6">
            Then we compared that behavior against streaming recognition using the same frozen audio.
          </p>
          <p className="mb-6">
            A simple correction exposed the problem:
          </p>

          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-[#A3A3A3] overflow-x-auto mb-10 font-mono">
{`USER SPEECH

meeting at 4 PM
        ↓
       no
        ↓
actually 5 PM`}
          </pre>

          <p className="mb-6">At one point in the stream, this state is perfectly reasonable:</p>
          <div className="my-6">
            <BlockMath math="\text{meeting.time} = 4\text{PM}" />
          </div>
          <p className="mb-6">A few hundred milliseconds later, it is wrong:</p>
          <div className="my-6">
            <BlockMath math="\text{meeting.time} = 5\text{PM}" />
          </div>

          <p className="mb-6">
            Streaming recognition could appear faster by finalizing before the later correction arrived. That produced one of the most important findings of the first phase:
          </p>

          <div className="my-10">
            <BlockMath math="\text{fast finalization} \neq \text{semantically complete understanding}" />
          </div>

          <p className="mb-12">
            The paired experiment demonstrated that ordinary latency measurements can reward a system for committing too early.
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:block">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12">FIGURE 02 — MEANING EVOLVES OVER TIME</div>
            <svg viewBox="0 0 800 120" className="w-full text-white font-mono text-xs" stroke="currentColor" fill="none">
              <text x="20" y="20" fill="#A3A3A3">TIME</text>
              <line x1="60" y1="16" x2="780" y2="16" stroke="#555" markerEnd="url(#arrow)" />

              <text x="100" y="50" textAnchor="middle" fill="#A3A3A3">&quot;meeting&quot;</text>
              <text x="300" y="50" textAnchor="middle" fill="#A3A3A3">&quot;at 4&quot;</text>
              <text x="500" y="50" textAnchor="middle" fill="#A3A3A3">&quot;no&quot;</text>
              <text x="700" y="50" textAnchor="middle" fill="#A3A3A3">&quot;actually 5&quot;</text>

              <line x1="100" y1="60" x2="100" y2="80" stroke="#555" markerEnd="url(#arrow)" />
              <line x1="300" y1="60" x2="300" y2="80" stroke="#555" markerEnd="url(#arrow)" />
              <line x1="500" y1="60" x2="500" y2="80" stroke="#555" markerEnd="url(#arrow)" />
              <line x1="700" y1="60" x2="700" y2="80" stroke="#555" markerEnd="url(#arrow)" />

              <text x="100" y="100" textAnchor="middle" fill="white">UNKNOWN</text>
              <text x="300" y="100" textAnchor="middle" fill="white">PROVISIONAL</text>
              <text x="500" y="100" textAnchor="middle" fill="white">REVISE</text>
              <text x="700" y="100" textAnchor="middle" fill="white">COMMIT</text>

              <text x="300" y="120" textAnchor="middle" fill="#A3A3A3">4 PM</text>
              <text x="500" y="115" textAnchor="middle" fill="#A3A3A3">invalidate</text>
              <text x="500" y="125" textAnchor="middle" fill="#A3A3A3">previous</text>
              <text x="700" y="120" textAnchor="middle" fill="#A3A3A3">5 PM</text>
            </svg>
          </div>

          <p className="mb-6">
            This suggested that a realtime system should not represent intermediate interpretation using only:
          </p>
          <pre className="bg-[#0A0A0A] border border-[#242424] p-4 text-sm text-white mb-6 font-mono w-max">
FINAL / NOT FINAL
          </pre>
          <p className="mb-6">It needs a richer lifecycle:</p>
          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-[#A3A3A3] overflow-x-auto mb-10 font-mono">
{`PROVISIONAL → UPDATE → REVISE → SUPERSEDE → COMMIT
                                      │
                                      └────→ CANCEL`}
          </pre>
          <p className="mb-6 text-[#A3A3A3]">
            That is not merely a speech-recognition problem. Any continuous system acting before all future information is available has to reason about <strong>revision and commitment</strong>.
          </p>
        </Section>

        {/* 03 BUILD CONVENTIONAL FIRST */}
        <Section num="03" title="Build the conventional system first">
          <p className="mb-6">
            We deliberately built a conventional end-to-end control before proposing a new architecture.
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:flex flex-col items-center">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12 w-full text-left">
              B0 / SERIAL CONTROL<br /><br />FIGURE 03 — FIRST INTEGRATED PATH
            </div>
            <svg viewBox="0 0 300 420" className="text-white font-mono text-xs w-[300px]" stroke="currentColor" fill="none">

              <rect x="50" y="0" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="18" textAnchor="middle" fill="white">AUDIO CAPTURE</text>

              <line x1="150" y1="30" x2="150" y2="50" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="50" width="200" height="30" stroke="#555" strokeDasharray="4 4" fill="transparent" />
              <text x="150" y="68" textAnchor="middle" fill="#A3A3A3">WAIT FOR UTTERANCE</text>

              <line x1="150" y1="80" x2="150" y2="100" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="100" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="118" textAnchor="middle" fill="white">SPEECH RECOGNITION</text>

              <line x1="150" y1="130" x2="150" y2="150" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="150" width="200" height="30" stroke="#555" strokeDasharray="4 4" fill="transparent" />
              <text x="150" y="168" textAnchor="middle" fill="#A3A3A3">WAIT</text>

              <line x1="150" y1="180" x2="150" y2="200" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="200" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="218" textAnchor="middle" fill="white">LANGUAGE MODEL</text>

              <line x1="150" y1="230" x2="150" y2="250" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="250" width="200" height="30" stroke="#555" strokeDasharray="4 4" fill="transparent" />
              <text x="150" y="268" textAnchor="middle" fill="#A3A3A3">WAIT</text>

              <line x1="150" y1="280" x2="150" y2="300" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="300" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="318" textAnchor="middle" fill="white">FULL SPEECH SYNTHESIS</text>

              <line x1="150" y1="330" x2="150" y2="350" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="350" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="368" textAnchor="middle" fill="white">PLAYBACK</text>
            </svg>
          </div>

          <p className="mb-6">The implementation was intentionally ordinary. Its purpose was measurement.</p>

          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-[#A3A3A3]">
            Without a measurable control system, an architectural improvement is difficult to distinguish from a different workload, provider state or measurement boundary.
          </blockquote>

          <p className="mb-6">
            Repeated frozen-input runs exposed significant end-to-end variance. Successful executions sometimes completed in roughly <code>4–7 s</code>, while slow successful runs could extend toward <code>18–22 s</code>; failures were also observed.
          </p>
          <p className="mb-6">
            The strongest observed concentration of variance was inside the measured language-model stage, but that observation alone did not establish the root cause. So rather than redesigning the entire pipeline, we isolated that stage.
          </p>
        </Section>

        {/* 04 THE BIGGEST SPEEDUP */}
        <Section num="04" title="The biggest speedup came from deleting computation">
          <p className="mb-6">
            The isolated model experiment produced an unexpected trace. The model connection had started successfully, but visible response content did not immediately appear. Instrumentation then exposed a large amount of hidden reasoning activity preceding the simple conversational answer.
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:block">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12">FIGURE 04 — SAME REQUEST, DIFFERENT COMPUTE POLICY</div>
            <svg viewBox="0 0 800 200" className="w-full text-white font-mono text-xs" stroke="currentColor" fill="none">

              <text x="20" y="20" fill="white" className="uppercase font-bold">DEFAULT</text>
              <text x="20" y="50" fill="#A3A3A3">0 ms</text>
              <text x="600" y="50" fill="#A3A3A3" textAnchor="end">~2 s</text>

              <rect x="20" y="60" width="580" height="30" stroke="#555" fill="#111" />
              <text x="310" y="78" textAnchor="middle" fill="#A3A3A3">hidden computation</text>

              <rect x="600" y="60" width="100" height="30" fill="white" stroke="none" />
              <text x="650" y="78" textAnchor="middle" fill="black">RESPONSE</text>

              <text x="20" y="130" fill="white" className="uppercase font-bold">FAST CONVERSATIONAL PATH</text>
              <text x="20" y="160" fill="#A3A3A3">0 ms</text>
              <text x="240" y="160" fill="#A3A3A3" textAnchor="end">~300 ms</text>

              <rect x="20" y="170" width="220" height="30" stroke="#555" fill="#111" />
              <text x="130" y="188" textAnchor="middle" fill="#A3A3A3">necessary processing</text>

              <rect x="240" y="170" width="100" height="30" fill="white" stroke="none" />
              <text x="290" y="188" textAnchor="middle" fill="black">RESPONSE</text>
            </svg>
          </div>

          <p className="mb-6 text-[#A3A3A3]">For the simple conversational test used in this experiment:</p>

          <div className="w-full overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <Th>Metric</Th>
                  <Th align="right">Default behavior</Th>
                  <Th align="right">Reduced reasoning</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Median first visible output</Td>
                  <Td align="right">~1971.5 ms</Td>
                  <Td align="right" bold>~307.8 ms</Td>
                </tr>
                <tr>
                  <Td>Median total</Td>
                  <Td align="right">~2228.8 ms</Td>
                  <Td align="right" bold>~458.8 ms</Td>
                </tr>
                <tr>
                  <Td>Median reasoning chunks</Td>
                  <Td align="right">~142</Td>
                  <Td align="right" bold>0</Td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-6">The integrated comparison later showed the measured language-model total falling from approximately:</p>
          <div className="my-6">
            <BlockMath math="9150.6\text{ ms} \rightarrow 414.6\text{ ms}" />
          </div>
          <p className="mb-6">while campaign median end-to-end time moved from approximately:</p>
          <div className="my-6">
            <BlockMath math="12930\text{ ms} \rightarrow 2711.2\text{ ms}" />
          </div>

          <p className="mb-6">
            Only the model-stage change should be causally attributed to the reasoning intervention because other stage distributions also changed between the integrated campaigns.
          </p>

          <p className="mb-4">The important conclusion was <strong>not</strong>:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 mb-8 text-lg font-[family-name:var(--font-oliveira)] text-[#A3A3A3]">
            reasoning is bad.
          </blockquote>

          <p className="mb-4">The supported conclusion was narrower:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 mb-12 text-xl font-[family-name:var(--font-oliveira)] text-white">
            Deep reasoning was unnecessary for this simple reflex conversational path, and performing it anyway imposed a large latency cost.
          </blockquote>

          <p className="mb-6">We can express the problem as:</p>
          <div className="my-6">
            <BlockMath math="L_{\text{response}} = L_{\text{necessary}} + L_{\text{unnecessary}}" />
          </div>
          <p className="mb-6">Traditional optimization tends to focus on:</p>
          <div className="my-6">
            <BlockMath math="L_{\text{necessary}}\downarrow" />
          </div>
          <p className="mb-6">But in this experiment, the larger gain came from:</p>
          <div className="my-6">
            <BlockMath math="L_{\text{unnecessary}}\rightarrow0" />
          </div>

          <h3 className="text-xl font-bold tracking-widest uppercase text-white mb-6 mt-16">Engineering principle</h3>
          <blockquote className="border-l-2 border-white pl-6 py-2 mb-8 text-2xl font-[family-name:var(--font-oliveira)] text-white">
            The cheapest computation is computation that never needs to run.
          </blockquote>
        </Section>

        {/* 05 COMPLETION TIME WAS THE WRONG METRIC */}
        <Section num="05" title="Completion time was the wrong speech metric">
          <p className="mb-6">
            Once the conversational model path was reduced, speech generation became a more visible barrier. Originally we were measuring the time required to generate an entire waveform.
          </p>
          <p className="mb-6">
            But a realtime listener does not care when the final byte of a response exists. They care when they can begin hearing it.
          </p>
          <p className="mb-6">So the metric changed from:</p>
          <div className="my-6">
            <BlockMath math="T_{\text{complete}}" />
          </div>
          <p className="mb-6">to:</p>
          <div className="my-6">
            <BlockMath math="T_{\text{first playable audio}}" />
          </div>
          <p className="mb-12">or <code>TTFA</code>.</p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:block">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12">FIGURE 05 — BATCH VS PROGRESSIVE GENERATION</div>
            <svg viewBox="0 0 800 160" className="w-full text-white font-mono text-xs" stroke="currentColor" fill="none">

              <text x="20" y="20" fill="white" className="uppercase font-bold">BATCH</text>

              <text x="20" y="60" fill="#A3A3A3">TEXT</text>
              <line x1="60" y1="56" x2="80" y2="56" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="100" y="46" width="300" height="20" fill="white" stroke="none" />

              <line x1="420" y1="56" x2="440" y2="56" stroke="#555" markerEnd="url(#arrow)" />
              <text x="460" y="60" fill="white" className="font-bold">PLAY</text>

              <text x="250" y="85" textAnchor="middle" fill="#A3A3A3">complete waveform first</text>

              <text x="20" y="130" fill="white" className="uppercase font-bold">PROGRESSIVE</text>

              <text x="20" y="160" fill="#A3A3A3">TEXT</text>
              <line x1="60" y1="156" x2="80" y2="156" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="100" y="146" width="40" height="20" fill="white" stroke="none" />
              <line x1="145" y1="156" x2="160" y2="156" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="170" y="146" width="40" height="20" fill="white" stroke="none" />
              <line x1="215" y1="156" x2="230" y2="156" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="240" y="146" width="40" height="20" fill="white" stroke="none" />
              <line x1="285" y1="156" x2="300" y2="156" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="310" y="146" width="40" height="20" fill="white" stroke="none" />

              <line x1="120" y1="175" x2="120" y2="195" stroke="#555" />
              <line x1="120" y1="195" x2="140" y2="195" stroke="#555" markerEnd="url(#arrow)" />
              <text x="160" y="200" fill="white" className="font-bold">PLAY</text>
            </svg>
          </div>

          <p className="mb-6">Five paired comparisons produced:</p>
          <div className="my-6">
            <BlockMath math="TTFA_{\text{batch}} = 1098.8\text{ ms}" />
          </div>
          <div className="my-6">
            <BlockMath math="TTFA_{\text{stream}} = 262.4\text{ ms}" />
          </div>
          <p className="mb-6">with median paired improvement of approximately:</p>
          <div className="my-6">
            <BlockMath math="812\text{ ms}" />
          </div>

          <p className="mb-6 text-[#A3A3A3]">
            All five streaming runs in that paired experiment succeeded. This did <strong>not</strong> prove continuous browser playback by itself. It proved that waiting for complete speech generation was an avoidable latency barrier worth removing.
          </p>
        </Section>

        {/* 06 THEN REMOVE THE DECODING LAYER */}
        <Section num="06" title="Then remove the decoding layer">
          <p className="mb-6">
            The first integrated progressive-audio design contained another potential serial step:
          </p>

          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-[#A3A3A3] overflow-x-auto mb-10 font-mono w-max">
{`GENERATED AUDIO
      ↓
COMPRESSED AUDIO
      ↓
GENERAL DECODER
      ↓
PCM
      ↓
BROWSER`}
          </pre>

          <p className="mb-6">
            Before optimizing that decoder path, we checked whether the intermediate representation was necessary. It was not. The resulting control instead used a direct uncompressed audio path conceptually equivalent to:
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:flex flex-col items-center">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12 w-full text-left">
              FIGURE 06 — PROGRESSIVE AUDIO CONTROL
            </div>
            <svg viewBox="0 0 300 420" className="text-white font-mono text-xs w-[300px]" stroke="currentColor" fill="none">

              <rect x="50" y="0" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="18" textAnchor="middle" fill="white">SPEECH GENERATOR</text>

              <line x1="150" y1="30" x2="150" y2="100" stroke="#555" markerEnd="url(#arrow)" />
              <rect x="150" y="55" width="130" height="20" fill="#0A0A0A" stroke="none" />
              <text x="215" y="68" textAnchor="middle" fill="#A3A3A3">progressive PCM</text>

              <rect x="50" y="100" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="118" textAnchor="middle" fill="white">NETWORK STREAM</text>

              <line x1="150" y1="130" x2="150" y2="170" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="170" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="188" textAnchor="middle" fill="white">BROWSER</text>

              <line x1="150" y1="200" x2="150" y2="240" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="240" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="258" textAnchor="middle" fill="white">SAMPLE NORMALIZATION</text>

              <line x1="150" y1="270" x2="150" y2="310" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="310" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="328" textAnchor="middle" fill="white">AUDIO SCHEDULING QUEUE</text>

              <line x1="150" y1="340" x2="150" y2="380" stroke="#555" markerEnd="url(#arrow)" />

              <rect x="50" y="380" width="200" height="30" stroke="#555" fill="#0A0A0A" />
              <text x="150" y="398" textAnchor="middle" fill="white">SPEAKER</text>
            </svg>
          </div>

          <p className="mb-6">The significant architectural change was not a faster decoder. It was:</p>
          <div className="my-6">
            <BlockMath math="L_{\text{unnecessary decode}} = 0" />
          </div>
          <p className="mb-6">Again the same pattern appeared:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-[#A3A3A3]">
            Before making a stage faster, ask whether the stage needs to exist.
          </blockquote>
        </Section>

        {/* 07 B3 FROZEN CONTROL */}
        <Section num="07" title="B3: the frozen progressive control">
          <p className="mb-6">
            After integrating progressive speech delivery and explicit browser playback scheduling, three frozen smoke sessions produced the following observations.
          </p>

          <div className="mt-12 border border-[#242424] bg-[#0A0A0A] p-8 mb-12">
            <h3 className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-6">EXPERIMENT B3</h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <Th>Run</Th>
                    <Th align="right">Input → playback</Th>
                    <Th align="right">Speech TTFA</Th>
                    <Th align="right">Client audio → playback</Th>
                    <Th align="right">Generation complete</Th>
                    <Th align="right">Underruns</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td align="right">01</Td>
                    <Td align="right">1637.8 ms</Td>
                    <Td align="right">584.1 ms</Td>
                    <Td align="right">5.4 ms</Td>
                    <Td align="right">895.2 ms</Td>
                    <Td align="right">0</Td>
                  </tr>
                  <tr>
                    <Td align="right">02</Td>
                    <Td align="right">1769.0 ms</Td>
                    <Td align="right">611.8 ms</Td>
                    <Td align="right">3.0 ms</Td>
                    <Td align="right">1425.1 ms</Td>
                    <Td align="right">0</Td>
                  </tr>
                  <tr>
                    <Td align="right">03</Td>
                    <Td align="right">1618.9 ms</Td>
                    <Td align="right">626.5 ms</Td>
                    <Td align="right">4.7 ms</Td>
                    <Td align="right">849.4 ms</Td>
                    <Td align="right">0</Td>
                  </tr>
                  <tr>
                    <Td align="right" bold>Median</Td>
                    <Td align="right" bold>1637.8 ms</Td>
                    <Td align="right" bold>611.8 ms</Td>
                    <Td align="right" bold>4.7 ms</Td>
                    <Td align="right" bold>895.2 ms</Td>
                    <Td align="right" bold>0 / 3</Td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-[#242424] flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span className="text-[#A3A3A3]">STATUS</span>
              <span className="text-white">B3_FAST_LOOP_PASS / FROZEN CONTROL</span>
            </div>
          </div>

          <p className="mb-6">
            The browser playback layer contributed very little observed delay compared with the upstream stages during these smoke runs.
          </p>

          <p className="mb-4 text-[#A3A3A3]">What the experiment supports:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 mb-8 text-xl font-[family-name:var(--font-oliveira)] text-white">
            Progressive audio delivery and explicit browser scheduling worked in the measured B3 control.
          </blockquote>

          <p className="mb-4 text-[#A3A3A3]">What it does <strong>not</strong> support:</p>
          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-[#A3A3A3] overflow-x-auto mb-10 font-mono w-max">
{`full duplex proven                 NO
human naturalness proven          NO
production latency = 1.64 s       NO
gapless playback universally      NO
native realtime architecture      NO`}
          </pre>
          <p className="mb-6 text-[#A3A3A3]">B3 was intentionally frozen rather than endlessly optimized.</p>
        </Section>

        {/* 08 THE PATTERN */}
        <Section num="08" title="The pattern across the experiments">
          <p className="mb-6">The progression looks simple when reduced to its important decisions.</p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:flex flex-col items-center">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12 w-full text-left">
              FIGURE 07 — WHAT ACTUALLY CHANGED
            </div>
            <svg viewBox="0 0 400 380" className="text-white font-mono text-xs w-[400px]" stroke="currentColor" fill="none">

              <text x="50" y="20" fill="#A3A3A3" className="font-bold">B0</text>
              <text x="50" y="35" fill="white">SERIAL CONTROL</text>

              <line x1="80" y1="45" x2="80" y2="105" stroke="#555" markerEnd="url(#arrow)" />
              <text x="95" y="80" fill="#A3A3A3">remove unnecessary reasoning</text>

              <text x="50" y="130" fill="#A3A3A3" className="font-bold">B1</text>
              <text x="50" y="145" fill="white">FAST CONVERSATIONAL PATH</text>

              <line x1="80" y1="155" x2="80" y2="215" stroke="#555" markerEnd="url(#arrow)" />
              <text x="95" y="190" fill="#A3A3A3">stop waiting for complete speech</text>

              <text x="50" y="240" fill="#A3A3A3" className="font-bold">B2</text>
              <text x="50" y="255" fill="white">PROGRESSIVE SPEECH</text>

              <line x1="80" y1="265" x2="80" y2="335" stroke="#555" markerEnd="url(#arrow)" />
              <text x="95" y="295" fill="#A3A3A3">delete unnecessary conversion</text>
              <text x="95" y="310" fill="#A3A3A3">+ schedule browser playback directly</text>

              <text x="50" y="360" fill="#A3A3A3" className="font-bold">B3</text>
              <text x="50" y="375" fill="white">FROZEN ENGINEERING CONTROL</text>
            </svg>
          </div>

          <p className="mb-6">Or as an optimization table:</p>
          <div className="w-full overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <Th>Barrier</Th>
                  <Th>Initial response</Th>
                  <Th>Better question</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Slow model response</Td>
                  <Td>Make inference faster</Td>
                  <Td>Does this request require deep reasoning?</Td>
                </tr>
                <tr>
                  <Td>Slow speech completion</Td>
                  <Td>Make synthesis finish faster</Td>
                  <Td>Does playback need to wait for completion?</Td>
                </tr>
                <tr>
                  <Td>Audio conversion</Td>
                  <Td>Optimize decoding</Td>
                  <Td>Can the representation bypass decoding?</Td>
                </tr>
                <tr>
                  <Td>High total latency</Td>
                  <Td>Optimize every stage</Td>
                  <Td>Which waits are architectural rather than computational?</Td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-6">The recurring result was:</p>
          <div className="my-6">
            <BlockMath math="\text{remove work} > \text{micro-optimize work}" />
          </div>
          <p className="mb-6">when the removed work was unnecessary. This was the main engineering lesson of the cascade phase.</p>
        </Section>

        {/* 09 WHY STOP AT 1.64 SECONDS? */}
        <Section num="09" title="Why stop at 1.64 seconds?">
          <p className="mb-6">
            Because B3 was becoming a better version of the wrong abstraction to optimize indefinitely. The control still looks approximately like:
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:flex flex-col items-center">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12 w-full text-left">
              FIGURE 08 — REMAINING SERIAL BARRIERS
            </div>
            <svg viewBox="0 0 300 400" className="text-white font-mono text-xs w-[300px]" stroke="currentColor" fill="none">
              <text x="150" y="20" textAnchor="middle" fill="#A3A3A3">USER SPEECH</text>
              <rect x="50" y="30" width="200" height="15" fill="white" stroke="none" />

              <line x1="150" y1="50" x2="150" y2="90" stroke="#555" markerEnd="url(#arrow)" />
              <text x="150" y="75" textAnchor="middle" fill="#A3A3A3" className="bg-[#0A0A0A]">utterance end</text>

              <text x="150" y="115" textAnchor="middle" fill="white">STT</text>
              <line x1="150" y1="125" x2="150" y2="165" stroke="#555" markerEnd="url(#arrow)" />

              <text x="150" y="190" textAnchor="middle" fill="white">full cognition</text>
              <line x1="150" y1="200" x2="150" y2="240" stroke="#555" markerEnd="url(#arrow)" />

              <text x="150" y="265" textAnchor="middle" fill="#A3A3A3" className="bg-[#0A0A0A]">speech begins</text>
              <rect x="150" y="280" width="100" height="15" fill="white" stroke="none" />
              <polygon points="250,280 260,287.5 250,295" fill="white" />
            </svg>
          </div>

          <p className="mb-6">
            Speech output is progressive. The full system is not. Major semantic stages still wait for explicit boundaries.
          </p>
          <p className="mb-6">
            Further optimization could reduce another few hundred milliseconds while leaving the deeper architecture intact. So B3 became the control.
          </p>
          <p className="mb-6 text-[#A3A3A3]">The research question moved from:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-6 text-xl font-[family-name:var(--font-oliveira)] text-[#A3A3A3]">
            How do we accelerate this cascade?
          </blockquote>
          <p className="mb-6 text-[#A3A3A3]">to:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-6 text-2xl font-[family-name:var(--font-oliveira)] text-white">
            Why should realtime intelligence be organized as a cascade at all?
          </blockquote>
        </Section>

        {/* 10 INFORMATION CLOCKS */}
        <Section num="10" title="Information does not change at one clock">
          <p className="mb-6">
            Conversational systems process information with radically different temporal characteristics.
          </p>
          <ul className="list-disc list-outside ml-6 mb-8 text-[#A3A3A3] space-y-2">
            <li>A waveform may change tens of thousands of times per second.</li>
            <li>Interaction state changes at a much slower rate.</li>
            <li>Meaning changes around words or semantic events.</li>
            <li>Speaker identity may remain stable for an entire session.</li>
            <li>Deep reasoning may only be needed occasionally.</li>
          </ul>

          <p className="mb-6">Conceptually:</p>
          <div className="w-full overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <Th>Information</Th>
                  <Th>Relative update rate</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>waveform</Td>
                  <Td>very high</Td>
                </tr>
                <tr>
                  <Td>acoustic / interaction state</Td>
                  <Td>high</Td>
                </tr>
                <tr>
                  <Td>prosody</Td>
                  <Td>high</Td>
                </tr>
                <tr>
                  <Td>semantic state</Td>
                  <Td>event / word scale</Td>
                </tr>
                <tr>
                  <Td>stable identity/context</Td>
                  <Td>low</Td>
                </tr>
                <tr>
                  <Td>deep reasoning</Td>
                  <Td>sparse</Td>
                </tr>
                <tr>
                  <Td>external action commitment</Td>
                  <Td>event-driven</Td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-6">
            There is no obvious requirement that the same expensive global computation execute at every one of these clocks. That produced the current multi-clock research hypothesis.
          </p>
          <p className="mb-6">A monolithic continuously expensive system can be represented conceptually as:</p>
          <div className="my-6">
            <BlockMath math="C_{\text{mono}} \approx N C_{\text{large}}" />
          </div>
          <p className="mb-6">Our current research hypothesis separates continuous state maintenance from occasional expensive cognition:</p>
          <div className="my-6">
            <BlockMath math="C_{\text{system}} = N C_{\text{state}} + K C_{\text{global}} + J C_{\text{reason}}" />
          </div>
          <p className="mb-6">with the desired regime:</p>
          <div className="my-6 flex gap-8 justify-center">
            <InlineMath math="K \ll N" />
            <span className="text-[#A3A3A3]">and</span>
            <InlineMath math="J \ll N" />
          </div>

          <p className="mb-6 text-[#A3A3A3]">where:</p>
          <ul className="list-disc list-outside ml-6 mb-8 text-[#A3A3A3] space-y-2 font-mono text-sm">
            <li><InlineMath math="N" /> represents ongoing conversational updates</li>
            <li><InlineMath math="C_{\text{state}}" /> represents relatively cheap state maintenance</li>
            <li><InlineMath math="K" /> represents global-context invocations</li>
            <li><InlineMath math="J" /> represents deeper reasoning invocations</li>
          </ul>

          <p className="mb-6">The point is not the equation itself. The research question is whether <InlineMath math="K/N" /> can become small <strong>without destroying semantic correctness</strong>.</p>
        </Section>

        {/* 11 CONCURRENT STATE */}
        <Section num="11" title="From serial stages to concurrent state">
          <p className="mb-6">
            The conceptual direction is therefore different from simply running every stage faster.
          </p>

          <div className="mb-12 border border-[#242424] bg-[#0A0A0A] p-8 overflow-x-auto hidden md:flex flex-col items-center">
            <div className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-12 w-full text-left">
              FIGURE 09 — CURRENT RESEARCH DIRECTION
            </div>
            <svg viewBox="0 0 600 350" className="text-white font-mono text-xs w-[600px]" stroke="currentColor" fill="none">

              <text x="300" y="20" textAnchor="middle" fill="white" className="font-bold">CONTINUOUS INPUT</text>
              <line x1="300" y1="30" x2="300" y2="60" stroke="#555" />
              <line x1="150" y1="60" x2="450" y2="60" stroke="#555" />
              <line x1="150" y1="60" x2="150" y2="90" stroke="#555" markerEnd="url(#arrow)" />
              <line x1="450" y1="60" x2="450" y2="90" stroke="#555" markerEnd="url(#arrow)" />

              <text x="150" y="115" textAnchor="middle" fill="white">INTERACTION STATE</text>
              <text x="150" y="130" textAnchor="middle" fill="#A3A3A3">continuous / cheap</text>

              <text x="450" y="115" textAnchor="middle" fill="white">SEMANTIC STATE</text>
              <text x="450" y="130" textAnchor="middle" fill="#A3A3A3">evolving meaning</text>

              <line x1="150" y1="145" x2="150" y2="175" stroke="#555" />
              <line x1="450" y1="145" x2="450" y2="175" stroke="#555" />
              <line x1="150" y1="175" x2="450" y2="175" stroke="#555" />
              <line x1="300" y1="175" x2="300" y2="195" stroke="#555" />

              <rect x="230" y="195" width="140" height="20" fill="#0A0A0A" stroke="none" />
              <text x="300" y="210" textAnchor="middle" fill="#A3A3A3">event detected</text>
              <line x1="300" y1="215" x2="300" y2="240" stroke="#555" />

              <line x1="200" y1="240" x2="400" y2="240" stroke="#555" />
              <line x1="200" y1="240" x2="200" y2="260" stroke="#555" markerEnd="url(#arrow)" />
              <line x1="400" y1="240" x2="400" y2="260" stroke="#555" markerEnd="url(#arrow)" />

              <text x="200" y="280" textAnchor="middle" fill="white">LOCAL UPDATE</text>

              <text x="400" y="280" textAnchor="middle" fill="white">GLOBAL COGNITION</text>
              <text x="400" y="295" textAnchor="middle" fill="#A3A3A3">when needed</text>

              <line x1="400" y1="305" x2="400" y2="330" stroke="#555" markerEnd="url(#arrow)" />
              <text x="400" y="345" textAnchor="middle" fill="white">THINK / PLAN</text>
            </svg>
          </div>

          <p className="mb-6 text-[#A3A3A3]">
            This figure should intentionally remain conceptual. The public report does <strong>not</strong> need to reveal:
          </p>
          <ul className="list-disc list-outside ml-6 mb-8 text-[#A3A3A3] space-y-2">
            <li>exact internal state representation;</li>
            <li>routing thresholds;</li>
            <li>model architecture choices;</li>
            <li>confidence functions;</li>
            <li>training strategy;</li>
            <li>commit-policy implementation;</li>
            <li>benchmark generation internals.</li>
          </ul>

          <p className="mb-6">The useful idea is enough:</p>
          <blockquote className="border-l-2 border-[#242424] pl-6 py-2 my-8 text-xl font-[family-name:var(--font-oliveira)] text-white">
            Cheap state should be able to evolve continuously while expensive global computation is invoked according to informational need rather than acoustic clock rate.
          </blockquote>
        </Section>

        {/* 12 THINKING != COMMITTING */}
        <Section num="12" title="Thinking and committing are different operations">
          <p className="mb-6">
            The self-correction experiment also implies another architectural separation. A realtime system may begin reasoning before it has enough evidence to safely expose an irreversible result. Therefore:
          </p>
          <div className="my-10">
            <BlockMath math="\text{THINK} \neq \text{COMMIT}" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border border-[#242424] bg-[#0A0A0A] p-8">
            <div>
              <h4 className="font-mono text-white tracking-widest mb-4">THINK</h4>
              <p className="text-[#A3A3A3]">May be speculative, provisional and revisable.</p>
            </div>
            <div>
              <h4 className="font-mono text-white tracking-widest mb-4">COMMIT</h4>
              <p className="text-[#A3A3A3]">Produces user-visible speech or an external side effect.</p>
            </div>
          </div>

          <p className="mb-12">
            A future realtime system should be allowed to prepare possibilities without treating every intermediate interpretation as permission to act. Conceptually:
          </p>

          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-white overflow-x-auto mb-10 font-mono w-max mx-auto md:mx-0">
{`OBSERVE
   │
   ▼
PROVISIONAL STATE
   │
   ├────────▶ THINK
   │             │
   │             ▼
   │         possible plan
   │
   ├────────▶ REVISE
   │
   ├────────▶ CANCEL
   │
   └────────▶ COMMIT ─────▶ SPEECH / ACTION`}
          </pre>

          <p className="text-[#A3A3A3]">
            This is especially important once realtime interaction is connected to tools rather than only conversation.
          </p>
        </Section>

        {/* 13 HOW WE TEST */}
        <Section num="13" title="How we test the next architecture">
          <p className="mb-6">
            The current research branch compares different policies for maintaining state across an incremental conversational stream. The public version does not need to reveal the complete benchmark corpus. A representative conceptual sequence is enough:
          </p>

          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-[#A3A3A3] overflow-x-auto mb-10 font-mono w-max">
{`Rahul
   ↓
meeting
   ↓
tomorrow
   ↓
4 PM
   ↓
no
   ↓
actually 5 PM`}
          </pre>

          <p className="mb-6">The system must support more than token accumulation. It must preserve operations such as:</p>
          <pre className="bg-[#0A0A0A] border border-[#242424] p-6 text-sm text-white overflow-x-auto mb-10 font-mono w-max">
{`WAIT
UPDATE
REVISE
RECALL
COMMIT
CANCEL`}
          </pre>

          <p className="mb-6">The current experimental framing compares three general approaches:</p>

          <div className="flex flex-col gap-8 mb-12">
            <div>
              <h4 className="text-white font-mono tracking-widest uppercase mb-2">GLOBAL</h4>
              <p className="text-[#A3A3A3]">Recompute against broad context frequently.</p>
            </div>
            <div>
              <h4 className="text-white font-mono tracking-widest uppercase mb-2">STATEFUL</h4>
              <p className="text-[#A3A3A3]">Maintain compact state continuously.</p>
            </div>
            <div>
              <h4 className="text-white font-mono tracking-widest uppercase mb-2">HYBRID</h4>
              <p className="text-[#A3A3A3]">Maintain cheap state normally and invoke broader computation when information demands it.</p>
            </div>
          </div>

          <p className="mb-6">
            The active R0 plan evaluates accumulation, correction, late constraints, cancellation, exact historical recall and cheap conversational events, while recording latency, correctness, memory behavior and expensive-compute frequency.
          </p>

          <p className="mb-6">One particularly useful metric is:</p>
          <div className="my-10">
            <BlockMath math="GIR = \frac{N_{\text{global}}}{N_{\text{updates}}}" />
          </div>
          <p className="mb-6">where <InlineMath math="GIR" /> is the <strong>Global Invocation Ratio</strong>.</p>

          <p className="mb-6">
            Lower is not automatically better. A system that never invokes expensive cognition but continually loses meaning is useless. So compute has to be measured jointly with quality:
          </p>

          <div className="my-10 overflow-x-auto">
            <BlockMath math="\text{Useful Efficiency} = f(\text{correctness}, \text{revision}, \text{recall}, \text{latency}, \text{compute})" />
          </div>

          <p className="text-[#A3A3A3]">
            The exact objective function and thresholds remain part of the experimental program rather than a public claim.
          </p>
        </Section>

        {/* 14 WHAT WE LEARNED */}
        <Section num="14" title="What we learned">

          <div className="mb-12 border-b border-[#242424] pb-12">
            <h4 className="text-[#A3A3A3] font-mono tracking-widest mb-4">01</h4>
            <h3 className="text-2xl font-[family-name:var(--font-oliveira)] text-white mb-4">Measure the boundary before optimizing it.</h3>
            <p className="text-[#A3A3A3]">Several apparently obvious latency numbers changed meaning once the exact start and end events were examined.</p>
          </div>

          <div className="mb-12 border-b border-[#242424] pb-12">
            <h4 className="text-[#A3A3A3] font-mono tracking-widest mb-4">02</h4>
            <h3 className="text-2xl font-[family-name:var(--font-oliveira)] text-white mb-4">Lower latency can produce lower correctness.</h3>
            <p className="text-[#A3A3A3] mb-4">Streaming systems operate before future information exists. A fast commitment to stale meaning is not a successful realtime result.</p>
            <div className="mb-4"><InlineMath math="\text{latency}\downarrow" /></div>
            <p className="text-[#A3A3A3] mb-4">is only useful while:</p>
            <div className="mb-4"><InlineMath math="\text{semantic correctness}" /></div>
            <p className="text-[#A3A3A3]">remains acceptable.</p>
          </div>

          <div className="mb-12 border-b border-[#242424] pb-12">
            <h4 className="text-[#A3A3A3] font-mono tracking-widest mb-4">03</h4>
            <h3 className="text-2xl font-[family-name:var(--font-oliveira)] text-white mb-4">Deleting unnecessary computation can dominate optimization.</h3>
            <p className="text-[#A3A3A3]">The largest change in the simple conversational model path came from not performing expensive cognition that the task did not require.</p>
          </div>

          <div className="mb-12 border-b border-[#242424] pb-12">
            <h4 className="text-[#A3A3A3] font-mono tracking-widest mb-4">04</h4>
            <h3 className="text-2xl font-[family-name:var(--font-oliveira)] text-white mb-4">First useful output matters more than final completion.</h3>
            <p className="text-[#A3A3A3]">That changed the speech-generation objective from complete-waveform latency to first-playable-audio latency.</p>
          </div>

          <div className="mb-12">
            <h4 className="text-[#A3A3A3] font-mono tracking-widest mb-4">05</h4>
            <h3 className="text-2xl font-[family-name:var(--font-oliveira)] text-white mb-4">Serial waiting is an architectural cost.</h3>
            <p className="text-[#A3A3A3]">Once enough individual stages were improved, the remaining problem became less about the speed of individual APIs and more about the boundaries between them.</p>
          </div>

        </Section>

        {/* 15 CURRENT POSITION */}
        <Section num="15" title="Current position">
          <p className="mb-6 text-white font-bold">B3 is the frozen engineering control.</p>
          <p className="mb-12 text-[#A3A3A3]">It gives us a measurable reference system with progressive speech delivery.</p>

          <p className="mb-6 text-white font-bold">Native realtime is the active research direction.</p>
          <p className="mb-6 text-[#A3A3A3]">The next question is not whether another API can save another hundred milliseconds. It is:</p>

          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-oliveira)] text-white my-12 leading-tight">What computation needs to exist continuously?</h2>

          <p className="mb-6 text-[#A3A3A3]">
            If rapidly changing interaction state can be maintained cheaply while global cognition runs only when the information requires it, realtime intelligence may be able to improve latency, compute efficiency and state continuity together.
          </p>
          <p className="mb-12 text-[#A3A3A3]">
            If that hypothesis fails, the experiments should show us that too. That is the purpose of the next phase.
          </p>

          <div className="border border-[#242424] bg-[#0A0A0A] p-8 mb-24">
            <h3 className="text-xs font-mono text-[#A3A3A3] tracking-widest uppercase mb-6">CURRENT RESEARCH</h3>
            <h4 className="text-white font-mono tracking-widest uppercase mb-4">R0 / NATIVE REALTIME</h4>
            <p className="text-white mb-8">
              Can continuously changing conversational state be maintained cheaply while expensive global cognition is invoked only when it is actually needed?
            </p>
            <div className="inline-block border border-white/20 text-white/50 text-xs font-mono tracking-widest px-3 py-1">
              IN PROGRESS
            </div>
          </div>
        </Section>

        <div className="w-full h-[1px] bg-[#242424] mb-24"></div>

        <section className="mb-24">
          <h2 className="text-xl font-[family-name:var(--font-oliveira)] text-white mb-8">Scope of this report</h2>
          <p className="mb-8 text-[#A3A3A3]">This report intentionally documents <strong>results and engineering reasoning</strong>, not the complete implementation.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm">
            <div>
              <div className="text-white mb-6 uppercase tracking-widest">Publicly useful</div>
              <ul className="text-[#A3A3A3] space-y-3">
                <li>experiment progression</li>
                <li>validated measurements</li>
                <li>important failures</li>
                <li>measurement methodology</li>
                <li>mathematical framing</li>
                <li>architectural principles</li>
                <li>high-level system diagrams</li>
                <li>what changed and why</li>
                <li>what remains unproven</li>
              </ul>
            </div>
            <div>
              <div className="text-white mb-6 uppercase tracking-widest">Intentionally omitted</div>
              <ul className="text-[#A3A3A3] space-y-3">
                <li>provider credentials and infrastructure</li>
                <li>internal prompts</li>
                <li>complete runtime code</li>
                <li>exact routing and confidence thresholds</li>
                <li>complete benchmark corpus</li>
                <li>full failure traces</li>
                <li>private model-selection experiments</li>
                <li>internal cost structure</li>
                <li>unreleased implementation details</li>
                <li>speculative architecture details that have not yet earned evidence</li>
              </ul>
            </div>
          </div>

          <p className="mt-16 text-[#A3A3A3] italic">
            The goal is to expose enough information for the work to be technically inspectable without turning the research log into an implementation manual.
          </p>
        </section>

      </article>
    </main>
  );
}
