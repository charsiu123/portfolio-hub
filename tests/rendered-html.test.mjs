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

test("server-renders the private portfolio evidence hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Private portfolio/i);
  assert.match(html, /Habit PWA/i);
  assert.match(html, /Study Habit/i);
  assert.match(html, /Preset Mall/i);
  assert.match(html, /Coursework highlights/i);
  assert.match(html, /No personal data or course-provided materials are included/i);
  assert.match(html, /Protected demo/i);
});

test("ships private-site metadata and noindex headers", async () => {
  const [layout, page, headers, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Private CS Portfolio/);
  assert.match(layout, /robots:/);
  assert.match(page, /projectCards/);
  assert.match(headers, /X-Robots-Tag: noindex, nofollow/);
  assert.match(headers, /Content-Security-Policy/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("removes starter preview infrastructure", async () => {
  await assert.rejects(readFile(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  const appCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(appCss, /sites-skeleton/i);
  assert.ok(root);
});
