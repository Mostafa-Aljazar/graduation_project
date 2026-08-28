import { Suspense } from 'react';
import type { Metadata } from 'next';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Security_Profile_Form from '@/components/actors/security/profile/security-profile-form';
import { MAN } from '@/assets/actor';

export const metadata: Metadata = {
  title: 'إضافة عنصر أمني جديد | AL-AQSA Camp',
  description: 'إضافة عنصر أمني جديد إلى منصة مخيم الأقصى.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: 'AL-AQSA Camp',
    title: 'إضافة عنصر أمني جديد | AL-AQSA Camp',
    description: 'إضافة عنصر أمني جديد إلى منصة مخيم الأقصى.',
    type: 'website',
    url: APP_URL + GENERAL_ACTOR_ROUTES.ADD_SECURITIES,
    images: [{ url: MAN.src, width: 600, height: 600, alt: 'إضافة عنصر أمني جديد' }],
    locale: 'ar',
  },
  twitter: {
    card: 'summary',
    title: 'إضافة عنصر أمني جديد | AL-AQSA Camp',
    description: 'إضافة عنصر أمني جديد إلى منصة مخيم الأقصى.',
    images: [MAN.src],
  },
};

export default function Security_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Security_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
