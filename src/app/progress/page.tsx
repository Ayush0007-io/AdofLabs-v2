import { ProgressHero } from "@/components/sections/progress-hero";
import { ProgressTimeline } from "@/components/sections/progress-timeline";
import { ProgressReleases } from "@/components/sections/progress-releases";
import { ProgressCompany } from "@/components/sections/progress-company";

export default function ProgressPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <ProgressHero />
      <ProgressTimeline />
      <ProgressReleases />
      <ProgressCompany />
    </main>
  );
}
