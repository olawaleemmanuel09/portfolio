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

test("case studies preserve semantic chapter navigation and evidence boundaries", async () => {
  for (const slug of ["cefa", "ai-job-scraper", "web-ordering-and-payments"]) {
    const html = await (await fetch(origin + "/work/" + slug)).text();
    assert.match(html, /aria-label="Case-study chapters"/);
    assert.match(html, /href="#case-challenge"/);
    assert.match(html, /id="case-visual-evidence" aria-labelledby="case-visual-evidence-title"/);
    assert.match(html, /href="#case-results"/);
    assert.match(html, /id="case-system"/);
    assert.match(html, /class="case-cinema-response/);
    assert.match(html, /WHAT THE EVIDENCE ACTUALLY SUPPORTS/);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  }
  const ce = await (await fetch(origin + "/work/cefa")).text();
  for (const number of ["127", "10", "113"]) assert.match(ce, new RegExp(">"+number+"<"));
  const job = await (await fetch(origin + "/work/ai-job-scraper")).text();
  assert.match(job, /Archived project capture/);
  assert.match(job, /one We Work Remotely RSS feed/);
});

function jsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]));
}

test("search metadata is unique, canonical and source-consistent across all 22 pages", async () => {
  const xml = await (await fetch(origin + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.+?)<\/loc>/g)].map(match => new URL(match[1]));
  assert.equal(urls.length, 22);
  const titles = new Set(), descriptions = new Set();
  for (const url of urls) {
    const html = await (await fetch(origin + url.pathname)).text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && description, url.pathname);
    assert.ok(!titles.has(title), title);
    assert.ok(!descriptions.has(description), url.pathname);
    titles.add(title);
    descriptions.add(description);
    // Next normalizes URL serialization (notably a bare origin versus "/").
    // Compare resolved URLs, not raw attribute order or serialization.
    const ogTag = [...html.matchAll(/<meta\b[^>]*>/g)]
      .map(match => match[0])
      .find(tag => /\bproperty="og:url"/.test(tag));
    const ogUrl = ogTag?.match(/\bcontent="([^"]+)"/)?.[1];
    assert.ok(ogUrl, "Missing Open Graph URL: " + url.pathname);
    assert.equal(new URL(ogUrl).href, url.href, url.pathname);
    assert.ok(html.includes('name="twitter:card"'), url.pathname);
    if (url.pathname.startsWith("/work/")) {
      const graph = jsonLd(html).flatMap(item => item["@graph"] ?? []);
      const article = graph.find(item => item["@type"] === "Article");
      const person = graph.find(item => item["@type"] === "Person");
      assert.equal(article?.mainEntityOfPage, url.href);
      assert.equal(article?.author["@id"], person?.["@id"]);
      assert.ok(article?.headline && article?.description, url.pathname);
    }
  }
});

test("professional identity and crawler policy are explicit without invented reviews", async () => {
  const home = await (await fetch(origin)).text();
  const about = await (await fetch(origin + "/about")).text();
  const homeGraph = jsonLd(home).flatMap(item => item["@graph"] ?? []);
  const aboutGraph = jsonLd(about).flatMap(item => item["@graph"] ?? []);
  const person = homeGraph.find(item => item["@type"] === "Person");
  assert.equal(person?.name, "Olawale Emmanuel Olaonipekun");
  assert.equal(aboutGraph.find(item => item["@type"] === "ProfilePage")?.mainEntity["@id"], person["@id"]);
  assert.ok(homeGraph.some(item => item["@type"] === "WebSite"));
  const robots = await (await fetch(origin + "/robots.txt")).text();
  assert.match(robots, /User-Agent: OAI-SearchBot/i);
  assert.match(robots, /Disallow: \/api\//i);
  assert.match(robots, /Sitemap: https:\/\//i);
});

test("contact rejects oversized bodies, non-JSON and cross-origin requests without sending mail", async () => {
  const headers = { origin, "content-type": "application/json" };
  const response = await fetch(origin + "/api/contact", {
    method: "POST", headers, body: JSON.stringify({ message: "x".repeat(40000) }),
  });
  assert.equal(response.status, 413);
  const unsupported = await fetch(origin + "/api/contact", {
    method: "POST", headers: { origin, "content-type": "text/plain; application/json" }, body: "{}",
  });
  assert.equal(unsupported.status, 415);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("all canonical HTML and representative public resources have security headers", async () => {
  for (const path of ["/", "/about", "/work/cefa", "/contact", "/robots.txt", "/sitemap.xml", "/work/headshot.jpg"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff", path);
    assert.equal(response.headers.get("x-frame-options"), "DENY", path);
    assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/, path);
    assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/, path);
  }
});
