import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import sfProDisplay from '@/fonts';
import { Tajawal } from 'next/font/google';

// Configure Tajawal font from Google Fonts
const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--tajawal-font',
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
    <html lang='ar' dir='rtl' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={` ${tajawal.className} antialiased`}>
        {/* <body className={`${sfProDisplay.className} antialiased`}> */}
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}
