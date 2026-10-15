import Image from "next/image";
import type { ImageProps } from "next/image";

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  image: ImageProps["src"];
  imageAlt: string;
  phase?: string;
  className?: string;
};

export function ServiceCard({
  number,
  title,
  description,
  image,
  imageAlt,
  phase,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={`group relative isolate flex min-h-60 flex-col justify-between overflow-hidden rounded-xl border border-studio-line p-4 text-studio-white sm:p-5 ${className ?? ""}`.trim()}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 25vw"
        className="-z-20 object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/15 to-black/45"
      />
      <div>
        <p className="font-display text-2xl leading-none sm:text-3xl">{number}</p>
        <h3 className="mt-2 max-w-[14ch] font-display text-xl leading-tight sm:text-2xl">
          {title}
        </h3>
        {phase ? (
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wide text-studio-muted">
            {phase}
          </p>
        ) : null}
      </div>
      <p className="mt-8 max-w-[36ch] font-display text-sm leading-relaxed sm:text-base">
        {description}
      </p>
    </article>
  );
}
