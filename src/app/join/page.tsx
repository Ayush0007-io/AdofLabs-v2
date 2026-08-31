import { JoinForm } from "@/components/forms/join-form";

export default function JoinPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)] min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        
        {/* Top: Headline (left) and Subheadline (right) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="flex-1">
            <h1 
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: "1",
                letterSpacing: "-0.02em"
              }}
              className="font-[family-name:var(--font-oliveira)] font-light text-[#FAFAFA] text-balance"
            >
              Work on what comes next.
            </h1>
          </div>
          <div className="flex-1 md:pt-12">
            <p className="text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6]">
              AdofLabs is looking for people who want to work on hard technical problems across research, systems and engineering. If our work overlaps with something you care deeply about, tell us what you’ve built and what you want to explore.
            </p>
          </div>
        </div>

        {/* Below: Form */}
        <div className="w-full max-w-[800px] mx-auto bg-[#0a0a0a] border border-[#222] p-8 md:p-12 rounded-3xl">
          <JoinForm />
        </div>

      </div>
    </main>
  );
}
