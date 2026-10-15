import { ProjectCarousel } from "@/components/studio/project-carousel";
import { TextLink } from "@/components/studio/text-link";

const projects = [
  {
    title: "LAKAJA CAFE",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img44.png",
    imageAlt: "Lakaja Cafe exterior and landscape",
  },
  {
    title: "NOOR GOLD GALLERY",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img48.png",
    imageAlt: "Noor Gold Gallery interior",
  },
  {
    title: "RG GOLD GALLERY",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img42.png",
    imageAlt: "RG Gold Gallery interior",
  },
  {
    title: "TOBACCO SHOP",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img45.png",
    imageAlt: "Tobacco shop interior",
  },
  {
    title: "CONFERENCE HALL",
    location: "SARI",
    year: "2026",
    image: "/assets/figma/img46.png",
    imageAlt: "Conference hall interior",
  },
  {
    title: "SHOWROOM",
    location: "SARI",
    year: "2025",
    image: "/assets/figma/img43.png",
    imageAlt: "Showroom interior",
  },
];

const categories = ["RESIDENTIAL", "VILLAS", "COMMERCIAL", "INTERIOR"];

export function ProjectsSection() {
  return (
    <section id="projects" className="studio-container mt-10 sm:mt-20 xl:mt-28">
      <p className="mx-auto max-w-5xl text-center font-display text-xs leading-relaxed text-studio-white sm:text-xl xl:text-2xl">
        From the first sketch to the final image, every stage is part of one
        integrated design process.
      </p>

      <div className="mt-6 flex items-center justify-between gap-5 overflow-x-auto border-b border-studio-line pb-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] sm:mt-12 sm:gap-8 sm:text-xs xl:mt-16 xl:text-sm">
        <div className="flex shrink-0 items-center gap-5 sm:gap-8">
          {categories.map((category) => (
            <span key={category} className="whitespace-nowrap">
              {category}
            </span>
          ))}
        </div>
        <TextLink
          href="#projects"
          className="shrink-0 text-[0.6rem] sm:text-xs"
        >
          VIEW ALL PROJECT
        </TextLink>
      </div>

      <ProjectCarousel projects={projects} maskImage="/assets/figma/img41.svg" />
    </section>
  );
}
