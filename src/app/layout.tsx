import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getActiveTheme } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Career Compass — Explore Your Future',
    template: '%s · Career Compass',
  },
  description:
    'Discover careers — what people do, where they work, the skills they need, and the steps to get there. A Girl Scout Silver Award project.',
  keywords: ['careers', 'career exploration', 'jobs for students', 'career guide', 'Girl Scout Silver Award'],
  openGraph: {
    title: 'Career Compass — Explore Your Future',
    description: 'Discover careers and the exact steps to pursue them.',
    type: 'website',
    siteName: 'Career Compass',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getActiveTheme();
  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
