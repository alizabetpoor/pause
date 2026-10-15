type SectionIntroProps = {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionIntro({
  title,
  description,
  className,
  titleClassName,
}: SectionIntroProps) {
  return (
    <header className={`mx-auto max-w-4xl text-center ${className ?? ""}`.trim()}>
      <h2 className={`font-display text-4xl leading-tight text-studio-white sm:text-5xl lg:text-[48px] ${titleClassName ?? ""}`.trim()}>
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-3xl font-display text-sm leading-relaxed text-studio-muted sm:text-base lg:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
