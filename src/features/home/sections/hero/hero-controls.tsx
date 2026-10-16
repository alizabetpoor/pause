import type { HeroSlide } from "@/features/home/data/hero-slides";

type HeroControlsProps = {
  slides: HeroSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function HeroControls({
  slides,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
}: HeroControlsProps) {
  return (
    <div className="absolute right-[6.75%] bottom-6 z-30 flex items-center gap-2">
      <button
        type="button"
        aria-label="Previous featured project"
        onClick={onPrevious}
        className="flex size-8 items-center justify-center rounded-full text-2xl leading-none text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden="true">&larr;</span>
      </button>
      <div
        role="group"
        aria-label="Choose featured project"
        className="flex items-center gap-2"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => onSelect(index)}
            className="flex h-8 w-[22px] cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`size-[11px] rounded-full bg-white transition-opacity ${
                index === activeIndex ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label="Next featured project"
        onClick={onNext}
        className="flex size-8 items-center justify-center rounded-full text-2xl leading-none text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
