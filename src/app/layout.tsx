import {
  Antic_Didone,
  IBM_Plex_Mono,
  Slackey,
  Space_Mono,
} from "next/font/google";
import { siteMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

const anticDidone = Antic_Didone({
  variable: "--font-antic-didone",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

const slackey = Slackey({
  variable: "--font-slackey",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = siteMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${ibmPlexMono.variable} ${anticDidone.variable} ${spaceMono.variable} ${slackey.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-studio-charcoal font-sans text-studio-white">
        {children}
      </body>
    </html>
  );
}
