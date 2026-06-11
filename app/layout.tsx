import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/components/HOC/Provider";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";

const font = Inter({
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin"],
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
        className={`${font.className} antialiased`}
      >
        <Provider>
        <ResponsiveNav/>
        {children}
        <Footer/>
        <ScrollToTop/>
        </Provider>
      </body>
    </html>
  );
}
