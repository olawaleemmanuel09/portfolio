import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import SelectedWork from "@/components/sections/SelectedWork";
import MoreWork from "@/components/sections/MoreWork";
import ContactBand from "@/components/sections/ContactBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Olawale Emmanuel Olaonipekun — AI Engineer — Growth & Automation Systems",
    description:
      "Applied AI engineering, secure business platforms, CRM infrastructure, systems architecture and reliable operational workflows.",
    images: ["/work/headshot.jpg"],
    siteName: "Olawale Emmanuel Olaonipekun",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <MoreWork />
      <ContactBand />
    </>
  );
}
