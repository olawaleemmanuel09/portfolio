/**
 * Review-only public identifier scan. The private terms list must be held
 * outside the repository and is never printed or committed.
 *
 * PORTFOLIO_PRIVATE_TERMS_FILE=/path/outside/repo/private-terms.txt
 * node scripts/check-private-names.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, sep, extname } from "node:path";

const root = resolve(process.cwd());
const listPath = process.env.PORTFOLIO_PRIVATE_TERMS_FILE;
if (!listPath) {
  console.error("Missing PORTFOLIO_PRIVATE_TERMS_FILE; private-name verification has not run.");
  process.exit(2);
}
const input = resolve(listPath);
if (input === root || input.startsWith(root + sep)) {
  console.error("Refusing private identifier input inside the repository.");
  process.exit(2);
}
if (!existsSync(input)) {
  console.error("Private input file does not exist.");
  process.exit(2);
}
const normalize = value => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
const terms = readFileSync(input, "utf8").split(/\r?\n/).map(line => line.trim())
  .filter(line => line && !line.startsWith("#")).map(normalize).filter(Boolean);
if (!terms.length) {
  console.error("Private input contains no identifiers; verification has not run.");
  process.exit(2);
}
const allowed = new Set([".md", ".tsx", ".ts", ".js", ".mjs", ".cjs", ".json", ".svg", ".css", ".html", ".xml", ".txt"]);
const targets = ["README.md", "app", "components", "lib", "docs", "public/architecture", ".next/server/app"];
let scanned = 0;
const flagged = [];
function scan(target) {
  if (!existsSync(target)) return;
  if (statSync(target).isDirectory()) {
    for (const item of readdirSync(target)) scan(join(target, item));
    return;
  }
  if (!allowed.has(extname(target))) return;
  scanned += 1;
  const normalized = normalize(readFileSync(target, "utf8"));
  if (terms.some(term => normalized.includes(term))) {
    flagged.push(target.startsWith(root + sep) ? target.slice(root.length + 1) : target);
  }
}
for (const target of targets) scan(join(root, target));
console.log("Private-name scan completed: " + scanned + " files; violations: " + flagged.length);
if (flagged.length) {
  for (const file of flagged) console.error("Restricted public content in: " + file);
  process.exit(1);
}
