'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <div
        className="w-11 h-11 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 opacity-0"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-xs transition-all duration-200 ease-out active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        className={`w-4 h-4 transition-all duration-300 transform ${
          isDark
            ? '-rotate-90 scale-0 opacity-0 absolute'
            : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`w-4 h-4 transition-all duration-300 transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0 absolute'
        }`}
      />
    </button>
  );
}
