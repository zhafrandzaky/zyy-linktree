import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { profileData } from '@/data/profile';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zyy.my.id'),
  title: `${profileData.name} (${profileData.handle}) | Official Links`,
  description: `Official links and profiles of ${profileData.name} (${profileData.handle})`,
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    title: `${profileData.name} (${profileData.handle})`,
    description: `Official links and profiles of ${profileData.name} (${profileData.handle})`,
    url: 'https://zyy.my.id',
    siteName: profileData.name,
    type: 'website',
    images: [
      {
        url: profileData.avatarSrc,
        width: 800,
        height: 800,
        alt: profileData.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} (${profileData.handle})`,
    description: `Official links and profiles of ${profileData.name} (${profileData.handle})`,
    creator: profileData.handle,
    images: [profileData.avatarSrc],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
