import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { BellRing } from 'lucide-react';
import Notifications_Content from '@/components/actors/general/notifications/notifications-content';
import { Suspense } from 'react';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { FAVICON } from '@/assets/common';


// Static SEO metadata

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

export default function NotificationsPage() {
  return (
    <Stack py={20} gap={10} w='100%' px={10}>
      <NotificationsHeader />
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Notifications_Content />
      </Suspense>
    </Stack>
  );
}
