import { HomeHero } from "@/components/sections/home/home-hero";
import { FrontierSection } from "@/components/sections/home/frontier-section";
import { CurrentWorkSection } from "@/components/sections/home/current-work-section";
import { ProgressSection } from "@/components/sections/progress/progress-section";
import { LabsSection } from "@/components/sections/lab/labs-section";
import { ResearchInsightsSection } from "@/components/sections/research/research-insights-section";

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
