import { BrandMark } from "@/components/studio/brand-mark";
import { SocialLinks } from "@/components/studio/social-links";

type SiteNavLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  links: SiteNavLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer
      id="contact"
      className="studio-container mt-16 border-t border-studio-line py-10 sm:mt-24 sm:py-14"
    >
      <div className="grid gap-8 text-center sm:grid-cols-[1.2fr_0.8fr_1fr] sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <BrandMark width={269} className="h-auto max-w-full" />
          <p className="-mt-5 ml-2 font-mono text-xs tracking-[0.2em] sm:ml-[16.5rem] sm:-mt-7">
            STUDIO
          </p>
          <div className="mt-5 space-y-2 font-mono text-[0.55rem] uppercase tracking-wide text-studio-muted sm:text-xs">
            <p>ARCHITECTURE STUDIO</p>
            <p>TEHRAN , MAZANDARAN</p>
            <p>WWW.PAUSESTUDIO@YAHOO.COM</p>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col items-center gap-3 font-mono text-[0.6rem] uppercase sm:items-start sm:text-xs"
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

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <p className="font-mono text-[0.6rem] uppercase sm:text-xs">
            FOLLOW US ON :
          </p>
          <SocialLinks
            className="justify-center sm:justify-end"
            links={[
              { platform: "linkedin" },
              { platform: "telegram" },
              { platform: "instagram" },
            ]}
          />
          <p className="mt-5 font-mono text-[0.55rem] uppercase text-studio-muted">
            PAUSE STUDIO · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
