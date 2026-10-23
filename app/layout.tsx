import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { ModeProvider } from "@/lib/ModeContext";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { meta } from "@/content/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(meta.url),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: "Franz Cadiente",
    images: [{ url: meta.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart2P.variable} h-full`}>
      <body className="min-h-full" suppressHydrationWarning>
        <ModeProvider>
          <a href="#main-content" className="skip-nav">
            Skip to content
          </a>
          <ModeToggle />
          <div id="main-content">{children}</div>
        </ModeProvider>
      </body>
    </html>
  );
}
