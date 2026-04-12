# Calendly Integration Design

**Date:** 2026-04-11
**Branch:** feature/hero-shader-redesign

## Overview

Integrate Calendly booking into the EmployAI hero section. The existing "Book a Session" button opens a Calendly popup modal inline — the user never navigates away from the page.

## Approach

Use the `react-calendly` npm package. Its `PopupModal` component handles Calendly script loading, cleanup, and the popup lifecycle as a proper React component with TypeScript support and safe SSR behavior.

## Architecture

One new component — `components/CalendlyModal.tsx` — wraps `react-calendly`'s `PopupModal` and renders only client-side. The hero's button triggers it via a callback prop. `app/page.tsx` owns the open/close state.

## Components

### `components/CalendlyModal.tsx`

- `"use client"` directive
- Props: `isOpen: boolean`, `onClose: () => void`, `url: string`
- Renders `<PopupModal>` from `react-calendly`
- `rootElement` is set to `document.body` after mount (via `useEffect` + `useState`) to avoid SSR window errors
- Does not render anything until mounted

### `app/page.tsx`

- Adds `useState<boolean>(false)` for `isOpen`
- Passes `onButtonClick={() => setIsOpen(true)}` to `<HeroSection>`
- Renders `<CalendlyModal isOpen={isOpen} onClose={() => setIsOpen(false)} url={process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""} />`

### `components/ui/hero-section-with-smooth-bg-shader.tsx`

- No changes needed — `onButtonClick` prop already exists and is wired to the button's `onClick`

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CALENDLY_URL` | The Calendly scheduling link (e.g. `https://calendly.com/your-name/30min`) |

Add to `.env.local` locally; add to Vercel environment variables for production.

## Error Handling

- If `NEXT_PUBLIC_CALENDLY_URL` is empty or unset, the button click handler fires but the modal opens to an empty/invalid Calendly URL — no crash, just a graceful no-op from Calendly's side
- `rootElement` access is deferred to post-mount so there are no SSR `window` errors
- `react-calendly` handles script loading and cleanup on modal unmount

## Testing Checklist

- [ ] "Book a Session" button opens Calendly popup
- [ ] Modal closes cleanly (× button or backdrop click)
- [ ] No console errors on initial page load
- [ ] No SSR errors during build (`npm run build`)
- [ ] Works with `NEXT_PUBLIC_CALENDLY_URL` unset (no crash)
