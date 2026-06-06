# Update Subscriptions Worker

This Worker stores subscriber state for the site's publication and blog update emails.

It deliberately does not use Cloudflare Email Sending or Queues. Cloudflare's official pricing currently makes outbound Email Sending available only on Workers Paid, so real automatic delivery is handled by GitHub Actions through configured SMTP credentials.

Current deployment:

```text
https://dz-update-subscriptions.qq893371906.workers.dev
updates@chemllm.org -> dz-update-subscriptions
```

## What It Does

- Accepts web subscribe requests at `/subscribe` and records confirmed subscribers.
- Receives inbound Email Routing messages through `email(message, env, ctx)`.
- Treats a subject containing `unsubscribe` as an unsubscribe request.
- Treats other inbound messages as a subscribe request.
- Stores subscriber state in D1.
- Exposes admin-only JSON export at `/admin/subscribers.json?token=...`.
- Exposes admin-only CSV export at `/admin/subscribers.csv?token=...`.
- Exposes admin-only digest generation at `/admin/digest?token=...`.

## Sender

`scripts/send-digest.mjs` sends real digest email through SMTP.

Required configuration:

```text
UPDATE_SUBSCRIPTIONS_WORKER_URL
UPDATE_SUBSCRIPTIONS_ADMIN_TOKEN
UPDATE_SMTP_HOST
UPDATE_SMTP_PORT
UPDATE_SMTP_USER
UPDATE_SMTP_PASS
UPDATE_SMTP_SECURE
UPDATE_MAIL_FROM
```

Optional:

```text
UPDATE_MAIL_REPLY_TO
```

Run a dry-run pass:

```powershell
node workers/update-subscriptions/scripts/send-digest.mjs --feed http://127.0.0.1:4000/updates.xml --worker-url http://127.0.0.1:8787 --admin-token dev-admin-token --dry-run true --force-send true
```

Run a real SMTP pass:

```powershell
$env:UPDATE_SMTP_HOST="smtp.example.com"
$env:UPDATE_SMTP_PORT="587"
$env:UPDATE_SMTP_USER="user@example.com"
$env:UPDATE_SMTP_PASS="<app-password>"
$env:UPDATE_SMTP_SECURE="false"
$env:UPDATE_MAIL_FROM="Di Zhang Updates <updates@chemllm.org>"
node workers/update-subscriptions/scripts/send-digest.mjs --feed http://127.0.0.1:4000/updates.xml --worker-url http://127.0.0.1:8787 --admin-token dev-admin-token --force-send true
```

## Local-Only Setup

Copy the example config locally:

```powershell
Copy-Item workers/update-subscriptions/wrangler.example.toml workers/update-subscriptions/wrangler.toml
```

Apply the D1 migration locally:

```powershell
npx wrangler d1 migrations apply dz-update-subscriptions --local --config workers/update-subscriptions/wrangler.toml
```

Start local Worker development:

```powershell
npx wrangler dev --config workers/update-subscriptions/wrangler.toml
```

Simulate an inbound subscription email locally:

```powershell
curl.exe --request POST "http://127.0.0.1:8787/cdn-cgi/handler/email?from=reader@example.com&to=updates@example.com" --data-raw "From: reader@example.com`nTo: updates@example.com`nMessage-ID: <local-test-1@example.com>`nSubject: subscribe`n`nsubscribe"
```

Export confirmed subscribers:

```powershell
curl.exe "http://127.0.0.1:8787/admin/subscribers.json?token=dev-admin-token"
curl.exe "http://127.0.0.1:8787/admin/subscribers.csv?token=dev-admin-token"
```

Generate a digest from the Worker:

```powershell
curl.exe "http://127.0.0.1:8787/admin/digest?token=dev-admin-token"
```

## GitHub Actions

`.github/workflows/update-digest.yml` runs weekly and can also be triggered manually. It sends digest email through SMTP, one message per confirmed subscriber, and uploads audit artifacts.

The workflow never deploys Cloudflare resources and never calls Cloudflare Email Sending. If SMTP secrets are absent when there is work to send, the workflow fails instead of reporting a fake success.

## Production Boundary

The production path requires Cloudflare DNS and Email Routing configured manually in the dashboard:

- route a custom address such as `updates@example.com` to this Worker;
- create a D1 database and bind it as `DB`;
- store `ADMIN_TOKEN` and `TOKEN_SECRET` as Worker secrets;
- store the SMTP and Worker admin values as GitHub Actions repository secrets.
