export type ProjectStatus = "production" | "build" | "capstone";

export type Media = {
  src: string;
  alt: string;
  caption?: string;
  type?: "image" | "video";
  aspect?: "wide" | "tall";
};

export type Block = { title: string; body: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  status: ProjectStatus;
  statusLabel: string;
  period: string;
  summary: string;
  stack: string[];
  featured: boolean;
  order: number;
  problem: string[];
  approach: Block[];
  decision?: Block;
  outcome: string[];
  demonstrates?: string;
  media: Media[];
  preview?: string;
  repo?: string;
  live?: string;
};
