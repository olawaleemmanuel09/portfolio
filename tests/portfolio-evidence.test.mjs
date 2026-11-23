import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const catalog = read("lib/data/projects.ts");
const evidence = read("lib/data/engineeringEvidence.ts");
const files = ["lib/data/projects.ts", "lib/data/engineeringEvidence.ts", "docs/PORTFOLIO_CLAIMS_REGISTER.md", "docs/review/CONTENT_EVIDENCE_MATRIX.md", "app/layout.tsx", "components/sections/Hero.tsx"];
test("all project case studies and approved public aliases remain available", () => {
  assert.equal((catalog.match(/    slug: "/g) || []).length, 16);
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
  assert.equal(paths.length, 8);
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
