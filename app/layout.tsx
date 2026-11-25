import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { homeTitle, homeDescription, shortName } from "@/lib/seo";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
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
    default: homeTitle,
    template: "%s | " + shortName,
  },
  description: homeDescription,
  twitter: { card: "summary_large_image", creator: "@LaoniAI" },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
