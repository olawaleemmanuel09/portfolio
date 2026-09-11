import type { Metadata } from "next";
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
  metadataBase: new URL("https://olawaleemmanuel09.github.io"),
  title: {
    default: "Olawale Emmanuel Olaonipekun — AI Automation Engineer",
    template: "%s — Olawale Emmanuel Olaonipekun",
  },
  description:
    "I build automation systems that run in production: ordering pipelines, lead engines and operations platforms for businesses in Nigeria and beyond.",
  openGraph: {
    type: "website",
    title: "Olawale Emmanuel Olaonipekun — AI Automation Engineer",
    description:
      "Automation systems that run in production. n8n, Supabase, Python and LLMs.",
    siteName: "Olawale Emmanuel Olaonipekun",
  },
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
