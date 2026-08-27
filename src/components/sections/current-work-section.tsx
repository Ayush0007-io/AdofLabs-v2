import Link from "next/link";
import Image from "next/image";

export function CurrentWorkSection() {
  return (
    <section className="relative z-10 w-full bg-[var(--background)] py-16 md:py-24 flex justify-center text-[#FAFAFA]">
      <div className="w-full max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          
          {/* Left: Image */}
          <div className="relative w-full md:w-[55%] flex items-start justify-center group">
            <Image
              src="/images/what we build.png"
              alt="What we build"
              width={1600}
              height={1600}
              quality={100}
              unoptimized
              className="w-full scale-[1.15] origin-top h-auto object-contain transition-transform duration-700 group-hover:scale-[1.22]"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-[45%] flex flex-col justify-start pt-2 md:pt-4">
            <h2 className="font-[family-name:var(--font-oliveira)] text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] font-light tracking-[-0.02em] mb-10 text-[#FAFAFA]">
              We’re developing our own continuous model and runtime architecture.
            </h2>
            
            <div className="w-full h-px bg-white/10 mb-8" />
            
            <p className="text-[#A0A0A0] text-[17px] md:text-[19px] leading-[1.6] font-light mb-10 max-w-[480px]">
              Intelligence can listen, speak, reason, use software and complete tasks within the same live loop without stopping the interaction or requiring expensive computation at every moment.
            </p>
            
            <div>
              <Link 
                href="/research" 
                className="group/btn inline-flex items-center justify-center bg-[#1A1A1A] border border-[#333] text-[#EDEDED] font-medium rounded-full hover:bg-[#222] hover:border-[#444] transition-all duration-300 text-[13px] md:text-[14px] tracking-wider px-8 py-4 gap-3 whitespace-nowrap uppercase"
              >
                Explore our research
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-x-1 opacity-90">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
