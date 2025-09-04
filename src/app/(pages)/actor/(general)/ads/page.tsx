import Ads_Component from '@/components/actors/general/ads/ads-component';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';
import type { Metadata } from 'next';

const FALLBACK_TITLE = 'الإعلانات | AL-AQSA Camp';
const FALLBACK_DESCRIPTION = 'شاهد أحدث الإعلانات والمحتوى المقدم على منصة مخيم الأقصى للنازحين.';
const FALLBACK_IMAGE = '/favicon.ico';

export const metadata: Metadata = {
  title: FALLBACK_TITLE,
  description: FALLBACK_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: FALLBACK_TITLE,
    description: FALLBACK_DESCRIPTION,
    url: `${APP_URL + GENERAL_ACTOR_ROUTES.ADS}`,
    siteName: 'AL-AQSA Camp',
    images: [
      {
        url: FALLBACK_IMAGE,
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
    title: FALLBACK_TITLE,
    description: FALLBACK_DESCRIPTION,
    images: [FALLBACK_IMAGE],
  },
};

export default function AdsPage() {
  return <Ads_Component />;
}
