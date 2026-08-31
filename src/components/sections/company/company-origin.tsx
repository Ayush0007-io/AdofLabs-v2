export function CompanyOrigin() {
  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32 border-t border-white/5">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col">
        
        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Text Story */}
          <div className="w-full md:w-3/5 flex flex-col">
            <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-8 block">02 / Our Origin</span>
            <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] lg:text-[42px] text-[#FAFAFA] leading-[1.15] tracking-tight mb-8">
              At some point, fixing the application stopped feeling like the real problem.
            </h2>
            <div className="flex flex-col gap-6 text-[#A0A0A0] text-[15px] md:text-[17px] font-light leading-[1.6]">
              <p>
                The systems kept getting better, but the difficult parts started moving underneath the product itself. State changed while work was still running. Tools completed without guaranteeing the intended outcome. More capability created more coordination, compute and reliability problems.
              </p>
              <p>
                We could keep patching each application separately. Or we could start asking what kind of underlying system would make those problems easier to solve in the first place.
              </p>
              <p className="text-[#FAFAFA] font-normal border-l-2 border-white/20 pl-5 ml-1 mt-2">
                That question changed the direction of AdofLabs.
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
