const DEFAULT_ORIGIN = "https://trotsky1997.github.io";

const CACHE_POLICIES = {
  bypass: {
    name: "bypass",
    edgeTtl: 0,
    cacheEverything: false,
    cacheControl: "no-store, must-revalidate",
    cdnCacheControl: "no-store"
  },
  feed: {
    name: "feed",
    edgeTtl: 60,
    cacheEverything: true,
    cacheControl: "public, max-age=60, must-revalidate",
    cdnCacheControl: "public, max-age=60"
  },
  html: {
    name: "html",
    edgeTtl: 300,
    cacheEverything: true,
    cacheControl: "public, max-age=0, must-revalidate",
    cdnCacheControl: "public, max-age=300"
  },
  static: {
    name: "static",
    edgeTtl: 2592000,
    cacheEverything: true,
    cacheControl: "public, max-age=604800, stale-while-revalidate=86400",
    cdnCacheControl: "public, max-age=2592000"
  },
  immutable: {
    name: "immutable",
    edgeTtl: 31536000,
    cacheEverything: true,
    cacheControl: "public, max-age=31536000, immutable",
    cdnCacheControl: "public, max-age=31536000"
  },
  file: {
    name: "file",
    edgeTtl: 86400,
    cacheEverything: true,
    cacheControl: "public, max-age=3600, stale-while-revalidate=86400",
    cdnCacheControl: "public, max-age=86400"
  }
};

const FEED_PATHS = new Set([
  "/updates.xml",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt"
]);

const BYPASS_PATHS = new Set([
  "/service-worker.js"
]);

const STATIC_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".webmanifest",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".ico",
  ".svg"
]);

const IMMUTABLE_ASSET_PREFIXES = [
  "/assets/fonts/",
  "/assets/vendor/"
];

const FONT_EXTENSIONS = new Set([
  ".woff2",
  ".woff",
  ".ttf",
  ".eot",
  ".otf"
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/.cdn-status") {
      return json({
        ok: true,
        origin: getOrigin(env).origin,
        policies: Object.fromEntries(Object.entries(CACHE_POLICIES).map(([key, value]) => [key, value.edgeTtl]))
      });
    }

    const originUrl = buildOriginUrl(request.url, env);
    const policy = classifyRequest(url, request.method);
    const originRequest = new Request(originUrl, request);

    const fetchOptions = policy.cacheEverything
      ? { cf: { cacheEverything: true, cacheTtl: policy.edgeTtl } }
      : { cf: { cacheEverything: false, cacheTtl: 0 } };

    const originResponse = await fetch(originRequest, fetchOptions);
    return withCacheHeaders(originResponse, policy);
  }
};

export function classifyRequest(urlLike, method = "GET") {
  const url = urlLike instanceof URL ? urlLike : new URL(urlLike);
  const methodUpper = method.toUpperCase();

  if (methodUpper !== "GET" && methodUpper !== "HEAD") return CACHE_POLICIES.bypass;
  if (BYPASS_PATHS.has(url.pathname)) return CACHE_POLICIES.bypass;
  if (FEED_PATHS.has(url.pathname) || url.pathname.startsWith("/google-scholar-stats/")) {
    return CACHE_POLICIES.feed;
  }
  if (url.searchParams.has("v")) return CACHE_POLICIES.immutable;
  if (IMMUTABLE_ASSET_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return CACHE_POLICIES.immutable;
  }

  const extension = getExtension(url.pathname);
  if (FONT_EXTENSIONS.has(extension)) return CACHE_POLICIES.immutable;
  if (url.pathname.startsWith("/files/")) return CACHE_POLICIES.file;
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/images/") || STATIC_EXTENSIONS.has(extension)) {
    return CACHE_POLICIES.static;
  }

  return CACHE_POLICIES.html;
}

export function buildOriginUrl(requestUrl, env = {}) {
  const origin = getOrigin(env);
  const url = new URL(requestUrl);
  url.protocol = origin.protocol;
  url.hostname = origin.hostname;
  url.port = origin.port;
  return url;
}

function getOrigin(env = {}) {
  return new URL(env.ORIGIN || DEFAULT_ORIGIN);
}

function withCacheHeaders(originResponse, policy) {
  const headers = new Headers(originResponse.headers);
  headers.set("Cache-Control", policy.cacheControl);
  headers.set("CDN-Cache-Control", policy.cdnCacheControl);
  headers.set("X-DZ-Cache-Policy", policy.name);
  headers.set("X-Content-Type-Options", "nosniff");

  return new Response(originResponse.body, {
    status: originResponse.status,
    statusText: originResponse.statusText,
    headers
  });
}

function getExtension(pathname) {
  const lastSegment = pathname.split("/").pop() || "";
  const dotIndex = lastSegment.lastIndexOf(".");
  return dotIndex === -1 ? "" : lastSegment.slice(dotIndex).toLowerCase();
}

function json(data) {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
