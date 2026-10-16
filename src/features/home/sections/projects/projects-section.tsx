import { ProjectCarousel } from "@/features/home/sections/projects/project-carousel";
import { TextLink } from "@/components/ui/text-link";
import { projectCategories, projects } from "@/features/home/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-intro"
      className="studio-container mt-10 sm:mt-20 xl:mt-28"
    >
      <h2
        id="projects-intro"
        className="mx-auto max-w-5xl text-center font-display text-xs leading-relaxed text-studio-white sm:text-xl xl:text-2xl"
      >
        From the first sketch to the final image, every stage is part of one
        integrated design process.
      </h2>

      <div className="mt-6 flex items-center justify-between gap-5 overflow-x-auto border-b border-studio-line pb-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] sm:mt-12 sm:gap-8 sm:text-xs xl:mt-16 xl:text-sm">
        <div className="flex shrink-0 items-center gap-5 sm:gap-8">
          {projectCategories.map((category) => (
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
