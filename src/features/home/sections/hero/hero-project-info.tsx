import Image from "next/image";
import type { HeroSlide } from "@/features/home/data/hero-slides";

type HeroProjectInfoProps = {
  slide: HeroSlide;
};

export function HeroProjectInfo({ slide }: HeroProjectInfoProps) {
  return (
    <div className="studio-container absolute inset-x-0 bottom-[3%] z-10 flex flex-col items-start pl-6 sm:bottom-[7%] sm:pl-4 xl:pl-0">
      <h1 className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/85 sm:text-xs">
        PAUSE ARCHITECTURE STUDIO · SARI, MAZANDARAN
      </h1>
      <h2 className="font-display text-4xl leading-none text-white sm:text-5xl xl:text-[4rem]">
        {slide.title}
      </h2>
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
  );
}
