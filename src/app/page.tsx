import { SiteFooter } from "@/components/studio/site-footer";
import { siteNavigation } from "@/components/studio/site-navigation";
import { AboutSection } from "@/components/studio/sections/about-section";
import { HeroSection } from "@/components/studio/sections/hero-section";
import { ProjectsSection } from "@/components/studio/sections/projects-section";
import { ServicesSection } from "@/components/studio/sections/services-section";

export default function Home() {
  return (
    <main className="overflow-hidden bg-studio-charcoal text-studio-white">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <SiteFooter links={siteNavigation} />
    </main>
  );
}
