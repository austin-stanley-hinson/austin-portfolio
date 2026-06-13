import type { Metadata } from "next";
import {Inter, Cormorant_Garamond, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import Provider from "@/components/HOC/Provider";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import CustomCursor from "@/components/Helper/CustomCursor";
import AskAustin from "@/components/Home/AskAustin/AskAustin";

const font = Inter({
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin"],
});

// Display serif (Copernicus / Tiempos substitute per DESIGN.md) + code mono.
const displaySerif = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const codeMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.austinhinson.tech"),
  title: "Austin Hinson | Software Engineer",
  description:
    "Computer Science & Applied Mathematics student building scalable systems and AI-powered applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Austin Hinson | Software Engineer",
    description:
      "Computer Science & Applied Mathematics student building scalable systems and AI-powered applications.",
    url: "https://www.austinhinson.tech",
    siteName: "Austin Hinson",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Hinson | Software Engineer",
    description:
      "Computer Science & Applied Mathematics student building scalable systems and AI-powered applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} ${displaySerif.variable} ${codeMono.variable} antialiased`}
      >
        <Provider>
        <CustomCursor/>
        <AskAustin/>
        <ResponsiveNav/>
        {children}
        <Footer/>
        <ScrollToTop/>
        </Provider>
      </body>
    </html>
  );
}
