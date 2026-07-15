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

test("server-renders only the public noticeboard portfolio cards", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /ポートフォリオ/);
  assert.match(html, /Codex、Claude Codeを使用しながら/);
  assert.match(html, /完成版・試作版の動いているものが見れます。/);
  assert.doesNotMatch(html, /二つの入口。/);
  assert.doesNotMatch(html, /見せられる範囲を、/);
  assert.match(html, /完成\s*\/\s*ready to try/);
  assert.match(html, /制作中\s*\/\s*prototype in progress/);
  assert.doesNotMatch(html, /The Promised Neverland/i);
  assert.doesNotMatch(html, /github\.com/i);
  assert.match(html, /Habit PWA/i);
  assert.match(html, /Preset Mall/i);
  assert.doesNotMatch(html, /Study Habit/i);
  assert.doesNotMatch(html, /demos\/study/i);
  assert.match(html, /project-slip--habits/);
  assert.match(html, /project-slip--presets/);
  assert.doesNotMatch(html, /project-slip--study/);
});

test("renders same-origin demo links while retaining security headers", async () => {
  const response = await render();
  const html = await response.text();
  const [layout, page, headers, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title: "ポートフォリオ"/);
  assert.match(layout, /完成したPWAと制作中の試作/);
  assert.doesNotMatch(layout, /robots:/);
  assert.match(page, /projectCards/);
  assert.match(page, /const demoUrls: Record<ProjectId, string> = \{/);
  assert.match(page, /demoUrls\[project\.id\]/);
  assert.doesNotMatch(page, /target="_blank"/);
  assert.match(page, /完成版を開く/);
  assert.match(page, /制作中デモを開く/);
  for (const [projectId, demoUrl] of [
    ["habit-pwa", "/demos/habits/"],
    ["preset-mall", "/demos/presets/"],
  ]) {
    assert.match(page, new RegExp(`"${projectId}": "${demoUrl}"`));
    assert.match(html, new RegExp(`href="${demoUrl}"`));
  }
  assert.doesNotMatch(page, /study-habit/i);
  assert.doesNotMatch(page, /demos\/study/i);
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
