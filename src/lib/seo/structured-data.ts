import { getSiteUrl } from "@/lib/seo/site-config";
import { studioProfile } from "@/lib/seo/studio-config";

export function getStudioStructuredData() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: studioProfile.name,
    alternateName: [studioProfile.alternateName, studioProfile.localName],
    description: studioProfile.descriptionFa,
    address: {
      "@type": "PostalAddress",
      addressLocality: studioProfile.city,
      addressRegion: studioProfile.region,
      addressCountry: studioProfile.countryCode,
    },
    sameAs: [studioProfile.instagram],
    ...(siteUrl ? { url: siteUrl.href } : {}),
  };
}
