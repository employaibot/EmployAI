# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript strict check (tsc --noEmit)
```

Before committing, always run lint, type-check, and build — fix all errors before proceeding.

## Architecture

**EmployAI** is a Next.js 14 (App Router) marketing website for a done-for-you AI marketing service. It has two runtime components:

### 1. Next.js App (`/app`, `/components`)

- **`app/page.tsx`** — Home page (hero, services, CTA, footer)
- **`app/contact/page.tsx`** + **`components/ContactForm.tsx`** — Contact form with React Hook Form + Zod validation
- **`app/actions/contact.ts`** — Server action: validates env, sends email via Resend, submits lead to HubSpot (non-blocking failure)
- **`app/api/trello-webhook/route.ts`** — Trello webhook handler: verifies HMAC SHA1 signature, fires when a card moves to "Ready" list, extracts acceptance criteria from checklists, slugifies card title into branch ID, forwards task to agent-listener

### 2. Agent Listener (`/agent-listener/server.js`)

Express server (port 3001) that receives tasks from the Trello webhook, constructs a prompt (including rules from `.claude/agents/code-agent.md`), and spawns a `claude` CLI subprocess to autonomously implement the task.

### Task Orchestration Flow

```
Trello card moved to "Ready"
  → Trello webhook → /api/trello-webhook
  → POST agent-listener:3001/run-agent (validated by x-agent-secret)
  → Spawns: claude -p - --dangerously-skip-permissions (prompt via stdin)
  → Claude Code agent reads .claude/agents/code-agent.md rules
  → Creates feature branch, implements task, runs lint/type-check/build, opens draft PR
  → Human reviews draft PR, merges to main
  → Vercel auto-deploys
```

### Agent Governance

Three agent roles are defined in `.claude/agents/`:
- **`code-agent.md`** — Implements tasks, commits code, opens draft PRs. Never merges.
- **`orchestrator.md`** — Monitors Trello, moves cards between lists. Never writes code.
- **`planning-agent.md`** — Takes plain-language briefs, creates structured Trello cards in Backlog.

## Environment Variables

**Required (Next.js app):**
- `RESEND_API_KEY`, `CONTACT_EMAIL_TO` — Email delivery
- `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID` — CRM lead capture
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `NEXT_PUBLIC_SITE_URL` — Domain for meta tags

**Required (orchestration):**
- `TRELLO_WEBHOOK_SECRET` — HMAC verification for incoming webhooks
- `AGENT_LISTENER_URL`, `AGENT_SECRET` — Communication between webhook handler and agent-listener

## Coding Standards

- TypeScript strict mode — no `any`
- Functional components only, one per file
- Tailwind classes only, no inline styles or CSS modules
- File names: kebab-case; component names: PascalCase
- Named exports everywhere except Next.js page files
- Max 150 lines per component
- No commented-out code in commits

## Git Conventions

- Branch format: `feature/[task-id]-[short-description]`
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Never push directly to `main`
- Always open draft PRs — never merge without human review
