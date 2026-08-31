import { CompanyHero } from "@/components/sections/company/company-hero";
import { CompanyOrigin } from "@/components/sections/company/company-origin";
import { CompanyDirection } from "@/components/sections/company/company-direction";
import { CompanyPeople } from "@/components/sections/company/company-people";

export default function CompanyPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <CompanyHero />
      <CompanyOrigin />
      <CompanyDirection />
      <CompanyPeople />
    </main>
  );
}
