import { SiteHeader } from "@/components/layout/site-header";
import { siteNavigation } from "@/components/layout/site-navigation";
import { HeroSlider } from "@/features/home/sections/hero/hero-slider";

export function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Featured architecture projects"
      className="relative isolate h-svh w-full overflow-hidden rounded-b-[26px]"
    >
      <HeroSlider />
      <SiteHeader links={siteNavigation} />
    </section>
  );
}
