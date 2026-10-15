"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/studio/site-header";
import { siteNavigation } from "@/components/studio/site-navigation";
const heroSlides = [
  {
    title: "LAKAJA CAFE",
    location: "SARI",
    image: "/assets/figma/img62.png",
    alt: "Lakaja Cafe at dusk",
  },
  {
    title: "NOOR GOLD GALLERY",
    location: "SARI",
    image: "/assets/figma/img48.png",
    alt: "Noor Gold Gallery interior",
  },
  {
    title: "RG GOLD GALLERY",
    location: "SARI",
    image: "/assets/figma/img42.png",
    alt: "RG Gold Gallery interior",
  },
  {
    title: "TOBACCO SHOP",
    location: "SARI",
    image: "/assets/figma/img45.png",
    alt: "Tobacco shop interior",
  },
  {
    title: "SHOWROOM",
    location: "SARI",
    image: "/assets/figma/img43.png",
    alt: "Showroom interior",
  },
];

const SLIDE_INTERVAL = 5000;

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  // Use a ref so the interval callback never reads a stale value,
  // even if React batches or defers the update.
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (indexRef.current + 1) % heroSlides.length;
      indexRef.current = next;
      setActiveSlide(next);
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  const slide = heroSlides[activeSlide] ?? heroSlides[0];

  return (
    <section
      id="home"
      aria-label={`Featured projects, slide ${activeSlide + 1} of ${heroSlides.length}`}
      aria-roledescription="carousel"
      data-active-slide={activeSlide}
      className="relative isolate h-svh w-full overflow-hidden rounded-b-[26px]"
    >
      {/* All slides stay mounted; only opacity changes. No remounting, so no
          chance of the old frame getting stuck while the new one loads. */}
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
        {heroSlides.map((item, i) => (
          <Image
            key={item.image}
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            onError={() =>
              console.error("[Hero] image failed to load:", item.image)
            }
            className={`object-cover object-[68%_center] transition-opacity duration-700 ease-in-out sm:object-center ${
              i === activeSlide ? "opacity-40" : "opacity-0"
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

      <SiteHeader links={siteNavigation} />

      <div className="studio-container absolute inset-x-0 bottom-[3%] z-10 flex flex-col items-start pl-6 sm:bottom-[7%] sm:pl-4 xl:pl-0">
        <h1 className="font-display text-4xl leading-none text-white sm:text-5xl xl:text-[4rem]">
          {slide.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 sm:mt-5">
          <Image
            src="/assets/figma/imgGroup1.svg"
            alt=""
            width={15}
            height={27}
            className="h-[1.35rem] w-auto"
          />
          <span className="font-display text-xl leading-none sm:text-2xl">
            {slide.location}
          </span>
        </div>
        <div className="mt-4 flex h-10 items-center gap-3 rounded-full border border-white/80 bg-white/10 px-3.5 backdrop-blur-sm sm:mt-5 sm:h-[3.7rem] sm:px-5 min-[1440px]:w-[217px] min-[1440px]:justify-center min-[1440px]:border-[0.5px] min-[1440px]:border-white min-[1440px]:bg-[rgba(207,207,207,0.3)]">
          <Image
            src="/assets/figma/imgGroup.svg"
            alt=""
            width={29}
            height={34}
            className="h-6 w-auto sm:h-7 min-[1440px]:h-8"
          />
          <span className="font-space text-xs uppercase sm:text-base">
            READ MORE
          </span>
        </div>
      </div>

      <div
        role="group"
        aria-label="Choose featured project"
        className="absolute right-[6.75%] bottom-6 z-30 flex items-center gap-2"
      >
        {heroSlides.map((item, i) => {
          const isActive = i === activeSlide;
          return (
            <button
              key={item.image}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-pressed={isActive}
              onClick={() => {
                indexRef.current = i;
                setActiveSlide(i);
              }}
              className="flex h-8 w-[22px] cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                aria-hidden="true"
                className={`size-[11px] rounded-full bg-white transition-opacity ${
                  isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
