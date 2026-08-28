import Create_New_Password from '@/components/auth/create-new-password';
import { AUTH_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'إنشاء كلمة مرور جديدة | AL-AQSA Camp',
  description:
    'قم بإنشاء كلمة مرور جديدة لحسابك في منصة مخيم الأقصى بعد التحقق من البريد الإلكتروني.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'إنشاء كلمة مرور جديدة | AL-AQSA Camp',
    description:
      'قم بإنشاء كلمة مرور جديدة لحسابك في منصة مخيم الأقصى بعد التحقق من البريد الإلكتروني.',
    url: APP_URL + AUTH_ROUTES.CREATE_NEW_PASSWORD,
    siteName: 'AL-AQSA Camp',
    images: [
      {
        url: '/favicon.ico',
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
    title: 'إنشاء كلمة مرور جديدة | AL-AQSA Camp',
    description:
      'قم بإنشاء كلمة مرور جديدة لحسابك في منصة مخيم الأقصى بعد التحقق من البريد الإلكتروني.',
    images: ['/favicon.ico'],
  },
};

export default function CreateNewPasswordPage() {
  return <Create_New_Password />;
}
