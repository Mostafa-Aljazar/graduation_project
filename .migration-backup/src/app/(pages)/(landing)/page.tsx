import type { Metadata } from 'next';
import { HOME_CHILD } from '@/assets/landing/home';
import { FAVICON } from '@/assets/common';
import Hero_Section from '@/components/landing/common/hero-section';
import Child_Section from '@/components/landing/common/child-section';
import Services from '@/components/landing/home/services';
import Statistics from '@/components/landing/home/statistics';
import { DESTINATION_HERO_SECTION } from '@/content/landing';
import { APP_URL } from '@/constants/services';
import { LANDING_ROUTES } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'الصفحة الرئيسية | AL-AQSA Camp',
  DESCRIPTION: 'تابع أحدث الأخبار، الخدمات، والإحصائيات على منصة مخيم الأقصى للنازحين',
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
    url: `${APP_URL + LANDING_ROUTES.HOME}`,
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

export default function Home() {
  const childDescription = (
    <>
      رغم <span className='text-red-600'>الألم</span> إلا أنه هناك دائماً
      <span className='text-green-600'> أمل </span> 💡
    </>
  );

  return (
    <>
      <Hero_Section destination={DESTINATION_HERO_SECTION.HOME} />
      <Statistics />
      <Services />
      <Child_Section child_image={HOME_CHILD} desc={childDescription} />
    </>
  );
}
