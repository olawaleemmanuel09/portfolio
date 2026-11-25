import type { Metadata } from "next";
import { homeTitle, homeDescription, pageMetadata, person, website } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import PortfolioHome from "./design-preview/PortfolioHome";

export const metadata: Metadata = pageMetadata("/", homeTitle, homeDescription, "/work/headshot.jpg");

export default function Home() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [person, website] }} />
      <PortfolioHome />
    </>
  );
}
