export type ProjectStatus = "production" | "staging" | "prototype" | "delivered" | "capstone" | "personal";

export type Media = {
  src: string;
  poster?: string;
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
  metrics?: { value: string; label: string }[];
  metricsAsOf?: string;
  ownerReportedProgress?: { value: string; label: string; asOf: string; note: string };
  repo?: string;
  live?: string;
};
