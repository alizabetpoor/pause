import Image from "next/image";
import type { ImageProps } from "next/image";

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  image: ImageProps["src"];
  imageAlt: string;
  maskImage?: string;
  phase?: string;
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
      <header className="min-h-[4.75rem] sm:min-h-[6.25rem]">
        <p className="font-display text-lg leading-none sm:text-3xl lg:text-[36px]">{number}</p>
        <h3 className="mt-1 max-w-[14ch] font-display text-[clamp(0.75rem,1.7vw,1.5rem)] leading-tight lg:text-[24px]">
          {title}
        </h3>
        {phase ? (
          <p className="mt-1 font-display text-[0.65rem] leading-tight text-studio-white sm:text-sm lg:text-[24px]">
            {phase}
          </p>
        ) : null}
      </header>
      <div
        className="group relative mt-2 aspect-[304/281] overflow-hidden"
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
          className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
        />
        <p className="absolute inset-x-3 top-3 font-display text-[clamp(0.55rem,1.5vw,1.375rem)] leading-[1.18] sm:inset-x-5 sm:top-5">
          {description}
        </p>
      </div>
    </article>
  );
}
