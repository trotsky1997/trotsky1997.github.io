# Update Subscriptions with Cloudflare and GitHub Actions

This document defines the live email subscription path for publication and blog updates. The site publishes one canonical update source at `/updates.xml`; Cloudflare Worker/D1 stores subscription state; GitHub Actions sends scheduled digest email through configured SMTP credentials.

## Architecture

```text
reader enters email on /subscribe/
        |
        v
Cloudflare Worker POST /subscribe
        |
        v
D1 confirmed subscribers
        |
        v
GitHub Actions weekly sender
        |
        v
SMTP provider sends one digest email per subscriber
```

Cloudflare Email Sending is not used. Cloudflare's current pricing makes Email Routing available on Workers Free, but outbound Email Sending is only available on Workers Paid. This keeps Cloudflare itself on the no-charge path while still delivering real email through an existing/free SMTP account.

## Sources

- Site source: `_data/updates.yml`
- Public timeline: `/updates/`
- Public feed: `/updates.xml`
- Public subscribe page: `/subscribe/`
- Deployed Worker: `https://dz-update-subscriptions.qq893371906.workers.dev`
- Email Routing address: `updates@chemllm.org`
- Worker implementation: `workers/update-subscriptions/`
- Sender script: `workers/update-subscriptions/scripts/send-digest.mjs`
- GitHub Actions workflow: `.github/workflows/update-digest.yml`
- Cloudflare references:
  - [Building a CLI for all of Cloudflare](https://blog.cloudflare.com/cf-cli-local-explorer/)
  - [Local Explorer](https://developers.cloudflare.com/workers/development-testing/local-explorer/)
  - [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
  - [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
  - [D1 local development](https://developers.cloudflare.com/d1/build-with-d1/local-development/)
  - [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
  - [Email Routing overview](https://developers.cloudflare.com/email-routing/)
  - [Email Routing Worker API](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/)
  - [Email Routing local development](https://developers.cloudflare.com/email-service/local-development/routing/)

## Worker Boundaries

- `POST /subscribe`
  - Web subscription endpoint used by `/subscribe/`.
  - Stores a confirmed subscriber immediately and returns a personalized unsubscribe URL.
- `email(message, env, ctx)`
  - Handles inbound Email Routing messages.
  - Subject containing `unsubscribe` marks the sender unsubscribed.
  - Other subjects mark the sender confirmed.
- `GET /unsubscribe?email=...&sig=...`
  - Marks a subscriber unsubscribed.
- `GET /admin/subscribers.json?token=...`
  - Returns confirmed subscribers with per-recipient unsubscribe URLs for the sender workflow.
- `GET /admin/subscribers.csv?token=...`
  - Exports confirmed subscribers for audit/debug use.
- `GET /admin/digest?token=...`
  - Fetches `/updates.xml` and returns a plain-text digest.
- `GET /admin/status?token=...`
  - Returns subscriber counts by status.

## GitHub Actions Email Sender

`.github/workflows/update-digest.yml` runs every Monday at 02:17 UTC and can also be triggered manually.

The workflow:

- Installs the sender dependencies with `npm ci`.
- Fetches confirmed subscribers from `/admin/subscribers.json`.
- Fetches publication and blog entries from `/updates.xml`.
- Selects entries updated within the last 8 days by default.
- Sends one email per subscriber through SMTP.
- Adds the subscriber-specific unsubscribe URL to the email body and `List-Unsubscribe` header.
- Uploads `dist/update-digest.txt` and `dist/update-digest-report.json` as audit artifacts.
- Does not run Wrangler and does not deploy or create Cloudflare resources.

Manual dispatch supports:

- `dry_run=true` to build the digest and recipient report without sending email.
- `force_send=true` to send the latest entries even outside the default update window.
- `limit` to cap feed entries.
- `window_days` to change the update window.

## Required GitHub Secrets

These secrets are required for real automatic delivery:

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

Typical SMTP settings:

```text
UPDATE_SMTP_PORT=587
UPDATE_SMTP_SECURE=false
```

Use port `465` with `UPDATE_SMTP_SECURE=true` only when the provider requires implicit TLS.

If there are updates and confirmed subscribers but SMTP settings are missing, the workflow fails instead of pretending delivery happened.

## Local Development

Local development can use Wrangler and a local D1 preview database:

```powershell
Copy-Item workers/update-subscriptions/wrangler.example.toml workers/update-subscriptions/wrangler.toml
npx wrangler d1 migrations apply dz-update-subscriptions --local --config workers/update-subscriptions/wrangler.toml
npx wrangler dev --config workers/update-subscriptions/wrangler.toml
```

Simulate inbound Email Routing locally:

```powershell
curl.exe --request POST "http://127.0.0.1:8787/cdn-cgi/handler/email?from=reader@example.com&to=updates@example.com" --data-raw "From: reader@example.com`nTo: updates@example.com`nMessage-ID: <local-test-1@example.com>`nSubject: subscribe`n`nsubscribe"
```

Run a dry-run sender pass:

```powershell
node workers/update-subscriptions/scripts/send-digest.mjs --feed http://127.0.0.1:4000/updates.xml --worker-url http://127.0.0.1:8787 --admin-token dev-admin-token --dry-run true --force-send true
```

Run a real SMTP send locally:

```powershell
$env:UPDATE_SMTP_HOST="smtp.example.com"
$env:UPDATE_SMTP_PORT="587"
$env:UPDATE_SMTP_USER="user@example.com"
$env:UPDATE_SMTP_PASS="<app-password>"
$env:UPDATE_SMTP_SECURE="false"
$env:UPDATE_MAIL_FROM="Di Zhang Updates <updates@chemllm.org>"
node workers/update-subscriptions/scripts/send-digest.mjs --feed http://127.0.0.1:4000/updates.xml --worker-url http://127.0.0.1:8787 --admin-token dev-admin-token --force-send true
```

## Current Deployment

- Worker URL: `https://dz-update-subscriptions.qq893371906.workers.dev`
- Email Routing domain: `chemllm.org`
- Email Routing rule: `updates@chemllm.org` -> Worker `dz-update-subscriptions`
- Email Routing rule ID: `16d778455c4348818a9a31966383dbf9`
- D1 database: `dz-update-subscriptions`
- D1 database ID: `3e4dcb48-62a0-4e52-a8c7-6811c04b1747`
- Stored local deployment secrets: `workers/update-subscriptions/.deployed.env`

The local deployment secret file is ignored by Git.
