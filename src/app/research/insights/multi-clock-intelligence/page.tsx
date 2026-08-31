import Link from "next/link";
import { researchArticles } from "@/content/research/articles";

export default function MultiClockIntelligencePage() {
  const article = researchArticles.find(a => a.slug === "multi-clock-intelligence");

  if (!article) return null;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[#FAFAFA] font-[family-name:var(--font-oliveira)] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <Link prefetch={true} href="/research" className="text-[#888888] hover:text-[#FAFAFA] text-sm tracking-wide transition-colors">
            ← BACK TO RESEARCH
          </Link>
        </div>

        <header className="mb-16">
          <span className="text-[#888888] text-xs font-bold tracking-widest uppercase mb-4 block">
            {article.id} — {article.type}
          </span>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-8">
            {article.title}
          </h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none prose-p:text-[#A0A0A0] prose-p:font-light prose-p:leading-relaxed prose-headings:font-normal prose-blockquote:border-l-4 prose-blockquote:border-[#333] prose-blockquote:pl-6 prose-blockquote:text-[#FAFAFA] prose-blockquote:italic">

          <blockquote className="text-xl mb-12">
            Our serial control exposed an uncomfortable mismatch: the fastest parts of interaction need updates far more often than the most expensive parts of cognition. Speech activity can change within tens of milliseconds. Conversational state may need revision several times a second. A tool may complete seconds later. Deep planning may be unnecessary for most of that interval. Yet a conventional agent architecture tends to repeatedly route these events through the same general reasoning path.
          </blockquote>

          <p className="mb-8">
            We are investigating whether a continuously operating agent should have more than one computational clock: a cheap state process that runs continuously, slower semantic and execution processes that update when relevant events arrive, and sparse global cognition that is invoked only when local state is insufficient.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 1 — Candidate timing model</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`FAST                  MEDIUM                    SPARSE
1–100 ms              100 ms–seconds           event triggered

perception             semantic state           deep reasoning
floor state            tool coordination        replanning
interruptions          response control         global correction
local prediction       verification

        \\                  |                    /
         \\                 |                   /
          └──────── VERSIONED SHARED STATE ───┘`}
</pre>
            </div>
            <p className="text-sm text-[#888888] mt-4 italic">
              Candidate ranges for multi-clock operation.
            </p>
          </div>

          <p className="mb-8">
            The interesting part is not assigning different models to different speeds. The difficult part is preserving one coherent objective while those processes operate on different versions of the world. If global reasoning begins at state version 41 and perception advances the system to version 47 before reasoning finishes, the result cannot automatically be treated as current.
          </p>

          <p className="mb-8">
            One design we want to test is versioned shared state. Fast processes continuously publish small updates. Slower processes read a specific state version and return proposals rather than immediately mutating the world. Before an irreversible action is committed, the runtime checks whether the assumptions behind the proposal still hold against the latest intent and external state.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 2 — Stale reasoning and commit validation</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`v41 ── deep reasoning starts
 │
v42 ── speech update
 │
v43 ── tool result
 │
v44 ── user correction
 │
v45
 │
 └──── reasoning result from v41 arrives
                  │
                  ▼
            validate assumptions
             /            \\
         still valid      stale
            │              │
         commit          rebase/replan`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            The reason we are interested in recurrent or state-space style computation is not that recurrence is inherently better than attention. It is that continuous interaction creates a different economic problem. Maintaining a compact evolving state may be cheaper than repeatedly reconstructing the entire relevant past whenever a small event arrives. Global attention can then be reserved for the moments where broad context or difficult reasoning is actually required.
          </p>

          <p className="mb-8">
            Tool execution makes the separation more useful. A network request does not need to occupy the conversational reasoning loop while it waits. It can become an event source. The runtime can continue listening, speaking and updating local state; the eventual tool result is incorporated when it arrives. The difficult part is deciding whether that result is still relevant to the current objective.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 3 — Tool as asynchronous event, not blocking step</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`speech   ────────────── listening & updating ──────────────>
tool     (request sent) · · · · · · · · · (result arrives)`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            Sparse global cognition only works if the system can recognize when local processing is no longer enough. Candidate escalation signals include rising uncertainty, conflicting state updates, an irreversible action, verification failure, a novel task structure or a large difference between expected and observed external state. We do not yet know which of these signals are sufficient, or whether learning the escalation policy will outperform explicit rules.
          </p>

          <p className="mb-8">
            The useful experiment is not “multi-clock versus single-clock accuracy.” We need to compare a strong serial control against an asynchronous runtime while holding task and model capability as constant as possible. The measurements we care about are end-of-input to useful response, compute consumed per active conversational minute, interruption recovery, stale-state rejection, successful concurrent tool execution, verified task completion and the frequency with which local processing unnecessarily escalates to global cognition.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 4 — Experimental matrix</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<table className="w-full text-left text-[#A0A0A0] text-sm">
  <thead>
    <tr className="border-b border-[#333]">
      <th className="pb-3 font-normal text-[#FAFAFA]"></th>
      <th className="pb-3 font-normal text-[#FAFAFA]">Serial control</th>
      <th className="pb-3 font-normal text-[#FAFAFA]">Multi-clock candidate</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-[#222]">
      <td className="py-3 font-medium text-[#FAFAFA]">Reasoning</td>
      <td className="py-3">every turn</td>
      <td className="py-3">event/escalation</td>
    </tr>
    <tr className="border-b border-[#222]">
      <td className="py-3 font-medium text-[#FAFAFA]">State</td>
      <td className="py-3">reconstructed</td>
      <td className="py-3">continuously updated</td>
    </tr>
    <tr className="border-b border-[#222]">
      <td className="py-3 font-medium text-[#FAFAFA]">Tools</td>
      <td className="py-3">blocking</td>
      <td className="py-3">asynchronous</td>
    </tr>
    <tr className="border-b border-[#222]">
      <td className="py-3 font-medium text-[#FAFAFA]">Verification</td>
      <td className="py-3">terminal</td>
      <td className="py-3">feedback event</td>
    </tr>
    <tr>
      <td className="py-3 font-medium text-[#FAFAFA]">Speech</td>
      <td className="py-3">downstream</td>
      <td className="py-3">concurrent target</td>
    </tr>
  </tbody>
</table>
            </div>
          </div>

          <p className="mb-8">
            There are several ways this direction can fail. Coordination may cost more than the computation it saves. Slower reasoning may become stale too frequently. Compact recurrent state may discard information that global reasoning later needs. Concurrency may improve latency while making task completion less reliable. If those effects dominate, a simpler serialized architecture may remain the better engineering tradeoff.
          </p>

          <p className="mb-8">
            So the question behind “more than one clock” is not whether intelligence can be split into fast and slow modules. It is whether a system can allow cognition to progress asynchronously without losing a coherent relationship between intent, state and action. That is the part we have not validated yet.
          </p>

        </article>
      </div>
    </main>
  );
}
