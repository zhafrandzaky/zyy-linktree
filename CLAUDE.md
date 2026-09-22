@AGENTS.md

# Quick Reference Manual for AI Agents

## Project Summary
- **App**: Personal Link-in-Bio for Ziona Zyy (`@truegod4k`)
- **Domain**: `https://zyy.my.id`
- **Stack**: Next.js 16 (App Router), Bun, Tailwind CSS v4, `next-themes`, `lucide-react`
- **Design Spec**: [docs/design.md](file:///home/zyy/Projects/zyy-linktree/docs/design.md)

---

## Core Commands
- `bun run dev` - Start development server on `http://localhost:3000`
- `bun run lint` - Run ESLint (must pass with 0 errors)
- `bun run build` - Create optimized production static build
- `bun add <pkg>` - Install package with Bun

---

## Critical Development Guidelines
1. **Profile Data**: Always edit `src/data/profile.ts` for links or profile changes. Never hardcode links in JSX.
2. **Icons**: Supported icons are in `src/types/index.ts` (`SupportedIcon`) and mapped via `src/components/IconResolver.tsx`.
3. **Theming**: Light-mode first. Dark variant uses `@custom-variant dark (&:where(.dark, .dark *));` in `src/app/globals.css`.
4. **Hydration Guard**: In `ThemeToggle.tsx`, use `React.useSyncExternalStore` (never synchronous `setState` in `useEffect`).
5. **Favicon**: `src/app/icon.svg` is an adaptive transparent SVG that switches color via `@media (prefers-color-scheme: dark)`. Do not override with static bitmap `.ico`.
6. **Layout Constraints**: Keep container width strictly at `max-w-[480px]`. Maintain mobile padding `pt-7 pb-8 px-4` to avoid excessive empty space on mobile.
