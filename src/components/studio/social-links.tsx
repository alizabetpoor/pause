import Image from "next/image";

export type SocialPlatform = "instagram" | "telegram" | "linkedin";

export type SocialLinkItem = {
  platform: SocialPlatform;
  href?: string;
};

const socialAssets: Record<SocialPlatform, { src: string; label: string }> = {
  instagram: { src: "/assets/social-instagram.png", label: "Instagram" },
  telegram: { src: "/assets/social-telegram.png", label: "Telegram" },
  linkedin: { src: "/assets/social-linkedin.png", label: "LinkedIn" },
};

type SocialLinksProps = {
  links: SocialLinkItem[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ""}`.trim()}>
      {links.map(({ platform, href }) => {
        const asset = socialAssets[platform];

        return (
          <li key={platform}>
            {href ? (
              <a
                href={href}
                aria-label={asset.label}
                className="inline-flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                <Image
                  src={asset.src}
                  alt=""
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </a>
            ) : (
              <span
                aria-label={asset.label}
                role="img"
                className="inline-flex size-10 items-center justify-center"
              >
              <Image
                src={asset.src}
                alt=""
                width={40}
                height={40}
                className="size-full object-contain"
              />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
