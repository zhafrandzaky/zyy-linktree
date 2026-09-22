# zyy-linktree

A production-grade, minimalist personal link-in-bio (Linktree alternative) web app crafted for content creator **Ziona Zyy ([@truegod4k](https://instagram.com/ziona_zyy))**.

Designed with **Linear / Raycast / Vercel** level craftsmanship—featuring deliberate whitespace, subtle micro-interactions, cohesive typography, and responsive ergonomics across all screen sizes.

🌐 **Production URL**: [https://zyy.my.id](https://zyy.my.id)

---

## ✨ Features

- ⚡️ **Light-Mode-First Theming**: Seamless dark/light theme switcher powered by `next-themes` with zero hydration flash (`useSyncExternalStore`).
- 🎨 **Craft-Driven Aesthetics**: Subtle borders, micro-interactions (`active:scale-[0.98]`), directional arrow transitions, and no AI-cliché gradients or harsh shadows.
- 📱 **Ergonomic Responsive Layout**: Strictly bounded container (`max-w-[480px]`) that stays centered on wide desktop screens while keeping cards comfortably in the mobile thumb zone (`pt-7 pb-8`).
- 🔗 **Fully Decoupled Data**: All profile details and links reside exclusively in `src/data/profile.ts` backed by strict TypeScript definitions.
- 🇮🇩 **Creator Platform Vectors**: Custom inline monochrome SVG icons for local creator monetization platforms (**Saweria** & **Sociabuzz**) and community hubs (**Discord**, **Instagram**, **GitHub**).
- 🪄 **Adaptive Vector Favicon**: 100% transparent SVG favicon (`src/app/icon.svg`) that automatically switches between dark zinc (light mode) and pure white (dark mode) matching the browser's system theme.
- 🚀 **Zero-Config Vercel Deployment**: Static generation with Turbopack, pre-configured OpenGraph cards, Twitter preview metadata, and custom domain readiness.

---

## 🛠️ Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/) (v1.4+)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`)
- **Theme Engine**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [lucide-react](https://lucide.dev/) + Custom inline SVG vectors
- **Language**: TypeScript 5.9+ (Strict Mode)

---

## 📂 Project Structure

```
zyy-linktree/
├── docs/
│   └── design.md                # Full design tokens and UI/UX specifications
├── public/
│   ├── avatar.jpeg              # Source portrait image
│   └── avatar.webp              # High-efficiency WebP portrait asset
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS v4 tokens & custom dark variant
│   │   ├── icon.svg             # Transparent theme-adaptive SVG favicon
│   │   ├── layout.tsx           # SEO metadata, OpenGraph, and ThemeProvider
│   │   └── page.tsx             # Main Link-in-Bio responsive layout
│   ├── components/
│   │   ├── IconResolver.tsx     # Custom monochrome brand SVGs & Lucide icon mapper
│   │   ├── LinkCard.tsx         # Accessible touch-ergonomic link card (48px target)
│   │   ├── ThemeProvider.tsx    # Client wrapper for next-themes
│   │   └── ThemeToggle.tsx      # Smooth Sun/Moon theme switcher (hydration safe)
│   ├── data/
│   │   └── profile.ts           # Decoupled profile and links configuration
│   └── types/
│       └── index.ts             # Strict TypeScript definitions
├── AGENTS.md                    # Agent context and operating rules
├── CLAUDE.md                    # Agent quick reference manual
├── bun.lock
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/zhafrandzaky/zyy-linktree.git
cd zyy-linktree
bun install
```

### 2. Development

Run the local development server with Turbopack:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Quality Checks

```bash
# Run ESLint validation (zero errors required)
bun run lint

# Compile optimized static production build
bun run build

# Start production server locally
bun run start
```

---

## ⚙️ Customization

### Modifying Profile & Links
All content is centralized in [`src/data/profile.ts`](src/data/profile.ts):

```typescript
export const profileData: ProfileData = {
  name: 'Ziona Zyy',
  handle: '@truegod4k',
  avatarSrc: '/avatar.webp',
  links: [
    {
      title: 'Saweria',
      url: 'https://saweria.co/ziona',
      icon: 'Saweria',
      highlighted: true,
    },
    // Add additional links here...
  ],
};
```

### Adding New Icons
1. Add the icon name to `SupportedIcon` in [`src/types/index.ts`](src/types/index.ts).
2. Register the SVG component or Lucide icon in [`src/components/IconResolver.tsx`](src/components/IconResolver.tsx).
3. Reference the icon name in [`src/data/profile.ts`](src/data/profile.ts).

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. The framework preset will automatically be detected as **Next.js**.
4. Deploy!
5. In your project settings on Vercel, navigate to **Domains** and add your custom domain: `zyy.my.id`.

---

## 📄 Documentation

For in-depth design principles and agent operating rules, explore:
- [docs/design.md](docs/design.md) - Design System & UI/UX Specifications.
- [AGENTS.md](AGENTS.md) - Agent Architecture & Rules.
- [CLAUDE.md](CLAUDE.md) - Quick Reference Manual.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
