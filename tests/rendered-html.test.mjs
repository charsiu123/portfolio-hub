import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the public portfolio entry", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<h1>Selected builds<br\/>for <em>recruiter review\.<\/em><\/h1>/);
  assert.match(html, /Source repositories are private and available for review on request\./);
  assert.doesNotMatch(html, /github\.com\/charsiu123\/(habits-pwa|study-habit|preset-mall)/);
  assert.match(html, /CS \/ PORTFOLIO/i);
  assert.match(html, /Habit PWA/i);
  assert.match(html, /Study Habit/i);
  assert.match(html, /Preset Mall/i);
  assert.match(html, /Coursework highlights/i);
  assert.match(html, /No personal data or course-provided materials are included/i);
  assert.match(html, /Interactive demo in preparation\./);
  assert.doesNotMatch(html, /Protected demo/i);
});

test("ships public-entry metadata without noindex headers", async () => {
  const [layout, page, headers, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /CS Portfolio — Selected Builds/);
  assert.doesNotMatch(layout, /robots:/);
  assert.match(page, /projectCards/);
  assert.match(page, /const demoUrls: Record<ProjectId, string \| undefined> = \{/);
  assert.match(page, /demoUrl: demoUrls\[project\.id\]/);
  assert.match(page, /demoUrl\?: string/);
  assert.match(page, /project\.demoUrl \?/);
  assert.match(page, /<a className="demo-link" href=\{project\.demoUrl\} target="_blank" rel="noreferrer">/);
  assert.doesNotMatch(headers, /X-Robots-Tag/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Referrer-Policy: no-referrer/);
  assert.match(headers, /Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\), usb=\(\)/);
  assert.match(headers, /Content-Security-Policy: default-src 'self';/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("removes starter preview infrastructure", async () => {
  await assert.rejects(readFile(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  const appCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(appCss, /sites-skeleton/i);
  assert.ok(root);
});
