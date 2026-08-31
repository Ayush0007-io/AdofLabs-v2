import Link from "next/link";
import { researchArticles } from "@/content/research/articles";

export default function RealTimeSystemsPage() {
  const article = researchArticles.find(a => a.slug === "real-time-systems");

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
            A turn-based agent has a useful luxury: while it is thinking, almost nothing else has to change. The user finishes a request, the system resolves it, tools run, a response is produced, and only then does the next turn begin. Once an agent is expected to remain present while a person speaks, interrupts, changes intent and waits for external actions to finish, that assumption disappears. The system can be reasoning about one state while perception has already produced another.
          </blockquote>

          <p className="mb-8">
            Consider a simple request: “Find the latest invoice from Acme and send it to Rahul.” A serial agent can resolve Acme, search documents, identify an invoice, resolve Rahul, compose the message and call an email tool. Now add one event 600 ms later: “Actually, send it to Priya.” The language problem is trivial. The systems problem is not. At the moment the correction arrives, the agent may already have resolved Rahul, started composing, or crossed the boundary where an external side effect can no longer be safely reversed.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 1 — Intent and execution diverging in time</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`time ─────────────────────────────────────────────────────>

USER       "send latest Acme invoice to Rahul"
                         "actually, Priya"
                              │
INTENT     v12 ───────────────┼────────────── v13
                              │
SEARCH          █████████
RESOLVE               ███████
COMPOSE                       █████████
SEND                                  │ commit?
                                      │
TOOL RESULT                              ███████

                               stale recipient risk`}
</pre>
            </div>
            <p className="text-sm text-[#888888] mt-4 italic">
              The difficult boundary is not understanding the correction. It is determining which version of intent is allowed to commit an irreversible action.
            </p>
          </div>

          <p className="mb-8">
            This changes how we think about conversational state. In a chatbot, state is often treated as context assembled before inference: messages, memory, retrieved documents and tool outputs are collected, then passed into a model. In a continuous system, state is not merely context. It is a live coordination surface. Perception can mutate it. A tool can mutate it. The user can invalidate it. Verification can contradict what the planner believed happened.
          </p>

          <p className="mb-8">
            The obvious solution is to keep the interaction loop responsive while execution runs independently. But separating the loops creates a second problem: they now have to agree on what is true. A speech process may already be acknowledging the task while a tool worker is still operating on an older intent version. A long-running action may return after the user has cancelled it. A verifier may observe that the external world disagrees with the state the planner assumed.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 2 — One shared state, several asynchronous writers</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`                 perception
                     │
                     ▼
                ┌─────────┐
user intent ───▶│ state   │◀──── tool result
                │ v13     │
reasoning ─────▶│         │◀──── verification
                └────┬────┘
                     │
                     ▼
               action commit`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            Latency becomes harder for the same reason. The user does not experience “LLM latency” or “TTS latency” independently. They experience the critical path created by the runtime. If speech recognition waits for endpointing, reasoning waits for transcription, tools wait for reasoning and speech waits for tools, individually acceptable components combine into an interaction that feels inert.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 3 — Serial latency versus overlap</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto flex gap-16">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`capture → STT → reason → tool → TTS`}
</pre>
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`capture ────────────────
       STT ─────────────
           state ─────────────
              reason ───────
                 tool ─────────────
                   speech ───────────`}
</pre>
            </div>
            <p className="text-sm text-[#888888] mt-4 italic">
              The research question is increasingly not “how do we make each block faster?” but “which dependencies actually need to remain serial?”
            </p>
          </div>

          <p className="mb-8">
            A third issue appeared at the end of the loop. Tool execution produces evidence that an action was attempted, not necessarily that the user&apos;s objective became true. <code>sendEmail()</code> returning successfully establishes very little about whether the correct file reached the correct person. A calendar API returning an event ID does not establish that the intended attendees were invited with the intended time. Once agents can create external side effects, “tool call succeeded” is too weak a terminal state.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 4 — Execution state versus outcome state</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`INTENT
  ↓
ACTION REQUESTED
  ↓
TOOL ACCEPTED
  ↓
EXTERNAL STATE CHANGED
  ↓
EXPECTED OUTCOME OBSERVED`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            These failures look unrelated when examined at the API level: response latency, interruption handling, stale state, tool concurrency and verification. At runtime they collapse into the same problem. The agent has several processes advancing at different speeds while sharing responsibility for one evolving objective.
          </p>

          <p className="mb-8">
            Our current view is that continuously available intelligence will require less serialization and more explicit control over state, authority and time. Perception should be able to advance without waiting for global reasoning. Execution should be interruptible without freezing interaction. Expensive reasoning should not necessarily sit on every fast path. And actions should remain provisional until the system can reconcile what it intended with what actually happened.
          </p>

        </article>
      </div>
    </main>
  );
}
