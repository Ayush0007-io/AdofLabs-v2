import { HomeHero } from "@/components/sections/home-hero";
import { FrontierSection } from "@/components/sections/frontier-section";
import { CurrentWorkSection } from "@/components/sections/current-work-section";
import { ProgressSection } from "@/components/sections/progress-section";
import { LabsSection } from "@/components/sections/labs-section";
import { ResearchInsightsSection } from "@/components/sections/research-insights-section";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FrontierSection />
      <CurrentWorkSection />
      <ProgressSection />
      <LabsSection />
      <ResearchInsightsSection />
    </main>
  );
}
