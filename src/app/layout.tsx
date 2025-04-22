import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import './globals.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import Mantine_Layout from '@/components/common/Mantine_Layout';
import sfProDisplay from '@/fonts';
// import sfProDisplay from '@/fonts';

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
      <body className={`${sfProDisplay.className} antialiased`}>
        <Providers>
          <Mantine_Layout>
            <>{children}</>
          </Mantine_Layout>
        </Providers>
      </body>
    </html>
  );
}
