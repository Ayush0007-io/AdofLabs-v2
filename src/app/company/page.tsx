import { CompanyHero } from "@/components/sections/company-hero";
import { CompanyOrigin } from "@/components/sections/company-origin";
import { CompanyDirection } from "@/components/sections/company-direction";
import { CompanyPrinciples } from "@/components/sections/company-principles";
import { CompanyStatus } from "@/components/sections/company-status";
import { CompanyCulture } from "@/components/sections/company-culture";
import { CompanyPeople } from "@/components/sections/company-people";

export default function CompanyPage() {
  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <CompanyHero />
      <CompanyOrigin />
      <CompanyDirection />
      <CompanyPrinciples />
      <CompanyStatus />
      <CompanyCulture />
      <CompanyPeople />
    </main>
  );
}
