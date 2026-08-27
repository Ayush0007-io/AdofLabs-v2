export function CompanyOrigin() {
  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32 border-t border-white/5">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col">
        
        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Text Story */}
          <div className="w-full md:w-3/5 flex flex-col">
            <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">02 / Our Origin</span>
            <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] lg:text-[42px] text-[#FAFAFA] leading-[1.15] tracking-tight mb-8">
              We didn&apos;t start with a research thesis. We arrived at one.
            </h2>
            <div className="flex flex-col gap-6 text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6]">
              <p>
                Our early work was applied AI engineering. We built systems around real business workflows, where intelligence had to interact with people, use software and produce outcomes rather than simply generate answers.
              </p>
              <p>
                The closer we got to real deployment, the more the same problems appeared. Faster models alone did not solve interaction latency. Better reasoning did not solve state. Tool access did not guarantee successful execution. Adding more capability also increased infrastructure and inference cost.
              </p>
              <p className="text-[#FAFAFA] font-normal border-l-2 border-white/20 pl-5 ml-1 mt-2">
                What initially looked like a collection of product problems began to look like one systems problem. That realization changed the direction of AdofLabs: from applying existing intelligence to investigating how the underlying intelligence and runtime should work.
              </p>
            </div>
          </div>
          
          {/* Subtle Visual Timeline */}
          <div className="w-full md:w-2/5 flex flex-col justify-center mt-8 md:mt-0">
             <div className="w-full flex flex-col gap-8 relative before:absolute before:left-[4.5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
               {["Real Deployments", "Repeated Failure Modes", "System-Level Problem", "Model + Architecture Research", "Adof Labs Today"].map((step, i) => (
                 <div key={i} className="flex items-center gap-6 relative">
                   <div className={`w-2.5 h-2.5 rounded-full border flex-shrink-0 bg-[var(--background)] ${i === 4 ? 'border-[#FAFAFA] bg-[#FAFAFA]' : 'border-white/30'}`} />
                   <span className={`font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase ${i === 4 ? 'text-[#FAFAFA]' : 'text-[#666]'}`}>
                     {step}
                   </span>
                 </div>
               ))}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
