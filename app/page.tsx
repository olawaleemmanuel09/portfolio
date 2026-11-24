import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import ProblemExplorer from "@/components/sections/ProblemExplorer";
import SelectedWork from "@/components/sections/SelectedWork";
import MoreWork from "@/components/sections/MoreWork";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactBand from "@/components/sections/ContactBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Olawale Emmanuel Olaonipekun — AI Engineer — Growth & Automation Systems",
    description: "Business problems, working systems. Case studies in intelligent ordering, secure operations, CRM and learning infrastructure.",
    images: ["/work/headshot.jpg"],
    siteName: "Olawale Emmanuel Olaonipekun",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ProblemExplorer />
      <SelectedWork />
      <MoreWork />
      <AboutPreview />
      <ContactBand />
    </>
  );
}
