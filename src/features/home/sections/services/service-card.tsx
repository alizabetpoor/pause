import Image from "next/image";
import type { ImageProps } from "next/image";
import type { Service } from "@/features/home/data/services";

type ServiceCardProps = Omit<Service, "image"> & {
  image: ImageProps["src"];
  maskImage?: string;
  className?: string;
};

export function ServiceCard({
  number,
  title,
  description,
  image,
  imageAlt,
  maskImage,
  phase,
  className,
}: ServiceCardProps) {
  return (
    <article className={`min-w-0 text-studio-white ${className ?? ""}`.trim()}>
      <header className="hidden min-h-[4.75rem] xl:block xl:min-h-[6.25rem]">
        <p className="font-display text-lg leading-none xl:text-[36px]">{number}</p>
        <h3 className="mt-1 max-w-[14ch] font-display text-[clamp(0.75rem,1.7vw,1.5rem)] leading-tight xl:text-[24px]">
          {title}
        </h3>
        {phase ? (
          <p className="mt-1 font-display text-[0.65rem] leading-tight text-studio-white xl:text-[24px]">
            {phase}
          </p>
        ) : null}
      </header>
      <div
        className="group relative mt-2 aspect-square overflow-hidden rounded-[22px] xl:aspect-[304/281] xl:rounded-none"
        style={
          maskImage
            ? {
                maskImage: `url('${maskImage}')`,
                WebkitMaskImage: `url('${maskImage}')`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }
            : undefined
        }
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 42vw, 304px"
          className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 xl:opacity-60"
        />
        <header className="absolute inset-x-3 top-3 z-10 font-display text-studio-white sm:inset-x-5 sm:top-4 xl:hidden">
          <p className="text-[clamp(1rem,5vw,2.5rem)] leading-none">{number}</p>
          <h3 className="mt-1 max-w-[14ch] text-[clamp(0.75rem,3.15vw,1.5rem)] leading-tight">
            {title}
          </h3>
          {phase ? (
            <p className="mt-0.5 text-[clamp(0.65rem,2.7vw,1.125rem)] leading-tight">
              {phase}
            </p>
          ) : null}
        </header>
        <p className="absolute inset-x-3 bottom-3 z-10 font-display text-[clamp(0.55rem,2.15vw,1.125rem)] leading-[1.18] sm:inset-x-5 sm:bottom-5 xl:top-5 xl:bottom-auto xl:text-[clamp(0.55rem,1.5vw,1.375rem)]">
          {description}
        </p>
      </div>
    </article>
  );
}
