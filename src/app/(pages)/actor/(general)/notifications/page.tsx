import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { BellRing } from 'lucide-react';
import Notifications_Content from '@/components/actors/general/notifications/notifications-content';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'الإشعارات | AL-AQSA Camp',
  DESCRIPTION: 'تابع أحدث الإشعارات والأخبار من منصة مخيم الأقصى للنازحين.',
  IMAGE: FAVICON.src,
};

// Static SEO metadata
export const metadata: Metadata = {
  title: FALLBACK.TITLE,
  description: FALLBACK.DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    url: APP_URL + GENERAL_ACTOR_ROUTES.NOTIFICATIONS,
    siteName: 'AL-AQSA Camp',
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

function NotificationsHeader() {
  return (
    <Group gap={8}>
      <ThemeIcon color='green' radius='100%' variant='light' size='lg'>
        <BellRing size={16} className='!text-primary' />
      </ThemeIcon>
      <Text fw={600} fz={{ base: 16, md: 18 }} className='!text-primary'>
        الإشعارات :
      </Text>
    </Group>
  );
}

export default async function NotificationsPage() {
  return (
    <Stack py={20} gap={10} w='100%' px={10}>
      <NotificationsHeader />
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Notifications_Content />
      </Suspense>
    </Stack>
  );
}
