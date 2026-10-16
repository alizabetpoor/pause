import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
