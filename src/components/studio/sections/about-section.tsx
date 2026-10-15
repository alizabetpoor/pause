import Image from "next/image";
import { SectionIntro } from "@/components/studio/section-intro";
import { TextLink } from "@/components/studio/text-link";

const explorationStudies = [
  { image: "imgRectangle16.png", alt: "Conference hall spatial study" },
  { image: "imgRectangle14.png", alt: "Conference hall material study" },
  { image: "imgRectangle13.png", alt: "Cafe interior sketch study" },
  { image: "imgRectangle15.png", alt: "Conference hall lighting study" },
];

const desktopPositions = [
  "left-0 top-0",
  "left-[440px] top-[240px]",
  "left-0 top-[638px]",
  "left-[440px] top-[767px]",
];

function VerticalTitle({ className }: { className: string }) {
  return (
    <div aria-label="Design Exploration" className={className}>
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
      A collection of independent studies, design experiments, and
      architectural explorations beyond commissioned work.
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="studio-container mt-20 sm:mt-28">
      <Image
        src="/assets/figma/imgVector8.svg"
        alt=""
        width={1246}
        height={1}
        className="block h-auto max-w-full"
      />
      <SectionIntro
        title="PAUSE STUDIO"
        description="We design contemporary spaces through simplicity, context, and thoughtful detail."
        titleClassName="lg:text-[4rem]"
        className="mt-16 sm:mt-20"
      />

      <div className="relative mt-16 min-h-[34rem] overflow-visible sm:mt-24 lg:min-h-[1400px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-12 hidden h-[1376px] rounded-[30px] border border-white bg-[rgba(217,217,217,0.1)] lg:block"
        />

        <div className="relative z-10 grid min-h-[32rem] grid-cols-[3.5rem_1fr] gap-x-3 sm:grid-cols-[5rem_1fr] sm:gap-x-5 lg:hidden">
          <VerticalTitle className="flex gap-1.5 self-start pt-3 font-display text-base leading-[0.95] sm:gap-3 sm:text-xl" />
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-5">
            {explorationStudies.map((study) => (
              <article
                key={study.image}
                className="relative h-[25rem] w-[min(72vw,20rem)] shrink-0 snap-center overflow-hidden rounded-[24px] border border-white/40"
              >
                <Image
                  src={`/assets/figma/${study.image}`}
                  alt={study.alt}
                  fill
                  sizes="72vw"
                  className="object-cover opacity-70"
                />
                <h3 className="absolute left-4 top-4 font-display text-2xl text-white">
                  . Conference Hall
                </h3>
              </article>
            ))}
          </div>
          <p className="col-span-2 mt-5 max-w-2xl font-display text-xs leading-relaxed text-studio-white sm:text-sm">
            <ExplorationDescription />
          </p>
        </div>

        <div className="relative hidden lg:block">
          <VerticalTitle className="absolute left-0 top-0 flex h-[1048px] gap-8 font-display text-[6rem] leading-[90px] text-white" />
          <div className="absolute left-[34.2%] top-0 h-[1376px] w-[850px]">
            {explorationStudies.map((study, index) => (
              <article
                key={study.image}
                className={`absolute h-[609px] w-[410px] overflow-hidden rounded-[30px] border border-white/60 ${desktopPositions[index]}`}
              >
                <Image
                  src={`/assets/figma/${study.image}`}
                  alt={study.alt}
                  fill
                  sizes="410px"
                  className="object-cover opacity-80"
                />
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

      <div className="mt-10 flex justify-end border-b border-studio-line pb-6 lg:mt-0">
        <TextLink href="#projects">VIEW ALL PROJECT</TextLink>
      </div>
      <p className="mx-auto mt-12 max-w-5xl text-center font-display text-lg leading-relaxed sm:mt-16 sm:text-2xl">
        PAUSE STUDIO is an architecture and design studio focused on creating
        thoughtful, contemporary spaces shaped by context, function, and detail.
      </p>
    </section>
  );
}
