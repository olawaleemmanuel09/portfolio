import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/motion/PageTransition";
import Footer from "@/components/layout/Footer";

const archivo = localFont({
  src: "./fonts/Archivo-var.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Olawale Emmanuel Olaonipekun — AI Engineer — Growth & Automation Systems",
    template: "%s — Olawale Emmanuel Olaonipekun",
  },
  description:
    "AI Engineer building production AI systems, CRM architecture, secure business platforms and growth automation. Explore engineering case studies and verified project evidence.",
  twitter: { card: "summary_large_image", creator: "@LaoniAI" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <SmoothScroll />
        <PageTransition />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
