---
name: web-design-research
description: "Research and extract UI design patterns from real websites to inform frontend redesigns. Use this skill whenever the user wants to get design inspiration from specific websites, analyze a site's aesthetic, understand what makes a site's design work, or redesign their own site based on reference URLs. Trigger phrases include 'get inspiration from', 'analyze this design', 'what does X site look like', 'redesign based on', 'I like the look of', 'take cues from', 'research these sites', or any time the user provides URLs alongside a design task. Always use this skill before applying the frontend-design skill when external references are involved."
---

# Web Design Research

This skill systematically extracts design patterns from real websites and produces a structured spec that can be handed off to the frontend-design skill for implementation.

## When to use this skill

Use whenever the user provides reference URLs or names specific sites as design inspiration. Always run this skill BEFORE the frontend-design skill when external references are involved — it gives the implementation concrete signals to work from rather than guessing.

## Phase 1 — Fetch and extract

For each reference URL provided:

1. Use `web_fetch` to retrieve the page HTML
2. Scan for the following signals (see extraction guide below)
3. If no URL is provided but a site name is given, use `web_search` to find the URL first, then fetch it

### What to extract

**Colors**
- Background colors (body, sections, cards)
- Primary text color
- Accent / highlight colors
- Border and divider colors
- Any gradient usage
- Note the dominant mood: light/dark/neutral

**Typography**
- Font families referenced in `font-family` declarations or Google Fonts / Typekit imports
- Heading size scale (approximate, e.g. "large display ~72px, h2 ~36px")
- Body size and line-height
- Font weights used (light, regular, medium, bold)
- Letter-spacing patterns (tight for headings, loose for labels?)
- Any mixed serif/sans-serif pairing

**Layout & spacing**
- Max content width (look for `max-width` on containers)
- Section padding patterns (generous/tight/asymmetric)
- Grid structure (columns, asymmetry, full-bleed sections)
- White space usage: does it feel dense or airy?

**Visual treatments**
- Background textures, noise, grain
- Gradient meshes or colored blobs
- Border styles (none / subtle / strong / decorative)
- Shadow usage (none / soft / dramatic)
- Image treatment (full-bleed / contained / masked)
- Any decorative dividers or section breaks

**Motion cues** (infer from CSS or class names)
- Transition durations referenced in CSS
- Animation class names that suggest fade-in, slide, parallax
- Scroll-triggered patterns if identifiable

**Tone & aesthetic label**
- Assign one primary label: brutalist / editorial / minimal / warm / dark-luxury / playful / technical / organic / maximalist
- Note one secondary quality if present (e.g. "editorial with warm accents")

---

## Phase 2 — Synthesize

After extracting from all reference sites, produce a **Design Research Report** in this format:

```
## Design Research Report

### References analyzed
- [site name] (url)

### Color palette
- Background: [values + mood]
- Text: [values]
- Accents: [values]
- Borders/dividers: [values]
- Overall: light / dark / neutral

### Typography
- Display font: [name + weight + size scale]
- Body font: [name + size + line-height]
- Notable patterns: [tight tracking on headings, etc.]

### Layout
- Max width: [value]
- Spacing feel: [airy / balanced / dense]
- Grid approach: [symmetric / asymmetric / full-bleed]

### Visual treatments
- [list key treatments found]

### Motion
- [list cues found, or "minimal/none detected"]

### Aesthetic summary
- Primary tone: [label]
- What makes it distinctive: [1-2 sentences]
- Best elements to borrow: [3-5 bullet points]
- Elements to avoid or adapt: [any caveats]
```

---

## Phase 3 — Adapt for context

After producing the report, add a short **Adaptation Notes** section:

Consider the user's actual project context (ask if unknown) and flag:
- Which extracted patterns translate well to their use case
- Which patterns are too niche or context-specific to borrow directly
- Any conflicts between multiple references (e.g. one site is dark, one is light)
- A recommended synthesis direction in one sentence

For a B2B service or agency site (like EmployAI), specifically note:
- Whether the trust/credibility signals are strong
- Whether the warmth vs. technical balance suits a human-facing service
- Whether the typography would work at smaller sizes (mobile, dense copy)

---

## Phase 4 — Hand off to frontend-design

Once the report is complete, if the user wants to implement:

1. Read `/mnt/skills/public/frontend-design/SKILL.md`
2. Pass the Design Research Report as context
3. Frame the implementation prompt as: "Apply these extracted design principles to [codebase/component], adapted for our context — don't copy, synthesize"

The frontend-design skill handles implementation. This skill handles research.

---

## Practical notes

**What web_fetch captures well:**
- Inline styles and `<style>` blocks
- CSS custom properties (design tokens)
- Google Fonts and Typekit import URLs (font names)
- Class names that signal design intent (e.g. `text-display`, `section--hero`)
- Max-width containers and grid definitions

**What it misses:**
- Externally loaded CSS files (you'll get font names but not full rendering)
- JavaScript-driven animations
- Hover states and interaction details
- Visual treatments that require rendering (gradients on canvas, WebGL)

When key CSS is missing, note the gap in the report and infer from class names and structure.

**Multiple references:**
Analyze each site separately first, then synthesize commonalities. Don't average them — look for the strongest signal from each and note which site contributed which element.

**If a site blocks web_fetch:**
Note it, use `web_search` to find screenshots or design writeups about that site, and extract what you can from descriptions and design articles.
