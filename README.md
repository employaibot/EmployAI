# EmployAI

Done-for-you AI powered marketing for growing businesses.

## About

EmployAI helps businesses grow with done-for-you AI powered marketing - from automation and social media to custom creative strategy.

**Target Audience:** Small business owners who are revenue generating, too busy to DIY their marketing, and financially stable enough to treat a 2-5k monthly retainer as an investment.

**Business Goal:** Convert qualified visitors into paying clients.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **CRM:** HubSpot Forms API
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel

## Project Structure

```
employai/
├── app/
│   ├── actions/
│   │   └── contact.ts         # Server action for contact form submission
│   ├── layout.tsx             # Root layout with metadata
│   ├── globals.css            # Global styles
│   ├── page.tsx               # Home page
│   └── contact/
│       └── page.tsx           # Contact page
├── components/
│   └── ContactForm.tsx        # Reusable contact form component
├── public/                    # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── postcss.config.js          # PostCSS config
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/employaibot/EmployAI.git
   cd EmployAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Then update `.env.local` with your actual values:
   - `RESEND_API_KEY` - Get from [Resend](https://resend.com)
   - `CONTACT_EMAIL_TO` - Your email address to receive contact form submissions
   - `HUBSPOT_PORTAL_ID` & `HUBSPOT_FORM_ID` - Get from [HubSpot](https://hubspot.com)
   - `NEXT_PUBLIC_GA_ID` - Get from [Google Analytics](https://analytics.google.com)
   - `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://employ-ai.com)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## Features

### Home Page (`/`)
- Hero section with clear CTAs
- Services overview
- Call-to-action section
- Mobile-first responsive design
- SEO optimized

### Contact Page (`/contact`)
- React Hook Form + Zod validation
- Real-time error feedback
- Email integration via Resend
- HubSpot CRM lead capture
- Loading states
- Success/error messages

## Environment Variables

See `.env.example` for all required variables:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RESEND_API_KEY=re_your_key
CONTACT_EMAIL_TO=your@email.com
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_ID=your_form_id
NEXT_PUBLIC_GA_ID=G_your_analytics_id
```

## Development Guidelines

### Code Style
- **TypeScript:** Strict mode enabled, no `any` types
- **CSS:** Tailwind utility classes only, no custom CSS unless necessary
- **Components:** Functional components with React hooks

### Commits
- Use conventional commits: `feat:`, `fix:`, `docs:`, etc.
- Open feature branches only, never push to main
- Create draft PRs for review before merging

### Pages & Routes
- Every page must have clear CTAs (book call, lead form, etc.)
- Mobile-first responsive design required
- SEO meta tags on every page
- Core Web Vitals optimized

## Deployment

This project is configured for Vercel:

1. Push to main branch (after PR review and merge)
2. Vercel automatically builds and deploys
3. Production URL: https://employ-ai-woad.vercel.app

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Open a draft PR with a clear description
4. Request review
5. After approval, merge to main

## License

Private project. All rights reserved.

---

**Questions?** Reach out to the development team.
