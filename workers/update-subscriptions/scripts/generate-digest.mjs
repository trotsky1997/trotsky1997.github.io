import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));
const limit = clamp(parseInt(args.limit || "5", 10), 1, 20);
const out = args.out || "dist/update-digest.txt";
const source = await resolveSource(args);
const digest = await buildDigest(source, limit);

await mkdir(dirname(resolve(out)), { recursive: true });
await writeFile(out, digest, "utf8");
console.log(`wrote ${out}`);

async function resolveSource(args) {
  const workerUrl = args.workerUrl || process.env.UPDATE_SUBSCRIPTIONS_WORKER_URL || "";
  const adminToken = args.adminToken || process.env.UPDATE_SUBSCRIPTIONS_ADMIN_TOKEN || "";

  if (workerUrl && adminToken) {
    const url = new URL("/admin/digest", workerUrl);
    url.searchParams.set("token", adminToken);
    url.searchParams.set("limit", String(limit));
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Worker digest failed: ${response.status} ${await response.text()}`);
    }
    return {
      kind: "worker",
      text: await response.text(),
    };
  }

  const feedUrl = args.feed || process.env.UPDATE_FEED_URL || "https://trotsky1997.github.io/updates.xml";
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`Feed fetch failed: ${response.status} ${await response.text()}`);
  }
  return {
    kind: "feed",
    feedUrl,
    text: await response.text(),
  };
}

async function buildDigest(source, limit) {
  if (source.kind === "worker") {
    return normalizeTrailingNewline(source.text);
  }

  const entries = parseAtomEntries(source.text).slice(0, limit);
  const generatedAt = new Date().toISOString();
  const lines = [
    "Di Zhang publication and blog updates",
    "",
    `Generated: ${generatedAt}`,
    `Source: ${source.feedUrl}`,
    "",
  ];

  for (const entry of entries) {
    lines.push(entry.title);
    lines.push(entry.link);
    if (entry.summary) lines.push(entry.summary);
    lines.push("");
  }

  lines.push("Delivery note: the scheduled GitHub Actions workflow sends this digest through configured SMTP credentials.");
  return normalizeTrailingNewline(lines.join("\n"));
}

function parseAtomEntries(feed) {
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    return {
      title: decodeXml(tag(entry, "title")),
      summary: decodeXml(tag(entry, "summary").replace(/<[^>]+>/g, "")),
      link: decodeXml((entry.match(/<link\s+href="([^"]+)"/) || [])[1] || ""),
    };
  });
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`));
  return match ? match[1].trim() : "";
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

function normalizeTrailingNewline(value) {
  return value.replace(/\s+$/g, "") + "\n";
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    parsed[key] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
  }
  return parsed;
}
