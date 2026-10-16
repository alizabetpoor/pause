"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExplorationStudy } from "@/features/home/data/exploration-studies";

type ExplorationCarouselProps = {
  studies: ExplorationStudy[];
};

export function ExplorationCarousel({ studies }: ExplorationCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    let nextIndex = 0;
    let distance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideDistance = Math.abs(rect.left + rect.width / 2 - center);
      if (slideDistance < distance) {
        nextIndex = index;
        distance = slideDistance;
      }
    });

    setActiveIndex(nextIndex);
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  const previous = () =>
    goToSlide((activeIndex - 1 + studies.length) % studies.length);
  const next = () => goToSlide((activeIndex + 1) % studies.length);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/70">
      <div
        ref={trackRef}
        aria-label="Design exploration studies"
        aria-roledescription="carousel"
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {studies.map((study, index) => (
          <article
            key={study.image}
            aria-label={`${index + 1} of ${studies.length}`}
            aria-roledescription="slide"
            className="relative aspect-[3/4] w-full shrink-0 snap-center sm:aspect-square"
          >
            <Image
              src={`/assets/figma/${study.image}`}
              alt={study.alt}
              fill
              sizes="(max-width: 639px) 72vw, (max-width: 1023px) 74vw, 410px"
              className="object-cover opacity-85"
            />
            <h3 className="absolute inset-x-3 top-4 text-center font-display text-2xl text-white sm:top-6 sm:text-4xl">
              . Conference Hall
            </h3>
          </article>
        ))}
      </div>

      <div
        role="group"
        aria-label="Choose an exploration study"
        className="absolute inset-x-0 bottom-1 z-10 flex items-center justify-center gap-1 sm:bottom-2 sm:gap-2"
      >
        <button
          type="button"
          aria-label="Previous study"
          onClick={previous}
          className="flex size-10 items-center justify-center rounded-full text-3xl leading-none text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white sm:size-12 sm:text-4xl"
        >
          ‹
        </button>
        {studies.map((study, index) => (
          <button
            key={study.image}
            type="button"
            aria-label={`Show study ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => goToSlide(index)}
            className="flex size-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white sm:size-8"
          >
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full bg-white transition-opacity sm:size-3 ${index === activeIndex ? "opacity-100" : "opacity-50"}`}
            />
          </button>
        ))}
        <button
          type="button"
          aria-label="Next study"
          onClick={next}
          className="flex size-10 items-center justify-center rounded-full text-3xl leading-none text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white sm:size-12 sm:text-4xl"
        >
          ›
        </button>
      </div>
    </div>
  );
}
