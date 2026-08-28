import { Suspense } from 'react';
import type { Metadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';

export const metadata: Metadata = {
  title: 'إضافة مندوب جديد | AL-AQSA Camp',
  description: 'إضافة مندوب جديد إلى منصة مخيم الأقصى.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: 'AL-AQSA Camp',
    title: 'إضافة مندوب جديد | AL-AQSA Camp',
    description: 'إضافة مندوب جديد إلى منصة مخيم الأقصى.',
    type: 'website',
    url: APP_URL + GENERAL_ACTOR_ROUTES.ADD_DELEGATES,
    images: [{ url: MAN.src, width: 600, height: 600, alt: 'إضافة مندوب جديد' }],
    locale: 'ar',
  },
  twitter: {
    card: 'summary',
    title: 'إضافة مندوب جديد | AL-AQSA Camp',
    description: 'إضافة مندوب جديد إلى منصة مخيم الأقصى.',
    images: [MAN.src],
  },
};

export default function Delegate_Add() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <Delegate_Profile_Form destination={ACTION_ADD_EDIT_DISPLAY.ADD} />
    </Suspense>
  );
}
