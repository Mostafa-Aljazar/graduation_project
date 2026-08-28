import { Suspense } from 'react';
import type { Metadata } from 'next';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { BLOG_CHILD } from '@/assets/landing/blog';
import { FAVICON } from '@/assets/common';
import Our_Blog_Or_Stories from '@/components/landing/common/blog-stories/our-blog-or-stories';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import { DESTINATION_HERO_SECTION } from '@/content/landing';
import { LANDING_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';

const FALLBACK = {
  TITLE: 'المدونة | AL-AQSA Camp',
  DESCRIPTION: 'تابع أحدث المقالات والقصص على منصة مخيم الأقصى للنازحين',
  IMAGE: FAVICON.src,
};

export const metadata: Metadata = {
  title: FALLBACK.TITLE,
  description: FALLBACK.DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: 'AL-AQSA Camp',
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    url: `${APP_URL + LANDING_ROUTES.BLOG}`,
    images: [
      {
        url: FALLBACK.IMAGE,
        width: 64,
        height: 64,
        alt: 'AL-AQSA Camp favicon',
      },
    ],
    locale: 'ar',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    images: [FALLBACK.IMAGE],
  },
};

export default function Blog() {
  const childDescription = (
    <>
      النزوح <span className='text-red-500'>يسرق</span> الطفولة، لكنه لا يستطيع{' '}
      <span className='text-red-500'>قتل</span> البراءة
    </>
  );

  return (
    <>
      <Hero_Section destination={DESTINATION_HERO_SECTION.BLOG} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Our_Blog_Or_Stories destination={TYPE_WRITTEN_CONTENT.BLOG} />
      </Suspense>

      <Child_Section child_image={BLOG_CHILD} desc={childDescription} />
    </>
  );
}
