import Image from "next/image";
import type { ImageProps } from "next/image";

type ProjectCardProps = {
  title: string;
  location: string;
  year: string;
  image: ImageProps["src"];
  imageAlt: string;
  className?: string;
};

export function ProjectCard({
  title,
  location,
  year,
  image,
  imageAlt,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={`group relative isolate aspect-[4/5] overflow-hidden rounded-xl text-studio-white ${className ?? ""}`.trim()}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
        className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/10"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h3>
        <div className="mt-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wide text-white/80 sm:text-xs">
          <span>{location}</span>
          <span aria-hidden="true">·</span>
          <span>{year}</span>
        </div>
      </div>
    </article>
  );
}
