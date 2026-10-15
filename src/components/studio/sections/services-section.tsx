import { SectionIntro } from "@/components/studio/section-intro";
import { ServiceCard } from "@/components/studio/service-card";

const services = [
  {
    number: "01",
    title: "Architectural Design",
    phase: "Phase 01",
    description:
      "From concept development to spatial planning, we shape clear architectural ideas based on context, function and experience.",
    image: "/assets/figma/img12.png",
    imageAlt: "Architectural floor plan study",
  },
  {
    number: "02",
    title: "Technical Design",
    phase: "Phase 02",
    description:
      "We develop projects into precise construction drawings, technical details and coordinated documentation for execution.",
    image: "/assets/figma/img21.png",
    imageAlt: "Technical architectural drawing",
  },
  {
    number: "03",
    title: "Interior Design",
    description:
      "We design interior spaces through a balanced approach to material, light, function and atmosphere.",
    image: "/assets/figma/img1.png",
    imageAlt: "Interior design study",
  },
  {
    number: "04",
    title: "3D Visualization",
    description:
      "We create architectural visualizations that communicate form, material, light and spatial quality before construction.",
    image: "/assets/figma/img47.png",
    imageAlt: "Architectural visualization study",
  },
  {
    number: "05",
    title: "Architectural Graphics",
    description:
      "We develop projects into precise construction drawings, technical details and coordinated documentation for execution.",
    image: "/assets/figma/img51.png",
    imageAlt: "Architectural graphic study",
  },
  {
    number: "06",
    title: "Landscape Design",
    description:
      "We design outdoor spaces as an extension of architecture, creating a strong relationship between building, landscape and context.",
    image: "/assets/figma/img2.png",
    imageAlt: "Landscape design study",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="studio-container pt-14 sm:pt-20">
      <SectionIntro
        title="What We Do"
        description="We bring together architecture, technical design, visualization and visual communication to shape projects from the first idea to the final experience."
      />
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[repeat(3,minmax(0,304px))] lg:justify-between lg:gap-y-[3.25rem]">
        {services.map((service) => (
          <ServiceCard
            key={service.number}
            {...service}
            maskImage="/assets/figma/img11.svg"
          />
        ))}
      </div>
    </section>
  );
}
