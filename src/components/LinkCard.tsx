import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProfileLink } from '@/types';
import { IconResolver } from './IconResolver';

interface LinkCardProps {
  link: ProfileLink;
}

export function LinkCard({ link }: LinkCardProps) {
  const { title, url, icon } = link;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between w-full min-h-[48px] py-3 px-4 rounded-xl border transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 border-zinc-200/90 bg-white hover:border-zinc-400 hover:bg-zinc-100/80 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/90 shadow-2xs"
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        {/* Left Icon Badge */}
        <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 border transition-colors duration-200 bg-zinc-100/80 dark:bg-zinc-800/60 border-zinc-200/60 dark:border-zinc-800 group-hover:bg-zinc-200/90 dark:group-hover:bg-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600">
          <IconResolver name={icon} className="w-4 h-4" />
        </div>

        {/* Title Text */}
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
          {title}
        </span>
      </div>

      {/* Right Arrow Action */}
      <div className="flex items-center justify-center w-7 h-7 rounded-md text-zinc-400 dark:text-zinc-500 shrink-0">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </a>
  );
}
