import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/Grimoire/SiteHeader";
import SiteFooter from "@/components/Grimoire/SiteFooter";
import AskAustin from "@/components/Grimoire/AskAustin";

// UI sans for nav and metadata.
const sans = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
});

// Display serif for the cover and writeup titles.
const displaySerif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

// Body serif; EB Garamond carries real small caps and old-style figures.
const bodySerif = EB_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-garamond",
});

const codeMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const description =
  "Austin Hinson's notebook: writeups on what he's building, a bookshelf of what he's learning, and the notes behind both.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.austinhinson.tech"),
  title: {
    default: "Austin Hinson",
    template: "%s · Austin Hinson",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Austin Hinson",
    description,
    url: "https://www.austinhinson.tech",
    siteName: "Austin Hinson",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Hinson",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${displaySerif.variable} ${bodySerif.variable} ${codeMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main className="mx-auto w-full max-w-[60rem] flex-1 px-6 sm:px-12">{children}</main>
        <SiteFooter />
        <AskAustin />
      </body>
    </html>
  );
}
