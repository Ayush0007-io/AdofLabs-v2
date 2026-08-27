import { InsightsHero } from "@/components/sections/insights-hero";
import { ResearchFeaturedSection } from "@/components/sections/research-featured";
import { ResearchListSection } from "@/components/sections/research-list";

export default function ResearchPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <InsightsHero />
      <ResearchFeaturedSection />
      <ResearchListSection />
    </main>
  );
}
