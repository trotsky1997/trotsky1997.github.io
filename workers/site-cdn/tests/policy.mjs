import assert from "node:assert/strict";
import { buildOriginUrl, classifyRequest } from "../src/index.mjs";

const cases = [
  ["https://cdn.example.com/service-worker.js", "GET", "bypass"],
  ["https://cdn.example.com/updates.xml", "GET", "feed"],
  ["https://cdn.example.com/google-scholar-stats/latest.json", "GET", "feed"],
  ["https://cdn.example.com/assets/css/main.css?v=20260606", "GET", "immutable"],
  ["https://cdn.example.com/assets/vendor/katex/katex.min.js", "GET", "immutable"],
  ["https://cdn.example.com/assets/fonts/fa-solid-900.woff2", "GET", "immutable"],
  ["https://cdn.example.com/images/avatar.png", "GET", "static"],
  ["https://cdn.example.com/files/FDU-ZhangDi-CV-2026.pdf", "GET", "file"],
  ["https://cdn.example.com/blog/agent-own-loop-harness-when-sdd-runs-itself/", "GET", "html"],
  ["https://cdn.example.com/subscribe/", "POST", "bypass"]
];

for (const [url, method, expected] of cases) {
  assert.equal(classifyRequest(url, method).name, expected, `${method} ${url}`);
}

const originUrl = buildOriginUrl("https://cdn.example.com/blog/?q=1", {
  ORIGIN: "https://trotsky1997.github.io"
});

assert.equal(originUrl.toString(), "https://trotsky1997.github.io/blog/?q=1");

console.log("site-cdn policy tests passed");
