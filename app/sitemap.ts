import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/about", "/contact", "/resume", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
