import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { BellRing } from 'lucide-react';
import Notifications_Content from '@/components/actors/general/notifications/notifications-content';

function Notifications_Header() {
  return (
    <Group gap={8}>
      <ThemeIcon color='green' radius={'100%'} variant='light' size='lg'>
        <BellRing size={16} className='!text-primary' />
      </ThemeIcon>
      <Text fw={600} fz={{ base: 16, md: 18 }} className='!text-primary'>
        الإشعارات :
      </Text>
    </Group>
  );
}

export default async function Notifications_Page() {
  return (
    <Stack py={20} gap={10} w={'100%'} px={10}>
      <Notifications_Header />
      <Notifications_Content />
    </Stack>
  );
}
