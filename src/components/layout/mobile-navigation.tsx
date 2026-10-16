"use client";

import { useRef, useState } from "react";
import type { SiteNavLink } from "@/components/layout/site-navigation";

type MobileNavigationProps = {
  links: SiteNavLink[];
};

export function MobileNavigation({ links }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-site-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-11 flex-col items-end justify-center gap-[5px] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span
          className={`h-px w-7 bg-white transition-transform ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`h-px w-7 bg-white transition-transform ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
        />
      </button>
      <nav
        id="mobile-site-navigation"
        aria-label="Mobile navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            buttonRef.current?.focus();
          }
        }}
        className={`${isOpen ? "flex" : "hidden"} absolute top-12 right-0 z-40 min-w-48 flex-col gap-1 rounded-lg border border-studio-line bg-studio-charcoal/95 p-2 shadow-lg backdrop-blur-md`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="rounded px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
