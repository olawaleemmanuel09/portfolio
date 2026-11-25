import type { Metadata } from "next";
import PortfolioHome from "./PortfolioHome";

export const metadata: Metadata = {
  title: "Portfolio V2 — private design study",
  robots: { index: false, follow: false },
};

export default function DesignPreview() {
  return <PortfolioHome preview />;
}
