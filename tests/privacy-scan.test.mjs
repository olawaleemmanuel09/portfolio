import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scanner = fileURLToPath(new URL("../scripts/check-private-names.mjs", import.meta.url));
const syntheticIdentity = "Synthetic Saffron Research";
function setup(t, withBuild = true) {
  const folder = mkdtempSync(join(tmpdir(), "portfolio-release-test-"));
  t.after(() => rmSync(folder, { recursive: true, force: true }));
  const root = join(folder, "candidate");
  const terms = join(folder, "private-input.txt");
  mkdirSync(join(root, "public"), { recursive: true });
  if (withBuild) {
    mkdirSync(join(root, ".next", "server", "app"), { recursive: true });
    mkdirSync(join(root, ".next", "static", "chunks"), { recursive: true });
  }
  writeFileSync(terms, syntheticIdentity + "\n");
  return { root, terms };
}
function put(root, path, content) {
  const full = join(root, path);
  const parent = full.slice(0, full.lastIndexOf("/") >= 0 ? full.lastIndexOf("/") : full.lastIndexOf("\\"));
  mkdirSync(parent, { recursive: true });
  writeFileSync(full, content);
}
function run(root, terms) {
  return spawnSync(process.execPath, [scanner], {
    cwd: root, encoding: "utf8", timeout: 20000,
    env: { ...process.env, PORTFOLIO_PRIVATE_TERMS_FILE: terms }
  });
}
test("allows a clean public tree and generated build", t => {
  const {root,terms} = setup(t);
  put(root, "public/main.svg", "<svg><title>Public architecture</title></svg>");
  put(root, ".next/server/app/index.rsc", "safe server response");
  put(root, ".next/static/chunks/main.js", "console.log('safe');");
  const result = run(root, terms);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /0 violations/);
});
test("detects public SVG, browser JavaScript and generated RSC payload", t => {
  const {root,terms} = setup(t);
  put(root, "public/other/illustration.svg", "<svg><title>" + syntheticIdentity + "</title></svg>");
  put(root, ".next/static/chunks/private.js", "const brand = '" + syntheticIdentity + "';");
  put(root, ".next/server/app/index.rsc", syntheticIdentity);
  const result = run(root, terms);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /3 violations/);
  assert.doesNotMatch(result.stderr + result.stdout, /Synthetic Saffron Research/i);
  assert.doesNotMatch(result.stderr + result.stdout, /private\.js/);
});
test("does not expose restricted identifiers occurring only in filenames", t => {
  const {root,terms} = setup(t);
  put(root, "public/Synthetic-Saffron-Research-logo.svg", "<svg><title>Generic</title></svg>");
  const result = run(root, terms);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /1 violations/);
  assert.doesNotMatch(result.stderr + result.stdout, /Saffron|Research|logo\.svg/i);
});
test("refuses to certify before a complete production build", t => {
  const {root,terms} = setup(t, false);
  const result = run(root, terms);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /production build/i);
});
test("refuses to use a private identifier file kept inside the repository", t => {
  const {root} = setup(t);
  const unsafe = join(root, "private.txt");
  writeFileSync(unsafe, syntheticIdentity);
  const result = run(root, unsafe);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /inside the repository/i);
});
