"use client";

import Image from "next/image";
import { heroSlides } from "@/features/home/data/hero-slides";
import { HeroControls } from "@/features/home/sections/hero/hero-controls";
import { HeroProjectInfo } from "@/features/home/sections/hero/hero-project-info";
import { useHeroSlider } from "@/features/home/sections/hero/use-hero-slider";

export function HeroSlider() {
  const slider = useHeroSlider(heroSlides.length);
  const slide = heroSlides[slider.activeIndex] ?? heroSlides[0];

  return (
    <div
      role="group"
      aria-label={`Featured project, slide ${slider.activeIndex + 1} of ${heroSlides.length}`}
      aria-roledescription="carousel"
      data-active-slide={slider.activeIndex}
      onPointerDown={slider.onPointerDown}
      onPointerUp={slider.onPointerUp}
      onPointerCancel={slider.onPointerCancel}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={slider.onKeyDown}
      className="absolute inset-0 z-0 touch-pan-y select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: "url('/assets/figma/img61.svg')",
          WebkitMaskImage: "url('/assets/figma/img61.svg')",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {heroSlides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt=""
            fill
            draggable={false}
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-[68%_center] transition-opacity duration-700 ease-in-out sm:object-center ${
              index === slider.activeIndex ? "opacity-40" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(217,217,217,0.2)] via-transparent to-[rgba(60,60,60,0.25)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45%] backdrop-blur-[10px] sm:h-[52%] xl:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(60,60,60,0.38), rgba(60,60,60,0.08) 72%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, black 24%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 24%)",
        }}
      />

      <HeroProjectInfo slide={slide} />
      <HeroControls
        slides={heroSlides}
        activeIndex={slider.activeIndex}
        onSelect={slider.selectSlide}
        onPrevious={slider.previous}
        onNext={slider.next}
      />
    </div>
  );
}
