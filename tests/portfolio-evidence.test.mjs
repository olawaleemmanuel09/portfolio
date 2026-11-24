import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const catalog = read("lib/data/projects.ts");
const evidence = read("lib/data/engineeringEvidence.ts");
test("all project case studies and approved public aliases remain available", () => {
  assert.equal((catalog.match(/    slug: "/g) || []).length, 17);
  for (const name of ["Three-Branch Restaurant Operations Platform", "Security Workforce & Operations Management Platform", "Christ Heart Empowerment Foundation", "Elion Homes"]) assert.ok(catalog.includes(name), name);
  assert.ok(catalog.includes('slug: "security-workforce-operations"'));
  assert.ok(catalog.includes("Accountant") || evidence.includes("Accountant dashboard"));
});
test("only independently public GitHub repositories are linked as proof", () => {
  const linked = [...catalog.matchAll(/    repo: "(https:\/\/github\.com\/[^"]+)"/g)].map(x => x[1]).sort();
  const approved = [
    "https://github.com/olawaleemmanuel09/Christ-Heart-Empowerment-Foundation",
    "https://github.com/olawaleemmanuel09/ai-job-alert-system",
    "https://github.com/olawaleemmanuel09/lead-capture-crm-sync",
    "https://github.com/olawaleemmanuel09/lead-intelligence-pipeline",
    "https://github.com/olawaleemmanuel09/smartbook-ai-automation"
  ].sort();
  assert.deepEqual(linked, approved);
  assert.ok(evidence.includes("reconciliation"), "Accounting scope is described");
  assert.ok(evidence.includes("real-device"), "Field acceptance limitations are described");
});
test("architecture diagrams are valid named, text-described public assets", () => {
  const paths = [...catalog.matchAll(/preview: "(\/architecture\/[^"]+\.svg)"/g)].map(x => x[1]);
  assert.equal(paths.length, 3);
  for (const path of paths) {
    const file = "public" + path;
    assert.equal(existsSync(new URL("../" + file, import.meta.url)), true, file);
    const svg = read(file);
    assert.match(svg, /<svg[^>]+viewBox=/);
    assert.match(svg, /<title id="diagramTitle">/);
    assert.match(svg, /<desc id="diagramDesc">/);
    assert.match(svg, /not a real dashboard screenshot|conceptual/i);
  }
});
test("release-scope boundaries are explicit", () => {
  for (const section of ["Management dashboard", "Branch Manager dashboard", "Kitchen dashboard", "Accountant dashboard", "Manual dispatch"]) assert.ok(evidence.includes(section), section);
  assert.match(evidence, /requires-verification/);
  assert.match(evidence, /not independently verified screenshots/);
});

test("archived media files exist and have provenance entries", () => {
  const media = [...catalog.matchAll(/src: "(\/evidence\/[^"]+\.(?:png|jpg))"/g)].map(x => x[1]);
  assert.equal(media.length, 9);
  assert.equal(new Set(media).size, 9);
  for (const src of media) assert.ok(existsSync(new URL("../public" + src, import.meta.url)), src);
  assert.match(read("docs/review/CASE_STUDY_VISUAL_EVIDENCE.md"), /original Git blobs/);
});

test("verified adoption numbers have a snapshot date and no unverified prospect qualification total", () => {
  const ce = catalog.slice(catalog.indexOf('slug: "cefa"'), catalog.indexOf('slug: "whatsapp-ordering-system"'));
  assert.match(ce, /metricsAsOf: "2026-11-24"/);
  for (const [value, label] of [["127", "Students onboarded"], ["10", "Learning groups"], ["113", "Group-chat messages"]]) {
    assert.ok(ce.includes('value: "' + value + '"'), label);
    assert.ok(ce.includes('label: "' + label + '"'), label);
  }
  const prospect = catalog.slice(catalog.indexOf('slug: "b2b-revenue-engine"'), catalog.indexOf('slug: "elion-homes"'));
  assert.ok(!prospect.includes("metrics:"), "Do not publish an unverified live prospect/qualified count");
  assert.match(prospect, /October 9, 2026/);
  assert.match(prospect, /withheld from the public metrics/);
});
test("client cases lead with business problems and retain release boundaries", () => {
  for (const phrase of ["malware", "more than 1,000 guards", "same WhatsApp", "customer messages", "staff review"]) assert.ok(catalog.includes(phrase), phrase);
  assert.match(catalog, /production approval/);
  assert.match(evidence, /not describe them as certified production features/);
});

test("approved redacted assets are real binary files and video posters exist", () => {
  const root = new URL("../public/evidence/approved/", import.meta.url);
  const names = [
    "learning-portal-sign-in.jpg","learning-push-notifications.jpg",
    "restaurant-branch-overview.jpg","restaurant-menu-admin.jpg",
    "security-hq-overview.jpg","security-guard-shift.jpg",
    "real-estate-sales-overview.jpg","real-estate-conversations.jpg",
    "real-estate-leads.jpg","real-estate-properties.jpg",
    "job-alert-notifications.mp4","learning-portal-demo.mp4",
    "real-estate-website-mobile.mp4",
    "job-alert-notifications-poster.jpg","learning-portal-demo-poster.jpg",
    "real-estate-website-mobile-poster.jpg"
  ];
  for (const name of names) {
    const file = new URL(name, root);
    assert.ok(existsSync(file), "Missing actual sanitized media file " + name);
    const buf = readFileSync(file);
    assert.ok(buf.length > 5000, "Unreasonably tiny sanitized file: " + name);
    assert.ok(buf.length < 2_000_000, "Oversized published media: " + name);
    if (name.endsWith(".jpg")) assert.equal(buf[0], 0xff);
    if (name.endsWith(".mp4")) assert.equal(buf.toString("ascii", 4, 8), "ftyp");
  }
  assert.match(catalog, /50,000 prospects discovered is the owner's reported progress/);
  assert.ok(!catalog.includes('metricsAsOf: "2026-11-24",\n    metrics: [\n      { value: "50,000"'));
});

test("sanitized recordings are poster-first, click-to-play and source-labelled", () => {
  for (const item of ["learning-portal-demo.mp4", "real-estate-website-mobile.mp4", "job-alert-notifications.mp4"])
    assert.ok(catalog.includes("/evidence/approved/" + item), item);
  const gallery = read("components/sections/EvidenceGallery.tsx");
  assert.match(gallery, /preload="none"/);
  assert.match(gallery, /poster=\{m.poster\}/);
  assert.ok(!gallery.includes("autoPlay"), "No autoplay on mobile data");
});
