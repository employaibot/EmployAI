# Slack /create Slash Command — Design Spec

**Date:** 2026-03-27
**Status:** Approved

## Overview

Add a `POST /slack/commands` route to `agent-listener/server.js` that handles Slack's `/create` slash command. The command creates a Trello card in the Backlog list. The integration is self-contained — it does not touch the existing `/run-agent` route or global middleware.

## Architecture

All new code lives in `agent-listener/server.js`. No new files, no new npm packages.

### Middleware chain for `/slack/commands` (applied in order)

1. **`express.raw({ type: 'application/x-www-form-urlencoded' })`** — route-level only. Captures the raw request body as a `Buffer` before any parsing. Required by Slack's signature scheme.
2. **Slack signature verifier** — inline function, runs before the route handler:
   - Reads `x-slack-request-timestamp` header; rejects with HTTP 400 if the timestamp is more than 5 minutes old (replay attack protection)
   - Constructs the signing basestring: `v0:<timestamp>:<raw_body_string>`
   - Computes `HMAC-SHA256(SLACK_SIGNING_SECRET, basestring)`, prefixed with `v0=`
   - Compares against `x-slack-signature` using `crypto.timingSafeEqual`; rejects with HTTP 400 if mismatch
3. **Body parser** — parses the raw buffer via `new URLSearchParams(req.body.toString())` into a plain object, attached to `req.slackBody`
4. **Allowlist check** — reads `SLACK_ALLOWED_USERS` (comma-separated user IDs from `.env`); if `user_id` not in list, returns HTTP 200 `{ text: "Not authorized." }` (user-facing response, must be 200)

### Route handler: `POST /slack/commands`

- Reads `command` and `text` from `req.slackBody`
- If `command !== '/create'` or `text` is empty/whitespace: returns HTTP 200 `{ text: "Usage: /create <task title>" }`
- Makes a synchronous `fetch` call to `POST https://api.trello.com/1/cards` with query params:
  - `key=TRELLO_KEY`
  - `token=TRELLO_TOKEN`
  - `idList=TRELLO_BACKLOG_LIST_ID`
  - `name=<text>`
- On success (Trello 200): returns HTTP 200 `{ text: "Created card: <title>" }`
- On failure (non-200 from Trello, network error): returns HTTP 200 `{ text: "Failed to create card." }` and logs the error

### HTTP status semantics

| Scenario | Status | Body |
|---|---|---|
| Invalid/replayed Slack signature | 400 | (empty) |
| User not in allowlist | 200 | `{ text: "Not authorized." }` |
| Missing/empty text | 200 | `{ text: "Usage: /create <task title>" }` |
| Trello call succeeds | 200 | `{ text: "Created card: <title>" }` |
| Trello call fails | 200 | `{ text: "Failed to create card." }` |

400 is intentional for auth failures — it signals a misconfigured or spoofed caller, not a Slack user error.

## Environment Variables

Add to `.env`:

```
SLACK_SIGNING_SECRET=
SLACK_ALLOWED_USERS=U012AB3CD,U098ZYX76
TRELLO_KEY=
TRELLO_TOKEN=
TRELLO_BACKLOG_LIST_ID=
```

## What Does Not Change

- `express.json()` global middleware — untouched
- `POST /run-agent` route — untouched
- All existing agent spawn logic — untouched

## Slack App Setup (post-implementation)

1. Go to api.slack.com/apps → Create New App → From scratch
2. Name it (e.g. "EmployAI"), select your workspace
3. **Slash Commands** → Create New Command: `/create`, Request URL: `https://<ngrok-url>/slack/commands`, Short description: "Create a Trello card in Backlog"
4. **Basic Information** → App Credentials → copy **Signing Secret** → set as `SLACK_SIGNING_SECRET` in `.env`
5. Install App to Workspace
6. To get your Slack user ID: click your name in Slack → Profile → three-dot menu → Copy member ID → add to `SLACK_ALLOWED_USERS` in `.env`
