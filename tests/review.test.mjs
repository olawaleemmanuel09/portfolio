import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const origin = "http://127.0.0.1:3197";
let server;
before(async () => {
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", "3197"], {
    env: { ...process.env, RESEND_API_KEY: "", CONTACT_TO: "" },
    stdio: "ignore",
  });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw Error("Review server exited");
    if (await fetch(origin).then(r => r.ok).catch(() => false)) return;
    await delay(100);
  }
  throw Error("Review server failed to start");
});
after(() => server?.kill());

test("sitemap pages render with a single heading and canonical link", async () => {
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  const pages = [...sitemap.matchAll(/<loc>(.+?)<\/loc>/g)].map(match => new URL(match[1]));
  assert.ok(pages.some(url => url.pathname === "/work/cefa"));
  for (const url of pages) {
    const response = await fetch(origin + url.pathname);
    assert.equal(response.status, 200, url.pathname);
    const html = await response.text();
    assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, url.pathname);
    assert.equal(new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).href, url.href);
    assert.doesNotMatch(html, /Six systems in production|Software Engineer/i);
  }
});

test("landing page and job case distinguish role, flagship and workflow editions", async () => {
  const home = await (await fetch(origin)).text();
  assert.match(home, /AI Engineer — Growth &amp; Automation Systems/);
  assert.match(home, /class="cinematic-line-inner">Business<\/span>/);
  assert.match(home, /class="cinematic-line-inner">problems<span/);
  assert.match(home, /<em>Working systems\.<\/em>/);
  assert.match(home, /Choose the/);
  assert.match(home, /ONE VERIFIED SNAPSHOT/);
  assert.match(home, /href="\/work\/cefa"/);
  const job = await (await fetch(origin + "/work/ai-job-scraper")).text();
  for (const evidence of ["seven job-source branches", "archived", "10-node", "Adzuna", "inactive", "seven-node classroom", "one We Work Remotely RSS feed"]) {
    assert.ok(job.includes(evidence), evidence);
  }
});

test("stage filter keeps the case studies and collection links in sync", async () => {
  const html = await (await fetch(origin + "/work?stage=capstone")).text();
  assert.match(html, /href="\/work\/smartbook-ai"/);
  assert.doesNotMatch(html, /href="\/work\/cefa"|href="#systems"/);
});

test("contact rejects invalid requests and falls back without sending mail", async () => {
  async function post(body, headers) {
    return fetch(origin + "/api/contact", { method: "POST", headers, body });
  }
  const headers = { origin, "content-type": "application/json" };
  assert.equal((await post("{}", {})).status, 403);
  assert.equal((await post("{}", { ...headers, origin: "https://example.org" })).status, 403);
  assert.equal((await post("null", headers)).status, 400);
  assert.equal((await post("{}", headers)).status, 400);
  const response = await post(JSON.stringify({name:"Review",email:"review@example.com",message:"Synthetic review message"}), headers);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /email me directly/);
  assert.equal((await post("{}", headers)).status, 429);
});
