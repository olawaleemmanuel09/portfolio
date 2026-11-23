/**
 * Release-only restricted identifier scanner.
 *
 * Do not commit the identifier file, put it in CI logs, or run against
 * untrusted input. Store it outside this repository and set:
 * PORTFOLIO_PRIVATE_TERMS_FILE=/secure/location/private-terms.txt
 * npm run privacy:check
 *
 * This scans source and every public/static/generated output file. It never
 * prints matching identifiers or paths that could themselves contain them.
 */
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { resolve, sep, join, relative } from "node:path";

const root = realpathSync(resolve(process.cwd()));
const inputVar = process.env.PORTFOLIO_PRIVATE_TERMS_FILE;
function abort(reason) {
  console.error(reason);
  process.exit(2);
}
if (!inputVar) abort("Private identifier input is required; scan not performed.");
let input;
try {
  input = realpathSync(resolve(inputVar));
} catch {
  abort("Private identifier input is missing or unreadable.");
}
if (input === root || input.startsWith(root + sep)) {
  abort("Private identifier input cannot reside inside the repository.");
}
let terms;
try {
  terms = [...new Set(
    readFileSync(input, "utf8").split(/\r?\n/)
      .map(x => x.trim())
      .filter(x => x && !x.startsWith("#"))
      .map(x => x.toLowerCase().replace(/[^a-z0-9]/g, ""))
      .filter(Boolean)
  )];
} catch {
  abort("Private identifier input could not be read.");
}
if (!terms.length || terms.some(x => x.length < 3)) {
  abort("Private identifier input must contain nonempty terms of at least three normalized characters.");
}
const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, "");
const roots = ["README.md", "app", "components", "lib", "docs", "public", ".next", "out"];
const required = ["public", ".next/server", ".next/static"];
for (const path of required) {
  if (!existsSync(join(root, path))) {
    abort("Production build outputs or public assets are missing; run the production build first.");
  }
}
let inspected = 0;
let violations = 0;
const scan = path => {
  const entry = lstatSync(path);
  if (entry.isSymbolicLink()) throw new Error("Unexpected symlink in release scan scope");
  if (entry.isDirectory()) {
    for (const child of readdirSync(path)) scan(join(path, child));
    return;
  }
  if (!entry.isFile()) return;
  // Include all file types: .rsc, .body, JS chunks, XML, SVG and embedded
  // textual metadata in binary assets can all reach the browser.
  const content = normalize(readFileSync(path).toString("utf8"));
  const pathText = normalize(relative(root, path));
  inspected++;
  if (terms.some(term => content.includes(term) || pathText.includes(term))) {
    violations++;
    // Never output the filename or full path: those can contain the identifier.
    console.error("Restricted public material detected (file reference #" + inspected + ").");
  }
};
try {
  for (const item of roots) {
    const target = join(root, item);
    if (existsSync(target)) scan(target);
  }
} catch {
  abort("Privacy scan could not inspect all release files; no certification granted.");
}
if (inspected === 0) abort("No release files scanned; no certification granted.");
console.log("Private-name scan: " + inspected + " files inspected; " + violations + " violations.");
if (violations) process.exit(1);
