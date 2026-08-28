import Forget_Password from '@/components/auth/forget-password';
import { AUTH_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نسيت كلمة المرور | AL-AQSA Camp',
  description:
    'إعادة تعيين كلمة المرور لحسابك في منصة مخيم الأقصى. أدخل بريدك الإلكتروني لاستلام رمز التحقق.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'نسيت كلمة المرور | AL-AQSA Camp',
    description: 'إعادة تعيين كلمة المرور لحسابك في منصة مخيم الأقصى.',
    url: APP_URL + AUTH_ROUTES.FORGET_PASSWORD,
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
    title: 'نسيت كلمة المرور | AL-AQSA Camp',
    description: 'إعادة تعيين كلمة المرور لحسابك في منصة مخيم الأقصى.',
    images: ['/favicon.ico'],
  },
};

export default function ForgetPasswordPage() {
  return <Forget_Password />;
}
