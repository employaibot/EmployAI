# Slack /create Slash Command — Design Spec

**Date:** 2026-03-27
**Status:** Approved

## Overview

Add a `POST /slack/commands` route to `agent-listener/server.js` that handles Slack's `/create` slash command. The command uses the `claude` CLI to transform raw user input into a structured ticket, then creates a Trello card in the Backlog list. The integration is self-contained — it does not touch the existing `/run-agent` route or global middleware.

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

1. Reads `command` and `text` from `req.slackBody`
2. If `command !== '/create'` or `text` is empty/whitespace: returns HTTP 200 `{ text: "Usage: /create <task title>" }`
3. **Claude CLI ticket formatting (with fallthrough):**
   - Constructs a prompt asking Claude to return only a JSON object `{ title: string, description: string }` from the raw text
   - Calls `spawnSync('claude', ['-p', '-'], { input: prompt, encoding: 'utf8', timeout: 2500, shell: true })`
   - The prompt is passed via **stdin** — never shell-interpolated — eliminating command injection risk
   - On success: parses `result.stdout.trim()` as JSON; uses `parsed.title` as card name, `parsed.description` as card desc
   - On any failure (spawnSync throws, non-zero exit, `JSON.parse` throws): falls through to raw text as card name, no description. Card creation is never blocked.
4. **Trello card creation** via native `fetch`:
   - `POST https://api.trello.com/1/cards` with query params `key`, `token`, `idList`, `name`, and optionally `desc`
   - On Trello success: returns HTTP 200 `{ text: "Created card: <title>\n<description>" }` (title/description from Claude if available, otherwise just the raw title)
   - On Trello failure (non-200 or network error): returns HTTP 200 `{ text: "Failed to create card." }` and logs the error

### Import changes

Add `spawnSync` to the existing `child_process` import:
```js
import { spawn, spawnSync } from 'child_process';
```

### HTTP status semantics

| Scenario | Status | Body |
|---|---|---|
| Invalid/replayed Slack signature | 400 | (empty) |
| User not in allowlist | 200 | `{ text: "Not authorized." }` |
| Missing/empty text | 200 | `{ text: "Usage: /create <task title>" }` |
| Claude fails, Trello succeeds | 200 | `{ text: "Created card: <raw title>" }` |
| Claude succeeds, Trello succeeds | 200 | `{ text: "Created card: <title>\n<description>" }` |
| Trello fails | 200 | `{ text: "Failed to create card." }` |

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

## Security Notes

- Slack signature verification uses `crypto.timingSafeEqual` to prevent timing attacks
- Claude prompt is passed via stdin to `spawnSync`, never interpolated into a shell command string — immune to command injection regardless of user input content
- Allowlist is the only user-facing authorization gate; all other checks return HTTP 400

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
