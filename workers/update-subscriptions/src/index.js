const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env, request) });
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({ ok: true, mode: "free-subscription-registry", sending: "github-actions-smtp" }, env, 200, request);
    }

    if (url.pathname === "/subscribe" && request.method === "POST") {
      return handleWebSubscribe(request, env, url);
    }

    if (url.pathname === "/confirm" && request.method === "GET") {
      return handleConfirm(url, env);
    }

    if (url.pathname === "/unsubscribe" && request.method === "GET") {
      return handleUnsubscribe(url, env);
    }

    if (url.pathname === "/admin/subscribers.csv" && request.method === "GET") {
      const unauthorized = requireAdmin(url, env);
      if (unauthorized) return unauthorized;
      return handleSubscribersCsv(request, env);
    }

    if (url.pathname === "/admin/subscribers.json" && request.method === "GET") {
      const unauthorized = requireAdmin(url, env);
      if (unauthorized) return unauthorized;
      return handleSubscribersJson(request, env);
    }

    if (url.pathname === "/admin/digest" && request.method === "GET") {
      const unauthorized = requireAdmin(url, env);
      if (unauthorized) return unauthorized;
      return handleDigest(url, env);
    }

    if (url.pathname === "/admin/status" && request.method === "GET") {
      const unauthorized = requireAdmin(url, env);
      if (unauthorized) return unauthorized;
      return handleStatus(env);
    }

    return json({ error: "not_found" }, env, 404, request);
  },

  async email(message, env) {
    const from = normalizeEmail(message.from);
    const subject = message.headers.get("subject") || "";
    const messageId = message.headers.get("message-id") || "";
    const now = new Date().toISOString();

    if (!from) {
      message.setReject("Missing sender address");
      return;
    }

    const intent = parseIntent(subject);
    if (intent === "unsubscribe") {
      await upsertSubscriber(env, {
        email: from,
        status: "unsubscribed",
        source: "email-routing",
        now,
        messageId,
      });
      await recordEvent(env, from, "unsubscribe_email", subject, messageId, now);
      return;
    }

    await upsertSubscriber(env, {
      email: from,
      status: "confirmed",
      source: "email-routing",
      now,
      messageId,
    });
    await recordEvent(env, from, "subscribe_email", subject, messageId, now);
  },
};

async function handleWebSubscribe(request, env, url) {
  const email = normalizeEmail(await readEmail(request));
  if (!email) return json({ error: "invalid_email" }, env, 400);

  const now = new Date().toISOString();
  await upsertSubscriber(env, {
    email,
    status: "confirmed",
    source: "web-form",
    now,
    messageId: "",
  });
  await recordEvent(env, email, "subscribe_web", "web subscribe", "", now);

  const unsubscribeUrl = await signedUrl(url, env, "/unsubscribe", email);
  return json({
    ok: true,
    status: "confirmed",
    unsubscribe_url: unsubscribeUrl,
  }, env, 200, request);
}

async function handleConfirm(url, env) {
  const email = normalizeEmail(url.searchParams.get("email") || "");
  await verifySignedEmail(url, env, email);

  const now = new Date().toISOString();
  await upsertSubscriber(env, {
    email,
    status: "confirmed",
    source: "web-local",
    now,
    messageId: "",
  });
  await recordEvent(env, email, "confirm_web", "web confirm", "", now);

  return html("Subscription confirmed", "This email is now confirmed for publication and blog updates.");
}

async function handleUnsubscribe(url, env) {
  const email = normalizeEmail(url.searchParams.get("email") || "");
  await verifySignedEmail(url, env, email);

  const now = new Date().toISOString();
  await upsertSubscriber(env, {
    email,
    status: "unsubscribed",
    source: "web-local",
    now,
    messageId: "",
  });
  await recordEvent(env, email, "unsubscribe_web", "web unsubscribe", "", now);

  return html("Unsubscribed", "This email has been removed from publication and blog update mailings.");
}

async function handleSubscribersCsv(request, env) {
  const subscribers = await getConfirmedSubscribers(request, env);
  const lines = ["email,status,source,confirmed_at,updated_at,unsubscribe_url"];
  for (const row of subscribers) {
    lines.push([
      csv(row.email),
      csv(row.status),
      csv(row.source),
      csv(row.confirmed_at || ""),
      csv(row.updated_at || ""),
      csv(row.unsubscribe_url),
    ].join(","));
  }

  return new Response(lines.join("\n"), {
    headers: {
      ...TEXT_HEADERS,
      "Content-Disposition": "attachment; filename=update-subscribers.csv",
    },
  });
}

async function handleSubscribersJson(request, env) {
  return json({ subscribers: await getConfirmedSubscribers(request, env) }, env, 200, request);
}

async function getConfirmedSubscribers(request, env) {
  const rows = await env.DB.prepare(
    "SELECT email, status, source, confirmed_at, updated_at FROM subscribers WHERE status = 'confirmed' ORDER BY email",
  ).all();

  const origin = new URL(request.url).origin;
  const base = new URL(origin);
  const subscribers = [];
  for (const row of rows.results || []) {
    subscribers.push({
      email: row.email,
      status: row.status,
      source: row.source,
      confirmed_at: row.confirmed_at || "",
      updated_at: row.updated_at || "",
      unsubscribe_url: await signedUrl(base, env, "/unsubscribe", row.email),
    });
  }
  return subscribers;
}

async function handleDigest(url, env) {
  const limit = clamp(parseInt(url.searchParams.get("limit") || "5", 10), 1, 20);
  const feedUrl = env.UPDATE_FEED_URL || "https://trotsky1997.github.io/updates.xml";
  const response = await fetch(feedUrl);
  if (!response.ok) {
    return text(`Failed to fetch updates feed: ${response.status}`, 502);
  }

  const feed = await response.text();
  const entries = parseAtomEntries(feed).slice(0, limit);
  const subject = env.DIGEST_SUBJECT || "Di Zhang publication and blog updates";
  const body = [
    subject,
    "",
    ...entries.flatMap((entry) => [
      `${entry.title}`,
      `${entry.link}`,
      `${entry.summary}`,
      "",
    ]),
    "Unsubscribe: reply with subject unsubscribe, or use the unsubscribe URL in your subscription record.",
  ].join("\n");

  return text(body);
}

async function handleStatus(env) {
  const rows = await env.DB.prepare(
    "SELECT status, COUNT(*) AS count FROM subscribers GROUP BY status ORDER BY status",
  ).all();
  return json({ subscribers: rows.results || [] }, env);
}

async function upsertSubscriber(env, entry) {
  const confirmedAt = entry.status === "confirmed" ? entry.now : null;
  const unsubscribedAt = entry.status === "unsubscribed" ? entry.now : null;

  await env.DB.prepare(
    `INSERT INTO subscribers
      (email, status, source, created_at, updated_at, confirmed_at, unsubscribed_at, last_message_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
      status = excluded.status,
      source = excluded.source,
      updated_at = excluded.updated_at,
      confirmed_at = COALESCE(excluded.confirmed_at, subscribers.confirmed_at),
      unsubscribed_at = COALESCE(excluded.unsubscribed_at, subscribers.unsubscribed_at),
      last_message_id = excluded.last_message_id`,
  ).bind(
    entry.email,
    entry.status,
    entry.source,
    entry.now,
    entry.now,
    confirmedAt,
    unsubscribedAt,
    entry.messageId,
  ).run();
}

async function recordEvent(env, email, eventType, subject, messageId, now) {
  await env.DB.prepare(
    `INSERT INTO email_events (email, event_type, subject, message_id, created_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).bind(email, eventType, subject, messageId, now).run();
}

async function readEmail(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    return body.email || "";
  }
  const form = await request.formData();
  return form.get("email") || "";
}

function parseIntent(subject) {
  return subject.toLowerCase().includes("unsubscribe") ? "unsubscribe" : "subscribe";
}

function normalizeEmail(value) {
  const raw = String(value || "").trim().toLowerCase();
  const match = raw.match(/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return match ? match[0] : "";
}

function requireAdmin(url, env) {
  const expected = env.ADMIN_TOKEN || "";
  const actual = url.searchParams.get("token") || "";
  if (!expected || actual !== expected) {
    return new Response("unauthorized", { status: 401, headers: TEXT_HEADERS });
  }
  return null;
}

async function signedUrl(url, env, path, email) {
  const base = env.PUBLIC_WORKER_URL || `${url.protocol}//${url.host}`;
  const target = new URL(path, base);
  target.searchParams.set("email", email);
  target.searchParams.set("sig", await signEmail(email, env));
  return target.toString();
}

async function verifySignedEmail(url, env, email) {
  if (!email) throw new Response("invalid email", { status: 400, headers: TEXT_HEADERS });
  const expected = await signEmail(email, env);
  const actual = url.searchParams.get("sig") || "";
  if (!actual || actual !== expected) {
    throw new Response("invalid signature", { status: 403, headers: TEXT_HEADERS });
  }
}

async function signEmail(email, env) {
  const secret = env.TOKEN_SECRET || "dev-only-change-me";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const bytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(email));
  return base64url(bytes);
}

function base64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function parseAtomEntries(feed) {
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const title = tag(entry, "title");
    const summary = tag(entry, "summary").replace(/<[^>]+>/g, "");
    const link = (entry.match(/<link\s+href="([^"]+)"/) || [])[1] || "";
    return {
      title: decodeXml(title),
      summary: decodeXml(summary),
      link: decodeXml(link),
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

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function csv(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function json(body, env, status = 200, request) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(env, request) },
  });
}

function text(body, status = 200) {
  return new Response(body, { status, headers: TEXT_HEADERS });
}

function html(title, body) {
  return new Response(`<!doctype html>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<main style="font-family: system-ui, sans-serif; max-width: 42rem; margin: 4rem auto; line-height: 1.6;">
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(body)}</p>
</main>`, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function corsHeaders(env, request) {
  const requestOrigin = request?.headers.get("Origin") || "";
  const configured = String(env.SITE_ORIGINS || env.SITE_ORIGIN || "https://trotsky1997.github.io")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const localOrigin = /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(requestOrigin);
  const origin = requestOrigin && (configured.includes(requestOrigin) || localOrigin)
    ? requestOrigin
    : configured[0];
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
