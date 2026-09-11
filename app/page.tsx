import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ProofVideo from "@/components/sections/ProofVideo";
import SelectedWork from "@/components/sections/SelectedWork";
import MoreWork from "@/components/sections/MoreWork";
import ContactBand from "@/components/sections/ContactBand";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProofVideo />
      <SelectedWork />
      <MoreWork />
      <ContactBand />
    </>
  );
}
