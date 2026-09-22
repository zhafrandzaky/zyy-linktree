# Design System & UI/UX Specifications

This document outlines the design philosophy, visual design tokens, component specifications, and responsive layout guidelines for the **zyy-linktree** personal link-in-bio web application.

---

## 1. Design Philosophy

The application is built with a **production-grade, craft-first aesthetic** inspired by Linear, Raycast, and Vercel:
- **No "AI Slop"**: Avoid saturated neon gradients, harsh drop-shadows, or cluttered generic cards.
- **Deliberate Whitespace**: Elements are grouped logically with balanced vertical rhythm.
- **Micro-Interactions**: Subtle, responsive feedback on tap and hover (`active:scale-[0.98]`, subtle translation of directional arrows).
- **Responsive Ergonomics**: Designed mobile-first, ensuring that cards remain comfortably in the thumb-zone without excessive blank space or cut-off elements.

---

## 2. Color Tokens & Theme System

The application is built with a **light-mode-first** approach managed via `next-themes` and **Tailwind CSS v4**.

| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#fafafa` (Zinc 50) | `#09090b` (Zinc 950) | Page root background |
| **Foreground Text** | `#18181b` (Zinc 900) | `#f4f4f5` (Zinc 100) | Primary headings & card titles |
| **Muted Text** | `#71717a` (Zinc 500) | `#a1a1aa` (Zinc 400) | Handle, secondary labels |
| **Card Background** | `#ffffff` (Pure White) | `rgba(24, 24, 27, 0.4)` | Standard link cards |
| **Card Border** | `rgba(228, 228, 231, 0.9)` | `rgba(39, 39, 42, 0.8)` | Card boundaries |
| **Featured Background** | `rgba(250, 250, 250, 0.9)` | `rgba(24, 24, 27, 0.9)` | Highlighted card (Saweria) |
| **Featured Border** | `#d4d4d8` (Zinc 300) | `#3f3f46` (Zinc 700) | Highlighted card boundary |
| **Avatar Ring** | `ring-zinc-300/90` | `ring-zinc-700/80` | Avatar outline (`ring-2`) |

### Tailwind CSS v4 Class-Based Dark Mode
In Tailwind CSS v4, dark variants are enabled via the custom CSS directive in `src/app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

---

## 3. Typography Hierarchy

Utilizes the **Geist Sans** variable font for high-legibility geometric letterforms.

| Element | Classes | Specs |
| :--- | :--- | :--- |
| **Profile Name** | `text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100` | 20px / 24px, Bold |
| **Handle** | `text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5` | 14px, Medium |
| **Link Card Title** | `text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate` | 14px, SemiBold |
| **Footer** | `text-xs text-zinc-400 dark:text-zinc-600 font-medium tracking-tight` | 12px, Medium |

---

## 4. Component Guidelines

### Profile Avatar & Theme Toggle
- **Container**: Relative wrapper centered horizontally.
- **Avatar**: Circle `w-20 h-20 sm:w-24 sm:h-24` with `ring-2 ring-zinc-300/90 dark:ring-zinc-700/80 shadow-sm`.
- **Theme Toggle**: Aligned directly with the top boundary of the avatar circle using `absolute right-0 top-0`. Minimum touch size of 44x44px (`w-11 h-11`), with a smooth rotation/scale micro-interaction between Sun and Moon.

### Link Cards (`LinkCard.tsx`)
- **Dimensions**: Minimum touch target of 48px (`min-h-[48px] py-3 px-4`).
- **Layout**: Flex row with space-between:
  1. Left icon badge: `w-9 h-9` rounded-lg container with subtle border and monochrome vector.
  2. Title: Bold platform label with `truncate` protection.
  3. Action indicator: `ArrowUpRight` (16px) with hover translation (`group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
- **Featured State**: Subtle accent border (`border-zinc-300 dark:border-zinc-700`) and slight elevation for primary call-to-actions (e.g. Saweria).

---

## 5. Layout & Responsive Architecture

- **Root Viewport**: `min-h-dvh w-full flex flex-col items-center justify-start pt-7 pb-8 px-4 sm:pt-12 sm:pb-10 sm:px-6`.
- **Max Content Width**: Strictly constrained to `max-w-[480px] w-full mx-auto` to prevent cards from stretching on ultra-wide screens.
- **Mobile Spacing**:
  - `pt-7` ensures the avatar sits near the top of tall phone screens without an excessive empty forehead.
  - `gap-2.5` keeps the 5 link cards comfortably grouped within the natural thumb zone.
  - `mt-6` places the footer right below the last card with a clean, cohesive gap.

---

## 6. Dynamic Favicon System (`src/app/icon.svg`)

- **Format**: Scalable Vector Graphics (`.svg`), 100% transparent background (`fill="none"`).
- **Theme Adaptation**: Uses embedded SVG CSS media queries (`@media (prefers-color-scheme: dark)`):
  - **Light browser theme**: Sparkle star renders in dark zinc (`#18181b`).
  - **Dark browser theme**: Sparkle star renders in crisp paper-white (`#fafafa`).
- Replaces static raster bitmaps for zero-blur rendering on high-DPI and Retina displays.
