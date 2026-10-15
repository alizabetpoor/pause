import Image from "next/image";
import type { ImageProps } from "next/image";

type ProjectCardProps = {
  title: string;
  location: string;
  year: string;
  image: ImageProps["src"];
  imageAlt: string;
  maskImage?: string;
  className?: string;
};

export function ProjectCard({
  title,
  location,
  year,
  image,
  imageAlt,
  maskImage,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={`group relative isolate aspect-[382.71/455.755] w-full overflow-hidden text-studio-white ${className ?? ""}`.trim()}
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
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
        className="-z-20 object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03] xl:opacity-60"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-3xl leading-tight sm:text-4xl xl:text-[36px]">{title}</h3>
        <Image
          src="/assets/figma/imgVector10.svg"
          alt=""
          width={41}
          height={2}
          className="mt-2 block h-auto max-w-full"
        />
        <div className="mt-1 flex items-center gap-2 font-display text-sm uppercase tracking-wide text-white/80 sm:text-base xl:text-[20px]">
          <span>{location}</span>
          <span aria-hidden="true">·</span>
          <span className="xl:text-[17px]">{year}</span>
        </div>
      </div>
    </article>
  );
}
