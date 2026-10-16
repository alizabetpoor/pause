import { BrandMark } from "@/components/ui/brand-mark";
import { SocialLinks } from "@/components/ui/social-links";
import type { SiteNavLink } from "@/components/layout/site-navigation";

type SiteFooterProps = {
  links: SiteNavLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer
      id="contact"
      className="studio-container mt-10 border-t border-studio-line py-10 sm:mt-16 sm:py-14 xl:mt-24"
    >
      <div className="grid gap-8 text-center xl:grid-cols-[1.2fr_0.8fr_1fr] xl:text-left">
        <div className="flex flex-col items-center xl:items-start">
          <BrandMark
            width={269}
            className="h-auto w-[min(80vw,269px)] max-w-full sm:w-[min(72vw,34rem)] xl:w-[269px]"
          />
          <p className="-mt-5 ml-2 font-mono text-xs tracking-[0.2em] sm:-mt-7 sm:ml-2 xl:ml-[16.5rem]">
            STUDIO
          </p>
          <div className="mt-5 space-y-2 font-mono text-xs uppercase tracking-wide text-studio-muted sm:text-base xl:text-xs">
            <p>ARCHITECTURE STUDIO</p>
            <p>SARI, MAZANDARAN</p>
            <p>WWW.PAUSESTUDIO@YAHOO.COM</p>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col items-center gap-3 font-mono text-base uppercase sm:gap-5 sm:text-2xl xl:items-start xl:gap-3 xl:text-xs"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 xl:items-end">
          <p className="font-mono text-lg uppercase sm:text-2xl xl:text-xs">
            FOLLOW US ON :
          </p>
          <SocialLinks
            className="justify-center xl:justify-end"
            links={[
              {
                platform: "instagram",
                href: "https://www.instagram.com/pause_studioo/",
              },
            ]}
          />
          <p className="mt-5 font-mono text-xs normal-case tracking-normal text-studio-muted sm:text-sm xl:text-[0.55rem]">
            Developed by{" "}
            <a
              href="https://t.me/alizabetpoor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ali on Telegram (opens in a new tab)"
              className="text-studio-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              Ali
            </a>
          </p>
          <p className="mt-5 font-mono text-xs uppercase text-studio-muted sm:text-sm xl:text-[0.55rem]">
            PAUSE STUDIO · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
