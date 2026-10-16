import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo/site-config";
import { studioProfile } from "@/lib/seo/studio-config";

const title = "PAUSE | استودیو معماری پاز در ساری و مازندران";
const description = studioProfile.descriptionFa;
const siteUrl = getSiteUrl();

export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: siteUrl ? { canonical: new URL("/", siteUrl) } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: studioProfile.name,
    locale: "fa_IR",
    url: siteUrl,
    images: siteUrl
      ? [
          {
            url: "/images/og-pause-studio.jpg",
            width: 1200,
            height: 630,
            alt: "طراحی فضای معماری کافه لاکاجا در ساری",
          },
        ]
      : undefined,
  },
  twitter: {
    card: siteUrl ? "summary_large_image" : "summary",
    title,
    description,
    images: siteUrl ? ["/images/og-pause-studio.jpg"] : undefined,
  },
};
