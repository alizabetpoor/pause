"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/studio/project-card";

export type Project = {
  title: string;
  location: string;
  year: string;
  image: string;
  imageAlt: string;
};

type ProjectCarouselProps = {
  projects: Project[];
  maskImage: string;
};

export function ProjectCarousel({ projects, maskImage }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    const slides = Array.from(track.children);
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - trackCenter);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <div className="mt-6 border-b border-studio-line pb-3 xl:border-0 xl:pb-0">
      <div
        ref={trackRef}
        aria-label="Featured projects"
        aria-roledescription="carousel"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 xl:grid xl:grid-cols-[repeat(3,minmax(0,382.71px))] xl:justify-between xl:gap-x-6 xl:gap-y-[42px] xl:overflow-visible xl:pb-0"
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
            className="w-[calc(100%-0.5rem)] shrink-0 snap-center sm:w-full xl:contents"
          >
            <ProjectCard {...project} maskImage={maskImage} />
          </div>
        ))}
      </div>

      <div
        role="group"
        aria-label="Choose a project"
        className="mt-2 flex items-center justify-center gap-1.5 xl:hidden"
      >
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Show ${project.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => goToSlide(index)}
            className="flex size-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full bg-white transition-opacity sm:size-4 ${index === activeIndex ? "opacity-100" : "opacity-45"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
