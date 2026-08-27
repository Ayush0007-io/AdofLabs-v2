import { LabHero } from "@/components/sections/lab-hero";
import { LabWorkSection } from "@/components/sections/lab-work-section";

export default function LabPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <LabHero />
      <LabWorkSection />
    </main>
  );
}
