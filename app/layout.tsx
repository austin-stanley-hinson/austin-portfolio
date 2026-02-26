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

export const metadata = {
  title: "Austin Hinson | Software Engineer",
  description:
    "Computer Science & Applied Mathematics student building scalable systems and AI-powered applications.",
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
