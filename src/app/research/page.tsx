import { InsightsHero } from "@/components/sections/research/insights-hero";
import { ResearchFeaturedSection } from "@/components/sections/home/research-featured";
import { ResearchListSection } from "@/components/sections/research/research-list";

export default function ResearchPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <InsightsHero />
      <ResearchFeaturedSection />
      <ResearchListSection />
    </main>
  );
}
