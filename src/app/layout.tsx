import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import './globals.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import { Tajawal } from 'next/font/google';

const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--tajawal-font',
});

export const metadata: Metadata = {
  title: 'AL-AQSA Camp | إدارة مخيمات النازحين في غزة',
  description:
    'منصة ويب لإدارة مخيمات النازحين في غزة باستخدام تقنيات حديثة لتوزيع المساعدات، التعامل مع الشكاوى، وتحسين التواصل في الوقت الحقيقي.',
  keywords: [
    'displacement camps',
    'Gaza',
    'humanitarian aid',
    'web application',
    'camp management',
    'aid distribution',
    'refugee support',
    'transparency',
    'resource management',
    'مخيمات النازحين',
    'النازحين',
    'غزة',
    'توزيع المساعدات',
    'منصة ويب',
    'إدارة الكوارث',
    'اللاجئين',
    'فلسطين',
  ],
  authors: [{ name: 'Mostafa Ibrahim Mostafa Aljazar' }],
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
