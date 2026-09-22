<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Knowledge & Developer Guide: zyy-linktree

## 1. Project Overview
A production-grade, minimalist personal link-in-bio (Linktree alternative) web app crafted for content creator **Ziona Zyy (@truegod4k)**.
- **Production Target Domain**: `https://zyy.my.id`
- **Deployment Platform**: Vercel (zero-config Next.js setup)
- **Aesthetic Standard**: Linear / Raycast / Vercel level craft (subtle micro-interactions, cohesive typography, deliberate spacing).

---

## 2. Tech Stack & Runtime
- **Package Manager & Runtime**: `bun` (v1.4+)
- **Framework**: `Next.js 16` (App Router, Turbopack)
- **Styling**: `Tailwind CSS v4` (`@tailwindcss/postcss`)
- **Theme Engine**: `next-themes` (light mode by default, class-based toggle)
- **Icons**: `lucide-react` + custom inline monochrome SVG vectors
- **TypeScript**: Version 5.9+ (strict mode enabled)

---

## 3. Directory & File Architecture
```
zyy-linktree/
├── docs/
│   └── design.md                # Design system tokens, typography, and UI/UX specs
├── public/
│   ├── avatar.jpeg              # Original creator portrait
│   └── avatar.webp              # High-efficiency WebP used in app (<Image priority />)
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS v4 tokens & custom dark variant
│   │   ├── icon.svg             # Transparent theme-adaptive SVG favicon (black in light, white in dark)
│   │   ├── layout.tsx           # SEO metadata, OpenGraph, Twitter cards & ThemeProvider
│   │   └── page.tsx             # Main bounded page (max-w-[480px]) with top-aligned toggle
│   ├── components/
│   │   ├── IconResolver.tsx     # Custom monochrome SVGs (Saweria, Sociabuzz, Discord, IG, GitHub)
│   │   ├── LinkCard.tsx         # Accessible, touch-ergonomic link card (48px min-height)
│   │   ├── ThemeProvider.tsx    # Client wrapper for next-themes
│   │   └── ThemeToggle.tsx      # Smooth Sun/Moon theme switcher (useSyncExternalStore hydration guard)
│   ├── data/
│   │   └── profile.ts           # Decoupled profile and links configuration
│   └── types/
│       └── index.ts             # Strict TypeScript definitions
├── AGENTS.md                    # Agent context and operating rules
├── CLAUDE.md                    # Agent quick reference manual
├── bun.lock
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 4. Key Engineering & Design Rules

### A. Data Decoupling
- **Never hardcode links in JSX.** All profile metadata and link cards must reside exclusively in `src/data/profile.ts`.
- When adding a new link, update `src/types/index.ts` (`SupportedIcon`), `src/components/IconResolver.tsx`, and `src/data/profile.ts`.

### B. Theming & Hydration
- `next-themes` operates with `attribute="class"`, `defaultTheme="light"`, and `enableSystem={false}`.
- Tailwind CSS v4 class-based dark mode requires `@custom-variant dark (&:where(.dark, .dark *));` in `src/app/globals.css`.
- In `ThemeToggle.tsx`, do NOT use `useEffect` with synchronous `setState` for mounting (it triggers React 19 cascading render ESLint errors). Use `React.useSyncExternalStore`.

### C. Layout & Spacing Guardrails
- **Container Boundary**: Strictly keep content inside `max-w-[480px] w-full mx-auto`. Never allow cards to stretch across wide viewports.
- **Mobile Spacing**: Use `pt-7 pb-8 px-4 sm:pt-12 sm:pb-10 sm:px-6` with `justify-start`. Do NOT apply `mt-auto` or `my-auto` without verifying mobile viewports, as they create excessive vertical gaps on tall mobile screens.
- **Theme Toggle Alignment**: Stays flush with the top edge of the avatar circle (`absolute right-0 top-0`).

### D. Adaptive Vector Favicon
- `src/app/icon.svg` is 100% transparent (`fill="none"`).
- Uses embedded CSS `@media (prefers-color-scheme: dark)`:
  - Browser Light Mode: `#18181b` (Dark Zinc).
  - Browser Dark Mode: `#fafafa` (Pure White).
- Do not introduce static raster favicons that would override this dynamic SVG behavior.

---

## 5. Development Workflow & Commands

```bash
# Start local development server with Turbopack
bun run dev

# Run ESLint validation (zero errors required)
bun run lint

# Compile production build & typecheck
bun run build

# Install new dependency
bun add <package-name>
```
