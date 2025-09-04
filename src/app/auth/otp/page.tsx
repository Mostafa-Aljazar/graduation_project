import OTP from '@/components/auth/otp';
import { AUTH_ROUTES } from '@/constants/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'رمز التحقق | AL-AQSA Camp',
  description:
    'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور في منصة مخيم الأقصى.',
  openGraph: {
    title: 'رمز التحقق | AL-AQSA Camp',
    description:
      'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور في منصة مخيم الأقصى.',
    url: process.env.APP_URL + AUTH_ROUTES.OTP,
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
    title: 'رمز التحقق | AL-AQSA Camp',
    description:
      'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور في منصة مخيم الأقصى.',
    images: ['/favicon.ico'],
  },
};

export default function OTPPage() {
  return <OTP />;
}
