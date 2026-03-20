# Orchestrator Setup — Trello

Complete these steps manually before running the orchestrator webhook.

## Trello Setup Steps

**a.** Go to https://trello.com and create a new board called **EmployAI**

**b.** Create these lists in this exact order:
1. Backlog
2. Ready
3. In Progress
4. In Review
5. Done

**c.** Go to https://trello.com/app-key to get your **API Key**

**d.** On that same page, click **"Token"** to generate a **Token**

**e.** Note down the following — you will need them for your `.env.local`:

| Variable | Where to find it |
|---|---|
| `TRELLO_API_KEY` | https://trello.com/app-key |
| `TRELLO_TOKEN` | Click "Token" on the app-key page |
| `TRELLO_BOARD_ID` | Found in the board URL: `trello.com/b/BOARD_ID/employai` |
| `TRELLO_WEBHOOK_SECRET` | Choose any strong random string — used to verify webhook payloads |

## After Collecting Credentials

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

Then register the webhook with Trello:

```bash
curl -X POST "https://api.trello.com/1/webhooks" \
  -d "key=YOUR_TRELLO_API_KEY" \
  -d "token=YOUR_TRELLO_TOKEN" \
  -d "callbackURL=https://YOUR_DOMAIN/api/trello-webhook" \
  -d "idModel=YOUR_TRELLO_BOARD_ID" \
  -d "description=EmployAI orchestrator webhook"
```
