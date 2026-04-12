# Calendly Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the hero "Book a Session" button to open a Calendly popup modal using the `react-calendly` package.

**Architecture:** `app/page.tsx` owns `isOpen` state and passes handlers to `HeroSection` and a new `CalendlyModal` component. `CalendlyModal` is a `"use client"` component wrapping `react-calendly`'s `PopupModal`, deferred to post-mount to avoid SSR issues. The Calendly URL is read from `NEXT_PUBLIC_CALENDLY_URL`.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript strict, `react-calendly`, Tailwind CSS

---

### Task 1: Install react-calendly

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install the package**

```bash
npm install react-calendly
```

- [ ] **Step 2: Verify types are included**

```bash
cat node_modules/react-calendly/dist/index.d.ts | head -5
```

Expected: TypeScript definitions present (no separate `@types/react-calendly` needed — types are bundled).

- [ ] **Step 3: Run type-check to confirm clean baseline**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install react-calendly"
```

---

### Task 2: Create CalendlyModal component

**Files:**
- Create: `components/CalendlyModal.tsx`

- [ ] **Step 1: Create the component**

Create `components/CalendlyModal.tsx` with this exact content:

```tsx
"use client";

import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  if (!rootElement || !url) return null;

  return (
    <PopupModal
      url={url}
      rootElement={rootElement}
      onModalClose={onClose}
      open={isOpen}
    />
  );
}
```

- [ ] **Step 2: Run type-check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/CalendlyModal.tsx
git commit -m "feat: add CalendlyModal component"
```

---

### Task 3: Wire modal into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update app/page.tsx**

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { CalendlyModal } from "@/components/CalendlyModal";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-screen overflow-hidden">
      <HeroSection
        brandName="EmployAI"
        brandNameClassName="text-white/90"
        title="30-minute strategy for your business."
        highlightText=""
        description="Built around your budget and your next 90 days"
        buttonText="Book a Session"
        onButtonClick={() => setIsOpen(true)}
        colors={[
          "#2D8CFF",
          "#0E72EB",
          "#003087",
          "#5AA3FF",
          "#B3D4FF",
          "#E8F3FF",
        ]}
        distortion={1.2}
        speed={0.8}
        veilOpacity="bg-black/30"
        fontFamily="var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif"
      />
      <CalendlyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""}
      />
    </main>
  );
}
```

- [ ] **Step 2: Run type-check**

```bash
npm run type-check
```

Expected: No errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors. (The `"use client"` directive on `page.tsx` is valid in App Router — it disables SSR for the page component, which is fine here.)

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire Calendly modal to Book a Session button"
```

---

### Task 4: Add env var documentation

**Files:**
- Modify: `.env.local` (local only, not committed)

- [ ] **Step 1: Add placeholder to .env.local**

If `.env.local` exists, add this line. If not, create it with this content:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-name/30min
```

Replace `your-name/30min` with the real Calendly link when available.

- [ ] **Step 2: Verify .env.local is gitignored**

```bash
grep "\.env\.local" .gitignore
```

Expected: `.env.local` appears — it is already gitignored.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

Open `http://localhost:3000`. Click "Book a Session". Confirm the Calendly popup opens (if URL is set) or nothing crashes (if URL is placeholder/empty).

- [ ] **Step 4: Commit env example**

```bash
git add .env.example 2>/dev/null || true
git commit -m "chore: document NEXT_PUBLIC_CALENDLY_URL env var" --allow-empty
```

> **Note for Vercel deployment:** Add `NEXT_PUBLIC_CALENDLY_URL` to the Vercel project environment variables (Settings → Environment Variables) with the real Calendly link before going live.
