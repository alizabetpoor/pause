type SectionIntroProps = {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionIntro({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  return (
    <header className={`mx-auto max-w-4xl text-center ${className ?? ""}`.trim()}>
      <h2 className={`font-display text-2xl leading-tight text-studio-white sm:text-4xl xl:text-[48px] ${titleClassName ?? ""}`.trim()}>
        {title}
      </h2>
      {description ? (
        <p className={`mx-auto mt-3 max-w-3xl font-display text-sm leading-relaxed text-studio-muted sm:mt-4 sm:text-base xl:text-lg ${descriptionClassName ?? ""}`.trim()}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
