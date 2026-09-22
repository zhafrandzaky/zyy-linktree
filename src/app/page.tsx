import Image from 'next/image';
import { profileData } from '@/data/profile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinkCard } from '@/components/LinkCard';

export default function Home() {
  return (
    <main className="min-h-dvh w-full flex flex-col items-center justify-start pt-7 pb-8 px-4 sm:pt-12 sm:pb-10 sm:px-6">
      <div className="w-full max-w-[480px] mx-auto flex flex-col items-center">
        {/* Profile Avatar & Top-Aligned Theme Toggle */}
        <div className="relative w-full flex justify-center items-start">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-zinc-300/90 dark:ring-zinc-700/80 shadow-sm">
            <Image
              src={profileData.avatarSrc}
              alt={profileData.name}
              width={96}
              height={96}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Theme toggle aligned with the top edge of the profile avatar */}
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Profile Identity (Name & Handle only) */}
        <div className="flex flex-col items-center text-center mt-3 mb-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {profileData.name}
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {profileData.handle}
          </p>
        </div>

        {/* Simplified Link Cards Vertical Stack */}
        <section
          aria-label="Links"
          className="flex flex-col gap-2.5 w-full"
        >
          {profileData.links.map((link) => (
            <LinkCard key={link.title} link={link} />
          ))}
        </section>

        {/* Footer tepat di bawah card dengan jarak yang pas */}
        <footer className="mt-6 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-600 font-medium tracking-tight">
            © {new Date().getFullYear()} {profileData.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
