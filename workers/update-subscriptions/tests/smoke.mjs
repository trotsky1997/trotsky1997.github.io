import worker from "../src/index.js";

class Statement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async run() {
    if (this.sql.includes("INSERT INTO subscribers")) {
      const [email, status, source, createdAt, updatedAt, confirmedAt, unsubscribedAt, messageId] = this.values;
      const existing = this.db.subscribers.get(email) || { created_at: createdAt };
      this.db.subscribers.set(email, {
        email,
        status,
        source,
        created_at: existing.created_at,
        updated_at: updatedAt,
        confirmed_at: confirmedAt || existing.confirmed_at || null,
        unsubscribed_at: unsubscribedAt || existing.unsubscribed_at || null,
        last_message_id: messageId,
      });
      return { success: true };
    }

    if (this.sql.includes("INSERT INTO email_events")) {
      const [email, eventType, subject, messageId, createdAt] = this.values;
      this.db.events.push({ email, eventType, subject, messageId, createdAt });
      return { success: true };
    }

    throw new Error(`Unhandled run SQL: ${this.sql}`);
  }

  async all() {
    if (this.sql.includes("FROM subscribers WHERE status = 'confirmed'")) {
      return {
        results: [...this.db.subscribers.values()]
          .filter((row) => row.status === "confirmed")
          .sort((a, b) => a.email.localeCompare(b.email)),
      };
    }

    if (this.sql.includes("GROUP BY status")) {
      const counts = new Map();
      for (const row of this.db.subscribers.values()) {
        counts.set(row.status, (counts.get(row.status) || 0) + 1);
      }
      return { results: [...counts.entries()].map(([status, count]) => ({ status, count })) };
    }

    throw new Error(`Unhandled all SQL: ${this.sql}`);
  }
}

class MockDB {
  constructor() {
    this.subscribers = new Map();
    this.events = [];
  }

  prepare(sql) {
    return new Statement(this, sql);
  }
}

function env() {
  return {
    DB: new MockDB(),
    ADMIN_TOKEN: "test-token",
    TOKEN_SECRET: "test-secret",
    PUBLIC_WORKER_URL: "http://worker.test",
    SITE_ORIGIN: "https://trotsky1997.github.io",
    UPDATE_FEED_URL: "data:text/xml," + encodeURIComponent(`<feed xmlns="http://www.w3.org/2005/Atom">
      <entry><title>Agent-Own Loop Harness</title><link href="https://example.com/post" /><summary>Blog update</summary></entry>
    </feed>`),
  };
}

function emailMessage(from, subject) {
  return {
    from,
    to: "updates@example.com",
    headers: new Headers({
      subject,
      "message-id": "<test@example.com>",
    }),
    setReject(reason) {
      throw new Error(`Rejected: ${reason}`);
    },
  };
}

const e = env();

const webSubscribe = await worker.fetch(new Request("http://worker.test/subscribe", {
  method: "POST",
  body: new URLSearchParams({ email: "web@example.com" }),
}), e);
const webPayload = await webSubscribe.json();
if (webPayload.status !== "confirmed" || !webPayload.unsubscribe_url) {
  throw new Error("web subscribe did not immediately confirm subscriber");
}

const strictMissingSecret = env();
strictMissingSecret.TURNSTILE_REQUIRED = "true";
const strictResponse = await worker.fetch(new Request("http://worker.test/subscribe", {
  method: "POST",
  body: new URLSearchParams({ email: "strict@example.com" }),
}), strictMissingSecret);
if (strictResponse.status !== 503) {
  throw new Error("turnstile-required subscribe without secret should fail closed");
}

const originalFetch = globalThis.fetch;
let verifiedToken = "";
globalThis.fetch = async (url, init) => {
  if (String(url) === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
    const body = JSON.parse(init.body);
    verifiedToken = body.response;
    return new Response(JSON.stringify({
      success: body.response === "valid-turnstile-token" || body.response === "wrong-action-token",
      action: body.response === "wrong-action-token" ? "other-action" : "update-subscribe",
      hostname: "trotsky1997.github.io",
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return originalFetch(url, init);
};

try {
  const protectedEnv = env();
  protectedEnv.TURNSTILE_SECRET_KEY = "test-secret";
  protectedEnv.TURNSTILE_REQUIRED = "true";
  const protectedSubscribe = await worker.fetch(new Request("http://worker.test/subscribe", {
    method: "POST",
    body: new URLSearchParams({
      email: "protected@example.com",
      "cf-turnstile-response": "valid-turnstile-token",
    }),
  }), protectedEnv);
  const protectedPayload = await protectedSubscribe.json();
  if (protectedPayload.status !== "confirmed" || verifiedToken !== "valid-turnstile-token") {
    throw new Error("turnstile-protected subscribe did not validate token before confirming");
  }

  const wrongActionSubscribe = await worker.fetch(new Request("http://worker.test/subscribe", {
    method: "POST",
    body: new URLSearchParams({
      email: "wrong-action@example.com",
      "cf-turnstile-response": "wrong-action-token",
    }),
  }), protectedEnv);
  if (wrongActionSubscribe.status !== 403) {
    throw new Error("turnstile token with wrong action should be rejected");
  }
} finally {
  globalThis.fetch = originalFetch;
}

await worker.email(emailMessage("Reader <reader@example.com>", "subscribe"), e, {});
let status = await worker.fetch(new Request("http://worker.test/admin/status?token=test-token"), e);
let payload = await status.json();
const confirmed = payload.subscribers.find((row) => row.status === "confirmed");
if (!confirmed || confirmed.count !== 2) {
  throw new Error("subscribe email did not create confirmed subscriber");
}

const csv = await worker.fetch(new Request("http://worker.test/admin/subscribers.csv?token=test-token"), e);
const csvText = await csv.text();
if (!csvText.includes("reader@example.com") || !csvText.includes("/unsubscribe?")) {
  throw new Error("subscriber CSV missing subscriber or unsubscribe URL");
}

const subscriberJson = await worker.fetch(new Request("http://worker.test/admin/subscribers.json?token=test-token"), e);
const subscriberPayload = await subscriberJson.json();
if (subscriberPayload.subscribers.length !== 2 || !subscriberPayload.subscribers[0].unsubscribe_url) {
  throw new Error("subscriber JSON missing confirmed subscribers or unsubscribe URL");
}

const digest = await worker.fetch(new Request("http://worker.test/admin/digest?token=test-token"), e);
const digestText = await digest.text();
if (!digestText.includes("Agent-Own Loop Harness")) {
  throw new Error("digest missing feed entry");
}

await worker.email(emailMessage("reader@example.com", "unsubscribe"), e, {});
status = await worker.fetch(new Request("http://worker.test/admin/status?token=test-token"), e);
payload = await status.json();
const unsubscribed = payload.subscribers.find((row) => row.status === "unsubscribed");
if (!unsubscribed || unsubscribed.count !== 1) {
  throw new Error("unsubscribe email did not update status");
}

console.log("smoke ok");
