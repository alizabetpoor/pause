import { SectionIntro } from "@/components/ui/section-intro";
import { ServiceCard } from "@/features/home/sections/services/service-card";
import { services } from "@/features/home/data/services";
import { studioProfile } from "@/lib/seo/studio-config";

export function ServicesSection() {
  return (
    <section id="services" className="studio-container pt-12 sm:pt-20">
      <SectionIntro
        title="What We Do"
        description="We bring together architecture, technical design, visualization and visual communication to shape projects from the first idea to the final experience."
        descriptionClassName="text-[0.7rem] sm:text-base"
      />
      <p
        lang="fa"
        dir="rtl"
        className="persian-copy mx-auto mt-3 max-w-4xl text-center text-sm leading-7 text-studio-muted sm:text-base"
      >
        {studioProfile.servicesSummaryFa}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-2 sm:mt-10 sm:gap-x-3 sm:gap-y-4 xl:mt-16 xl:grid-cols-[repeat(3,minmax(0,304px))] xl:justify-between xl:gap-y-[3.25rem]">
        {services.map((service) => (
          <ServiceCard
            key={service.number}
            {...service}
            className={
              service.number === "05"
                ? "order-6 xl:order-5"
                : service.number === "06"
                  ? "order-5 xl:order-6"
                  : undefined
            }
            maskImage="/assets/figma/img11.svg"
          />
        ))}
      </div>
    </section>
  );
}
