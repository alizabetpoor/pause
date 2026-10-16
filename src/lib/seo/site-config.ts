/** A verified HTTPS production origin supplied at build time via SITE_URL. */
export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  try {
    const url = new URL(configuredUrl);
    const hostname = url.hostname.toLowerCase();
    const privateIpv4 =
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
    const localHostname =
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".test") ||
      hostname.startsWith("127.") ||
      hostname === "[::1]" ||
      privateIpv4;

    if (url.protocol !== "https:" || localHostname) return undefined;
    return new URL(url.origin);
  } catch {
    return undefined;
  }
}
