import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProfileLink } from '@/types';
import { IconResolver } from './IconResolver';

interface LinkCardProps {
  link: ProfileLink;
}

export function LinkCard({ link }: LinkCardProps) {
  const { title, url, icon, highlighted } = link;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-between w-full min-h-[48px] py-3 px-4 rounded-xl border transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 ${
        highlighted
          ? 'border-zinc-300 bg-zinc-50/90 hover:border-zinc-400 hover:bg-zinc-100/80 shadow-xs dark:border-zinc-700 dark:bg-zinc-900/90 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/90'
          : 'border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 shadow-2xs dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700/80 dark:hover:bg-zinc-900/80'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        {/* Left Icon Badge */}
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 border transition-colors duration-200 ${
            highlighted
              ? 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300/80 dark:border-zinc-700'
              : 'bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-800 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
          }`}
        >
          <IconResolver name={icon} className="w-4 h-4" />
        </div>

        {/* Title Text */}
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
          {title}
        </span>
      </div>

      {/* Right Arrow Action */}
      <div className="flex items-center justify-center w-7 h-7 rounded-md text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-200 shrink-0">
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
