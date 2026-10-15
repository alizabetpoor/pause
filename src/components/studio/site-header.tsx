import Image from "next/image";
import { BrandMark } from "@/components/studio/brand-mark";

type SiteNavLink = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  links: SiteNavLink[];
};

export function SiteHeader({ links }: SiteHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="studio-container flex h-20 items-start justify-between pt-6 sm:h-24 sm:pt-10">
        <a
          href="#home"
          aria-label="Pause Studio home"
          className="relative flex shrink-0 items-start gap-1 text-white"
        >
          <BrandMark width={160} className="h-auto w-40" />
          <span className="absolute top-[2.65rem] left-2 font-mono text-[0.6rem] tracking-[0.12em] sm:static sm:mt-[1.1rem] sm:text-sm">
            STUDIO
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 pt-2 font-mono text-[0.6rem] uppercase sm:flex lg:gap-7 lg:text-xs"
        >
          {links.map((link, index) => (
            <span key={link.label} className="flex items-center gap-4 lg:gap-7">
              {index > 0 ? (
                <Image
                  src="/assets/figma/imgVector2.svg"
                  alt=""
                  width={1}
                  height={17}
                  className="h-[17px] w-px"
                />
              ) : null}
              <a href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <Image
          src="/assets/figma/imgGroup11.svg"
          alt=""
          width={97}
          height={24}
          className="hidden h-6 w-[97px] sm:block"
        />
        <span
          aria-hidden="true"
          className="flex size-11 flex-col items-end justify-center gap-[5px] sm:hidden"
        >
          <span className="h-px w-7 bg-white" />
          <span className="h-px w-5 bg-white" />
          <span className="h-px w-7 bg-white" />
        </span>
      </div>
    </header>
  );
}
