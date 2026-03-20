# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. ROLE

This agent is a Code Agent responsible for implementing tasks assigned to it. It writes code, commits changes, and opens draft PRs. It does not merge PRs. It does not make architectural decisions not specified in the task.

---

## 2. COMMANDS

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

**Before committing:** run `npm run lint`, `npm run type-check`, and `npm run build` — fix all errors before proceeding.

---

## 3. TECH STACK & ARCHITECTURE

**EmployAI** is a Next.js 14 (App Router) marketing/lead generation site for a done-for-you AI marketing service.

- Next.js 14 with App Router · TypeScript (strict mode) · Tailwind CSS 3.4
- React Hook Form + Zod (client-side form validation)
- Resend (transactional email) · HubSpot Forms API (CRM lead capture)
- Google Analytics 4 via `@next/third-parties` · Vercel for deployment

### Contact form data flow

1. `ContactForm.tsx` (client component) validates with Zod, calls `submitContact()` server action
2. Server action (`app/actions/contact.ts`) sends HTML email via Resend (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`)
3. Server action non-blockingly submits lead to HubSpot (`HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID`) — HubSpot failure is logged as a warning and does not fail the form

### Environment variables

See `.env.example`. Required: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID`. Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CALENDLY_URL`.

---

## 4. CODING STANDARDS

- All components must be written in TypeScript with explicit types — no use of `any`
- Use functional components only, no class components
- File naming: kebab-case for files, PascalCase for components
- One component per file
- All functions must have explicit return types
- Use named exports, not default exports, except for page files (Next.js requires default exports for pages)
- No inline styles — Tailwind classes only
- No commented-out code in commits
- Keep components small and focused — if a component exceeds 150 lines, split it

---

## 5. FOLDER STRUCTURE

Follow this structure strictly:

```
/app          — Next.js App Router pages
/components   — reusable UI components
/components/ui — base-level UI primitives
/lib          — utility functions and helpers
/types        — shared TypeScript type definitions
/public       — static assets
```

---

## 6. GIT RULES

- Never push directly to `main`
- Always create a new branch from `main` using the format: `feature/[task-id]-[short-description]`
- Commit messages must follow Conventional Commits format: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Always open a draft PR when work is complete — never a ready-for-review PR
- PR description must include: what changed, why, and any components added or modified
- Never commit `node_modules`, `.env`, or build output

---

## 7. PERMISSIONS

**Allowed:**
- Read and write all files within the project directory
- Run: `npm run dev`, `npm run build`, `npm run lint`, `npm run type-check`
- Create and switch git branches
- Stage, commit, and push changes
- Open draft PRs via GitHub CLI (`gh pr create --draft`)

**Not allowed:**
- Merging PRs
- Modifying `.env` files
- Installing new npm packages without listing them in the PR description for human review
- Deleting files without noting it explicitly in the PR description

---

## 8. TASK INTAKE FORMAT

When given a task, expect it in this format:

- **Task ID**
- **Description**
- **Acceptance criteria**
- **Files likely affected** (optional)

If acceptance criteria are missing, ask for clarification before writing any code.
