import Link from "next/link";

export function FooterCtaSection() {
  return (
    <footer className="w-full bg-[var(--background)] text-[#FAFAFA] relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1560px] px-6 md:px-12 lg:px-24 mx-auto w-full relative z-10 pt-20 md:pt-24 lg:pt-32 flex flex-col">
        
        {/* TOP COMPOSITION: Asymmetric 12-col grid */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-16 md:gap-8 w-full">
          
          {/* LEFT NAVIGATION: ~5 cols */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 flex flex-row gap-16 md:gap-24 lg:gap-32">
            <nav className="flex flex-col gap-6">
              <span className="font-[family-name:var(--font-oliveira)] font-medium text-sm text-[#888888] tracking-wide uppercase">
                Explore
              </span>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/research" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/lab" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Lab
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Research & Insights
                  </Link>
                </li>
                <li>
                  <Link href="/progress" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Progress
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="flex flex-col gap-6">
              <span className="font-[family-name:var(--font-oliveira)] font-medium text-sm text-[#888888] tracking-wide uppercase">
                Adof Labs
              </span>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/company" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="font-[family-name:var(--font-oliveira)] text-[16px] md:text-[18px] text-[#FAFAFA] hover:text-[#A0A0A0] transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT CTA: ~7 cols */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col w-full max-w-[700px]">
            <h2 className="font-[family-name:var(--font-oliveira)] text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.02] tracking-tight text-[#FAFAFA] font-normal text-balance mb-8">
              Some of the hardest problems in intelligence are still open.
            </h2>
            <p className="text-[17px] md:text-[20px] leading-[1.6] text-[#A0A0A0] font-light max-w-[560px] mb-12">
              We’re looking for researchers, engineers and collaborators who want to work on them.
            </p>
            <div>
              <Link 
                href="/join"
                className="group inline-flex items-center gap-3 bg-white text-black h-[48px] md:h-[52px] px-6 md:px-8 rounded-full font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] font-medium tracking-wide hover:bg-[#e0e0e0] transition-colors duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                JOIN THE MISSION
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* PRIMARY DIVIDER */}
        <div className="w-full border-t border-white/10 mt-24 md:mt-32 lg:mt-[160px]" />

        {/* UTILITY ROW */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8">
          <p className="font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] text-[#666666]">
            © 2026 AdofLabs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <Link href="/privacy" className="font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300">
              Terms
            </Link>
            <Link href="https://linkedin.com" className="font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300">
              LinkedIn
            </Link>
            <Link href="https://x.com" className="font-[family-name:var(--font-oliveira)] text-[14px] md:text-[15px] text-[#666666] hover:text-[#FAFAFA] transition-colors duration-300">
              X
            </Link>
          </div>
        </div>

      </div>

      {/* OVERSIZED ADOFLABS WORDMARK */}
      <div 
        aria-hidden="true" 
        className="w-full relative flex justify-center items-end select-none pointer-events-none pb-2 mt-8 md:mt-16 overflow-hidden"
      >
        <span 
          className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] opacity-100 leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 16vw, 22rem)", letterSpacing: "-0.02em" }}
        >
          ADOF LABS
        </span>
      </div>
    </footer>
  );
}
