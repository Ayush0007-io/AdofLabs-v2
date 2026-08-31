import Link from "next/link";
import { researchArticles } from "@/content/research/articles";

export default function LiveSpeechMeasurementsPage() {
  const article = researchArticles.find(a => a.slug === "live-speech-measurements");

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
            In our B3 control, median time from the end of input to browser playback was <strong>1637.8 ms</strong>. Streaming speech synthesis accounted for a median <strong>611.8 ms to first audio</strong>, while the final client-audio-to-playback path measured only <strong>4.7 ms</strong>. Across the three observed runs we saw <strong>0/3 playback underruns</strong>. The control was still serial and turn-oriented. The numbers therefore did not tell us that realtime interaction was solved; they told us where it wasn&apos;t being lost.
          </blockquote>

          <p className="mb-8">
            We built the control because component benchmarks were becoming increasingly unhelpful. A speech recognizer can report low server latency, a language model can stream quickly and a speech synthesizer can produce first audio in hundreds of milliseconds, yet the complete interaction can still feel slow. The missing measurement is the path the human actually experiences.
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 1 — Instrumentation points across the live path</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`mic
 │
 T0 capture start
 │
audio chunks
 │
 T1 input end
 │
transport
 │
 T2 server receive
 │
speech understanding
 │
 T3 usable transcript
 │
response generation
 │
 T4 synthesis request
 │
TTS stream
 │
 T5 first audio
 │
browser
 │
 T6 playable buffer
 │
speaker
 │
 T7 playback`}
</pre>
            </div>
            <p className="text-sm text-[#888888] mt-4 italic">
              Measurement boundary definition.
            </p>
          </div>

          <p className="mb-8">
            We started at the browser because otherwise server measurements could hide capture and transport costs. The client was recording mono WebM/Opus at a 48 kHz browser sample rate and emitting audio in small chunks. Early runs let us establish the basic capture rate, payload size and round-trip behavior before speech understanding was added. That made later regressions attributable to the speech stack rather than an unknown frontend path.
          </p>

          <p className="mb-8">
            Adding transcription immediately exposed another useful distinction: provider latency was not the same thing as usable transcript latency. In one early whole-file transcription run the server completed quickly but the resulting transcript was empty. From a latency dashboard that request looked successful. From the perspective of the conversational system it contributed zero useful information. That changed the metric we cared about from “request completed” to “usable state became available.”
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 2 — A1 → A2 → B0 → B1 → B2 → B3</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`A1   capture + transport
A2   + speech understanding
B0   + response path
B1   timing instrumentation
B2   streaming playback
B3   frozen serial control`}
</pre>
            </div>
            <p className="text-sm text-[#888888] mt-4 italic">
              Each stage added one source of latency while keeping enough of the previous path fixed to preserve comparability.
            </p>
          </div>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 3 — B3 latency waterfall</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto text-lg">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`Input end ─────────────────────────────────── Playback
             1637.8 ms median

                       TTS first audio
                       611.8 ms median

                                             client → playback
                                             4.7 ms

                       TTS completion
                       895.2 ms

                       underruns
                       0 / 3 observed`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            The first useful conclusion was negative: browser playback was not where we should spend engineering effort. A 4.7 ms client-audio-to-playback path inside a roughly 1.64 s end-to-end control leaves almost nothing to recover there. That sounds obvious after measurement; it was not something we wanted to assume beforehand.
          </p>

          <p className="mb-8">
            The second conclusion was that synthesis needs at least two measurements. Total synthesis completion describes throughput. Time to first audio describes conversational responsiveness. A synthesizer can take longer to complete the entire utterance while still producing a good interaction if generation remains ahead of playback. Conversely, impressive total throughput does not help much if the first audible packet arrives late.
          </p>

          <p className="mb-8">
            The third conclusion was architectural. B3 still waited too often. Even after streaming was introduced, the interaction was fundamentally a chain of dependencies. The system accumulated delay not because every component was individually slow, but because useful work began too late. That moved our next question away from provider-by-provider optimization and toward concurrency: what can begin before the previous stage is “finished”?
          </p>

          <div className="my-12">
            <h3 className="text-sm tracking-widest text-[#888888] uppercase mb-4 font-bold">Figure 4 — Same components, different scheduling</h3>
            <div className="bg-[#111111] border border-[#222] p-6 rounded-lg overflow-x-auto flex gap-16">
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`B3 SERIAL

capture → STT → reason → tool → TTS`}
</pre>
<pre className="text-[#A0A0A0] font-mono text-sm leading-relaxed">
{`EXPERIMENTAL OVERLAP

capture ────────────────
       STT ─────────────
           state ─────────────
              reason ───────
                 tool ─────────────
                   speech ───────────`}
</pre>
            </div>
          </div>

          <p className="mb-8">
            The control is intentionally weak evidence for full-duplex behavior. It does not demonstrate simultaneous speaking and listening, interruption recovery, tool use while speech continues, or long-lived shared state. It is simply a measured reference point against which later architectures can be compared. That distinction matters because without a frozen control, improvements in perceived speed are difficult to attribute.
          </p>

          <p className="mb-8">
            We are now more interested in the amount of <strong>avoidable waiting</strong> in the critical path than in a single latency number. If transcription, state update, response planning, tool execution and synthesis can overlap without making the system incoherent, then the useful optimization target changes from component speed to scheduling and state coordination.
          </p>

        </article>
      </div>
    </main>
  );
}
