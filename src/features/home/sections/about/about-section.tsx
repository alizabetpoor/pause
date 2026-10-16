import Image from "next/image";
import { ExplorationCarousel } from "@/features/home/sections/about/exploration-carousel";
import { SectionIntro } from "@/components/ui/section-intro";
import { TextLink } from "@/components/ui/text-link";
import {
  desktopStudyPositions,
  explorationStudies,
} from "@/features/home/data/exploration-studies";
import { studioProfile } from "@/lib/seo/studio-config";

function VerticalTitle({ className }: { className: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <span className="flex flex-col">
        {"DESIGN".split("").map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
      <span className="flex flex-col">
        {"EXPLORATION".split("").map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
    </div>
  );
}

function ExplorationDescription() {
  return (
    <>
      A collection of independent studies, design experiments, and architectural
      explorations beyond commissioned work.
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="studio-container mt-8 sm:mt-12 xl:mt-28">
      <Image
        src="/assets/figma/imgVector8.svg"
        alt=""
        width={1246}
        height={1}
        className="hidden h-auto max-w-full xl:block"
      />
      <SectionIntro
        title="PAUSE STUDIO"
        description="We design contemporary spaces through simplicity, context, and thoughtful detail."
        titleClassName="text-[2rem] sm:text-[2.5rem] xl:text-[4rem]"
        descriptionClassName="text-sm sm:text-xl xl:text-lg"
        className="mt-0 xl:mt-20"
      />
      <p
        lang="fa"
        dir="rtl"
        className="persian-copy mx-auto mt-3 max-w-4xl text-center text-sm leading-7 text-studio-muted sm:text-base"
      >
        {studioProfile.descriptionFa}
      </p>

      <div
        aria-hidden="true"
        className="mt-8 border-t border-studio-line xl:hidden"
      />

      <div className="relative mt-5 overflow-visible sm:mt-6 xl:mt-24 xl:min-h-[1400px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-12 hidden h-[1376px] rounded-[30px] border border-white bg-[rgba(217,217,217,0.1)] xl:block"
        />

        <div className="relative min-h-[28rem] sm:min-h-[35rem] xl:hidden">
          <VerticalTitle className="absolute top-[6.25rem] left-0 flex gap-1 font-display text-[2.5rem] leading-[0.9] text-white sm:top-24 sm:gap-4 sm:text-[3.25rem]" />
          <p className="relative ml-9 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-studio-white sm:ml-[8.75rem] sm:text-lg">
            <ExplorationDescription />
          </p>
          <div className="ml-[4.5rem] mt-10 w-[calc(100%-5.5rem)] sm:ml-[8.75rem] sm:mt-8 sm:w-[calc(100%-8.75rem)]">
            <ExplorationCarousel studies={explorationStudies} />
          </div>
        </div>

        <div className="relative hidden xl:block">
          <VerticalTitle className="absolute left-0 top-0 flex h-[1048px] gap-8 font-display text-[6rem] leading-[90px] text-white" />
          <div className="absolute left-[34.2%] top-0 h-[1376px] w-[850px]">
            {explorationStudies.map((study, index) => (
              <article
                key={study.image}
                className={`absolute h-[609px] w-[410px] overflow-hidden rounded-[30px] border border-white/60 ${desktopStudyPositions[index]}`}
              >
                <Image
                  src={`/assets/figma/${study.image}`}
                  alt={study.alt}
                  fill
                  sizes="410px"
                  className="object-cover opacity-80"
                />
                {index % 2 === 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-studio-charcoal/30"
                  />
                ) : null}
                <h3 className="absolute left-5 top-5 font-display text-[2rem] text-white">
                  . Conference Hall
                </h3>
              </article>
            ))}
          </div>
          <p className="absolute left-[3.5%] top-[1080px] max-w-[55rem] font-display text-sm leading-relaxed text-studio-white">
            <ExplorationDescription />
          </p>
        </div>
      </div>

      <div className="mt-2 flex justify-end border-b border-studio-line pb-3 xl:mt-0 xl:pb-6">
        <TextLink href="#projects">VIEW ALL PROJECT</TextLink>
      </div>
      <p className="mx-auto mt-6 max-w-5xl text-center font-display text-xs leading-relaxed sm:mt-10 sm:text-xl xl:mt-16 xl:text-2xl">
        PAUSE STUDIO is an architecture and design studio focused on creating
        thoughtful, contemporary spaces shaped by context, function, and detail.
      </p>
    </section>
  );
}
