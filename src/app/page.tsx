import { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/home-hero";
import { FrontierSection } from "@/components/sections/home/frontier-section";
import { CurrentWorkSection } from "@/components/sections/home/current-work-section";
import { ProgressSection } from "@/components/sections/progress/progress-section";
import { LabsSection } from "@/components/sections/lab/labs-section";
import { ResearchInsightsSection } from "@/components/sections/research/research-insights-section";

export const metadata: Metadata = {
  title: "AdofLabs — Building Intelligence for the Real World",
  description: "AdofLabs is an AI research and engineering company building real time intelligence that develops an evolving understanding of the world, adapts as it changes, and turns intent into verified action across digital and physical environments.",
  openGraph: {
    title: "AdofLabs — Building Intelligence for the Real World",
    description: "AdofLabs is an AI research and engineering company building real time intelligence that develops an evolving understanding of the world, adapts as it changes, and turns intent into verified action across digital and physical environments.",
  },
  twitter: {
    title: "AdofLabs — Building Intelligence for the Real World",
    description: "AdofLabs is an AI research and engineering company building real time intelligence that develops an evolving understanding of the world, adapts as it changes, and turns intent into verified action across digital and physical environments.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://adoflabs.com/#organization",
        "name": "AdofLabs",
        "url": "https://adoflabs.com",
        "logo": "https://adoflabs.com/adoflogo%20(1).svg",
        "description": "AdofLabs is an AI research and engineering company building real time intelligence that develops an evolving understanding of the world, adapts as it changes, and turns intent into verified action across digital and physical environments.",
        "sameAs": [
          "https://www.linkedin.com/company/adof-labs/",
          "https://x.com/Adoflabs"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://adoflabs.com/#website",
        "url": "https://adoflabs.com",
        "name": "AdofLabs",
        "publisher": {
          "@id": "https://adoflabs.com/#organization"
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <FrontierSection />
      <CurrentWorkSection />
      <ProgressSection />
      <LabsSection />
      <ResearchInsightsSection />
    </main>
  );
}
