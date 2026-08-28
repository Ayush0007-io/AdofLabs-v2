import Link from "next/link";

export function CompanyPeople() {
  const people = [
    { 
      name: "Ayush Singh", 
      role: "Founder / Engineering", 
      desc: "Working on runtime architecture, audio transport pipelines and integrating speech understanding layers into the stack.", 
      links: [{ label: "LinkedIn", url: "#" }, { label: "GitHub", url: "#" }, { label: "X", url: "#" }] 
    },
    { 
      name: "Placeholder Name", 
      role: "Research", 
      desc: "Investigating multi-clock architectures, state management and failure modes in real-time model interaction.", 
      links: [{ label: "Google Scholar", url: "#" }, { label: "GitHub", url: "#" }] 
    }
  ];

  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32 border-t border-white/5">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="flex flex-col mb-16">
          <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-6 block">07 / People</span>
          <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] text-[#FAFAFA] leading-[1.15] tracking-tight">
            The people behind the work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {people.map((person, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full aspect-square bg-white/[0.02] mb-6 relative border border-white/5 overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 rounded-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#444]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-oliveira)] text-[24px] text-[#FAFAFA] tracking-tight mb-2">{person.name}</h3>
              <span className="font-mono text-[#888] text-[11px] tracking-[0.15em] uppercase mb-4 block">{person.role}</span>
              <p className="text-[#A0A0A0] text-[14px] md:text-[15px] font-light leading-[1.6] mb-6 max-w-[400px]">{person.desc}</p>
              <div className="flex flex-wrap items-center gap-6">
                {person.links.map((link, j) => (
                  <Link key={j} href={link.url} className="font-mono text-[#666] hover:text-[#FAFAFA] text-[10px] tracking-[0.15em] uppercase transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
