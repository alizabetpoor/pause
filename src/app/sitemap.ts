import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [
    {
      url: siteUrl.href,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
