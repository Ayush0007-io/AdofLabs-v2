import Image from "next/image";
import Link from "next/link";
import { researchArticles } from "@/content/research/articles";

export function ResearchFeaturedSection() {
  const featuredArticle = researchArticles.find((article) => article.id === "01");

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="relative w-full bg-[var(--background)] pb-24 md:pb-32 z-10">
      <div className="w-full max-w-[1200px] px-6 md:px-12 mx-auto flex flex-col">
        
        {/* Overline */}
        <div className="w-full border-t border-white/10 pt-16 flex items-center justify-between mb-12">
          <h2 className="font-[family-name:var(--font-oliveira)] text-[#FAFAFA] text-lg tracking-wide uppercase">
            02 / Featured
          </h2>
        </div>

        {/* Featured Card */}
        <Link href="#" className="w-full relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer block">
          {/* Background Image that scales slowly */}
          <div className="absolute inset-0 z-0">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-40 md:opacity-60"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent" />
          </div>

          <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 flex flex-col md:w-[70%]">
            <p className="text-[#888888] font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase mb-6 group-hover:text-white transition-colors duration-300">
              FEATURED · {featuredArticle.type} · {featuredArticle.date}
            </p>
            
            <h3 className="font-[family-name:var(--font-oliveira)] text-4xl md:text-5xl lg:text-[64px] text-[#FAFAFA] font-light leading-[1.1] tracking-tight mb-8">
              {featuredArticle.title}
            </h3>
            
            <p className="text-[17px] md:text-[20px] leading-[1.6] text-[#A0A0A0] font-light max-w-[550px] mb-12 group-hover:text-[#ccc] transition-colors duration-300">
              {featuredArticle.summary}
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white text-black h-[48px] px-8 rounded-full font-[family-name:var(--font-oliveira)] text-[14px] font-medium tracking-wide transition-all duration-300 w-fit group-hover:bg-[#e0e0e0]">
              READ RESEARCH
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}
