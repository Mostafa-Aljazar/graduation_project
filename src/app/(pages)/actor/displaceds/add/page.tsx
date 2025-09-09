import { Suspense } from 'react';
import type { Metadata } from 'next';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { MAN } from '@/assets/actor';

export const metadata: Metadata = {
  title: 'إضافة نازح جديد | AL-AQSA Camp',
  description: 'إضافة نازح جديد إلى منصة مخيم الأقصى.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: 'AL-AQSA Camp',
    title: 'إضافة نازح جديد | AL-AقSA Camp',
    description: 'إضافة نازح جديد إلى منصة مخيم الأقصى.',
    type: 'website',
    url: APP_URL + GENERAL_ACTOR_ROUTES.ADD_DISPLACEDS,
    images: [{ url: MAN.src, width: 600, height: 600, alt: 'إضافة نازح جديد' }],
    locale: 'ar',
  },
  twitter: {
    card: 'summary',
    title: 'إضافة نازح جديد | AL-AQSA Camp',
    description: 'إضافة نازح جديد إلى منصة مخيم الأقصى.',
    images: [MAN.src],
  },
};

export default function Displaced_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Displaced_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
