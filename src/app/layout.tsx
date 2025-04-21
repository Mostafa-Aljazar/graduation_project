import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import './globals.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import Mantine_Layout from '@/components/common/Mantine_Layout';

// Import Google Font
import { Inter } from 'next/font/google';

// Initialize the font
const inter = Inter({
  subsets: ['latin'], // Include 'arabic' for RTL support
  weight: ['400', '500', '700'], // Specify desired font weights
  variable: '--font-inter', // CSS variable for the font
});

export const metadata: Metadata = {
  title: 'AL-AQSA Camp',
  description: 'Next.js social media application project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl' {...mantineHtmlProps} className={inter.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Mantine_Layout>
            <>{children}</>
          </Mantine_Layout>
        </Providers>
      </body>
    </html>
  );
}
