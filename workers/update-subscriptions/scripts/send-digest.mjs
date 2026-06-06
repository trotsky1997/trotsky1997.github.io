import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import nodemailer from "nodemailer";

const args = parseArgs(process.argv.slice(2));
const startedAt = new Date();
const limit = clamp(parseInt(config("limit", "DIGEST_LIMIT", "5"), 10), 1, 20);
const windowDays = clamp(parseFloat(config("windowDays", "UPDATE_DIGEST_WINDOW_DAYS", "8")), 0, 3650);
const forceSend = bool(config("forceSend", "UPDATE_DIGEST_FORCE_SEND", "false"));
const dryRun = bool(config("dryRun", "UPDATE_DIGEST_DRY_RUN", "false"));
const out = config("out", "UPDATE_DIGEST_OUT", "dist/update-digest.txt");
const reportOut = config("reportOut", "UPDATE_DIGEST_REPORT_OUT", "dist/update-digest-report.json");

const feedUrl = config("feed", "UPDATE_FEED_URL", "https://trotsky1997.github.io/updates.xml");
const workerUrl = required(config("workerUrl", "UPDATE_SUBSCRIPTIONS_WORKER_URL", ""), "UPDATE_SUBSCRIPTIONS_WORKER_URL");
const adminToken = required(config("adminToken", "UPDATE_SUBSCRIPTIONS_ADMIN_TOKEN", ""), "UPDATE_SUBSCRIPTIONS_ADMIN_TOKEN");
const subject = config("subject", "DIGEST_SUBJECT", "Di Zhang publication and blog updates");
const from = config("from", "UPDATE_MAIL_FROM", "");
const replyTo = config("replyTo", "UPDATE_MAIL_REPLY_TO", "");
const onlyEmail = normalizeEmail(config("onlyEmail", "UPDATE_DIGEST_ONLY_EMAIL", ""));

const allEntries = parseAtomEntries(await fetchText(feedUrl, "updates feed"));
const entries = selectEntries(allEntries, { limit, windowDays, forceSend, now: startedAt });
const subscribers = filterSubscribers(await fetchSubscribers(workerUrl, adminToken), onlyEmail);
const digestText = buildDigestText({ subject, entries, feedUrl, generatedAt: startedAt });
const report = {
  started_at: startedAt.toISOString(),
  dry_run: dryRun,
  force_send: forceSend,
  limit,
  window_days: windowDays,
  feed_url: feedUrl,
  selected_entries: entries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    updated: entry.updated,
    link: entry.link,
  })),
  subscriber_count: subscribers.length,
  only_email: onlyEmail,
  sent: [],
};

await writeOutput(out, digestText);

if (entries.length === 0) {
  report.result = "skipped";
  report.reason = forceSend ? "feed_has_no_entries" : "no_entries_in_window";
  await writeOutput(reportOut, JSON.stringify(report, null, 2) + "\n");
  console.log(`no digest email sent: ${report.reason}`);
} else if (subscribers.length === 0) {
  report.result = "skipped";
  report.reason = "no_confirmed_subscribers";
  await writeOutput(reportOut, JSON.stringify(report, null, 2) + "\n");
  console.log("no digest email sent: no confirmed subscribers");
} else {
  let transporter = null;
  if (!dryRun) {
    transporter = createTransporter();
    await transporter.verify();
  }

  for (const subscriber of subscribers) {
    const message = buildMessage({ subscriber, subject, entries, feedUrl, from, replyTo });
    if (dryRun) {
      report.sent.push({ email: subscriber.email, status: "dry_run" });
      continue;
    }

    try {
      const info = await transporter.sendMail(message);
      report.sent.push({
        email: subscriber.email,
        status: "sent",
        message_id: info.messageId || "",
        response: info.response || "",
      });
    } catch (error) {
      report.sent.push({
        email: subscriber.email,
        status: "failed",
        error: error.message,
      });
    }
  }

  report.sent_count = report.sent.filter((item) => item.status === "sent").length;
  report.failed_count = report.sent.filter((item) => item.status === "failed").length;
  report.result = report.failed_count > 0 ? "partial_failure" : dryRun ? "dry_run" : "sent";

  await writeOutput(reportOut, JSON.stringify(report, null, 2) + "\n");
  console.log(`${report.result}: ${report.sent.length} recipient(s), ${entries.length} update(s)`);

  if (report.failed_count > 0) {
    process.exitCode = 1;
  }
}

function createTransporter() {
  const host = required(config("smtpHost", "UPDATE_SMTP_HOST", process.env.SMTP_HOST || ""), "UPDATE_SMTP_HOST");
  const port = parseInt(config("smtpPort", "UPDATE_SMTP_PORT", process.env.SMTP_PORT || "587"), 10);
  const user = config("smtpUser", "UPDATE_SMTP_USER", process.env.SMTP_USER || "");
  const pass = config("smtpPass", "UPDATE_SMTP_PASS", process.env.SMTP_PASS || "");
  const secure = bool(config("smtpSecure", "UPDATE_SMTP_SECURE", process.env.SMTP_SECURE || (port === 465 ? "true" : "false")));
  const requireTLS = bool(config("smtpRequireTls", "UPDATE_SMTP_REQUIRE_TLS", process.env.SMTP_REQUIRE_TLS || "true"), true);
  const auth = user || pass ? { user: required(user, "UPDATE_SMTP_USER"), pass: required(pass, "UPDATE_SMTP_PASS") } : undefined;

  required(from, "UPDATE_MAIL_FROM");
  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS,
    auth,
  });
}

function filterSubscribers(subscribers, onlyEmail) {
  if (!onlyEmail) return subscribers;
  return subscribers.filter((subscriber) => normalizeEmail(subscriber.email) === onlyEmail);
}

async function fetchSubscribers(baseUrl, token) {
  const url = new URL("/admin/subscribers.json", baseUrl);
  url.searchParams.set("token", token);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`subscriber fetch failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const subscribers = Array.isArray(payload.subscribers) ? payload.subscribers : [];
  return subscribers
    .filter((row) => row.email && row.unsubscribe_url)
    .map((row) => ({
      email: row.email,
      unsubscribe_url: row.unsubscribe_url,
    }));
}

async function fetchText(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} fetch failed: ${response.status} ${await response.text()}`);
  }
  return response.text();
}

function selectEntries(entries, options) {
  const limited = options.forceSend
    ? entries
    : entries.filter((entry) => {
      if (!entry.updated_at) return false;
      const ageMs = options.now.getTime() - entry.updated_at.getTime();
      return ageMs >= 0 && ageMs <= options.windowDays * 24 * 60 * 60 * 1000;
    });
  return limited.slice(0, options.limit);
}

function buildMessage({ subscriber, subject, entries, feedUrl, from, replyTo }) {
  const text = buildRecipientText({ subject, entries, feedUrl, unsubscribeUrl: subscriber.unsubscribe_url });
  const html = buildRecipientHtml({ subject, entries, feedUrl, unsubscribeUrl: subscriber.unsubscribe_url });
  return {
    from,
    to: subscriber.email,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${subscriber.unsubscribe_url}>`,
      "X-Updates-Feed": feedUrl,
    },
  };
}

function buildDigestText({ subject, entries, feedUrl, generatedAt }) {
  if (entries.length === 0) {
    return normalizeTrailingNewline([
      subject,
      "",
      `Generated: ${generatedAt.toISOString()}`,
      `Source: ${feedUrl}`,
      "",
      "No new publication or blog updates matched this digest window.",
    ].join("\n"));
  }

  return normalizeTrailingNewline([
    subject,
    "",
    `Generated: ${generatedAt.toISOString()}`,
    `Source: ${feedUrl}`,
    "",
    ...entries.flatMap((entry) => [
      entry.title,
      entry.link,
      entry.summary,
      "",
    ]),
  ].join("\n"));
}

function buildRecipientText({ subject, entries, feedUrl, unsubscribeUrl }) {
  return normalizeTrailingNewline([
    subject,
    "",
    ...entries.flatMap((entry) => [
      entry.title,
      entry.link,
      entry.summary,
      "",
    ]),
    `Updates feed: ${feedUrl}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n"));
}

function buildRecipientHtml({ subject, entries, feedUrl, unsubscribeUrl }) {
  return `<!doctype html>
<meta charset="utf-8">
<title>${escapeHtml(subject)}</title>
<main style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.55; color: #1f2933;">
  <h1 style="font-size: 20px;">${escapeHtml(subject)}</h1>
  ${entries.map((entry) => `<article style="margin: 0 0 24px;">
    <h2 style="font-size: 17px; margin: 0 0 6px;"><a href="${escapeAttribute(entry.link)}">${escapeHtml(entry.title)}</a></h2>
    <p style="margin: 0 0 8px;">${escapeHtml(entry.summary)}</p>
    <p style="margin: 0;"><a href="${escapeAttribute(entry.link)}">${escapeHtml(entry.link)}</a></p>
  </article>`).join("\n")}
  <p style="margin-top: 28px;">Updates feed: <a href="${escapeAttribute(feedUrl)}">${escapeHtml(feedUrl)}</a></p>
  <p>Unsubscribe: <a href="${escapeAttribute(unsubscribeUrl)}">${escapeHtml(unsubscribeUrl)}</a></p>
</main>`;
}

function parseAtomEntries(feed) {
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const updated = decodeXml(tag(entry, "updated"));
    return {
      id: decodeXml(tag(entry, "id")),
      title: decodeXml(tag(entry, "title")),
      summary: stripHtml(decodeXml(tag(entry, "summary"))),
      link: decodeXml((entry.match(/<link\s+href="([^"]+)"/) || [])[1] || ""),
      updated,
      updated_at: updated ? new Date(updated) : null,
    };
  }).filter((entry) => entry.title && entry.link);
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`));
  return match ? match[1].trim() : "";
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function decodeXml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

function normalizeEmail(value) {
  const raw = String(value || "").trim().toLowerCase();
  const match = raw.match(/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return match ? match[0] : "";
}

function normalizeTrailingNewline(value) {
  return value.replace(/\s+$/g, "") + "\n";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

async function writeOutput(path, body) {
  await mkdir(dirname(resolve(path)), { recursive: true });
  await writeFile(path, body, "utf8");
}

function required(value, name) {
  if (!value) throw new Error(`Missing required configuration: ${name}`);
  return value;
}

function bool(value, defaultValue = false) {
  if (value === undefined || value === null || value === "") return defaultValue;
  return /^(1|true|yes|on)$/i.test(String(value));
}

function config(argName, envName, fallback) {
  return args[argName] ?? process.env[envName] ?? fallback;
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
