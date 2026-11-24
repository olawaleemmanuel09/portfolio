import type { Metadata } from "next";
import { homeTitle, homeDescription, pageMetadata, person, website } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import MotionDirector from "@/components/motion/MotionDirector";
import ProofStrip from "@/components/sections/ProofStrip";
import ProblemExplorer from "@/components/sections/ProblemExplorer";
import SelectedWork from "@/components/sections/SelectedWork";
import MoreWork from "@/components/sections/MoreWork";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactBand from "@/components/sections/ContactBand";

export const metadata: Metadata = pageMetadata("/", homeTitle, homeDescription, "/work/headshot.jpg");

export default function Home() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [person, website] }} />
      <MotionDirector />
      <Hero />
      <Manifesto />
      <ProofStrip />
      <ProblemExplorer />
      <SelectedWork />
      <MoreWork />
      <AboutPreview />
      <ContactBand />
    </>
  );
}
