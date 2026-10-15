"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/studio/site-header";
import { siteNavigation } from "@/components/studio/site-navigation";

const heroSlides = [
  {
    title: "LAKAJA CAFE",
    location: "SARI",
    image: "/assets/figma/img62.png",
    alt: "Lakaja Cafe at dusk, surrounded by its landscaped outdoor seating",
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

const slideInterval = 5000;

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, slideInterval);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      aria-label={`Featured projects, slide ${activeSlide + 1} of ${heroSlides.length}`}
      aria-roledescription="carousel"
      className="relative isolate h-svh min-h-[43rem] max-h-[64rem] overflow-hidden rounded-b-[26px] min-[1440px]:h-[64rem] min-[1440px]:max-h-none"
    >
      {heroSlides.map((item, index) => (
        <div
          key={item.image}
          aria-hidden="true"
          className={`absolute inset-0 -z-20 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
          style={{
            maskImage: "url('/assets/figma/img61.svg')",
            WebkitMaskImage: "url('/assets/figma/img61.svg')",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
        </div>
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(217,217,217,0.2)] via-transparent to-[rgba(60,60,60,0.25)]"
      />

      <SiteHeader links={siteNavigation} />

      <div className="studio-container absolute inset-x-0 bottom-[3%] z-10 flex flex-col items-start sm:bottom-[7%]">
        <h1 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
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
        className="absolute bottom-6 right-[6.75%] z-10 flex items-center gap-2"
      >
        {heroSlides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-pressed={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className="flex h-8 w-[22px] items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={`size-[11px] rounded-full bg-white transition-opacity ${index === activeSlide ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
