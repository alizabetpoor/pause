import { SiteFooter } from "@/components/layout/site-footer";
import { siteNavigation } from "@/components/layout/site-navigation";
import { AboutSection } from "@/features/home/sections/about/about-section";
import { HeroSection } from "@/features/home/sections/hero/hero-section";
import { ProjectsSection } from "@/features/home/sections/projects/projects-section";
import { ServicesSection } from "@/features/home/sections/services/services-section";
import { getStudioStructuredData } from "@/lib/seo/structured-data";

export function HomePage() {
  const structuredData = getStudioStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main className="overflow-hidden bg-studio-charcoal text-studio-white">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      <SiteFooter links={siteNavigation} />
    </>
  );
}
