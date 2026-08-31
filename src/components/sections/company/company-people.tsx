import Link from "next/link";
import Image from "next/image";

export function CompanyPeople() {
  const people = [
    { 
      name: "Ayush Singh", 
      role: "Founder", 
      desc: "Ayush works across AI engineering, systems architecture, product and the technical direction of AdofLabs. Before AdofLabs moved into its current R&D phase, he worked across more than 10 client engagements taking problems from business requirements through system design, implementation and deployment. That range now shapes how he builds AdofLabs: understand the whole system, stay close to what actually happens in production, and go deeper only when the problem demands it.", 
      focus: [],
      background: "",
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/aayushsingh0007/" }, { label: "X", url: "https://x.com/theayush_io" }],
      image: "/images/Ayush-profile.png"
    },
    { 
      name: "Rushikesh Patil", 
      role: "Engineering", 
      desc: "Rushikesh works across experiments and engineering at AdofLabs, helping turn technical questions into systems that can be built, tested and measured.", 
      focus: [],
      background: "",
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/rushi8208/" }, { label: "X", url: "#" }],
      image: "/images/profile rushikesh.jpeg"
    }
  ];

  return (
    <section className="relative w-full bg-[var(--background)] py-20 md:py-32 border-t border-white/5">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="flex flex-col mb-16">
          <span className="font-mono text-[#666] text-[11px] tracking-[0.2em] uppercase mb-6 block">04 / People</span>
          <h2 className="font-[family-name:var(--font-oliveira)] text-[28px] md:text-[36px] text-[#FAFAFA] leading-[1.15] tracking-tight">
            The people behind the work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {people.map((person, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full aspect-square mb-6 relative overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 rounded-lg">
                {person.image ? (
                  <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#444]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <h3 className="font-[family-name:var(--font-oliveira)] text-[24px] text-[#FAFAFA] tracking-tight mb-2">{person.name}</h3>
              <span className="font-mono text-[#888] text-[11px] tracking-[0.15em] uppercase mb-4 block">{person.role}</span>
              <p className="text-[#A0A0A0] text-[14px] md:text-[15px] font-light leading-[1.6] mb-6 max-w-[400px]">{person.desc}</p>
              
              {(person.focus.length > 0 || person.background) && (
                <div className="mb-6 flex flex-col gap-4 border-t border-white/10 pt-4 max-w-[400px]">
                  {person.focus.length > 0 && (
                    <div>
                      <span className="font-mono text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2 block">Current Focus</span>
                      <ul className="text-[#A0A0A0] text-[13px] font-light leading-[1.6]">
                        {person.focus.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {person.background && (
                    <div>
                      <span className="font-mono text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2 block">Background</span>
                      <p className="text-[#A0A0A0] text-[13px] font-light leading-[1.6]">{person.background}</p>
                    </div>
                  )}
                </div>
              )}

              {person.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-6 mt-auto">
                  {person.links.map((link, j) => (
                    <Link key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[#666] hover:text-[#FAFAFA] text-[13px] tracking-[0.15em] uppercase transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
