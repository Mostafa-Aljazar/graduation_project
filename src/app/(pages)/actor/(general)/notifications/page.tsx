import { Group, Stack, Text } from '@mantine/core';
import { BellRing } from 'lucide-react';
import Notifications_List from '@/components/actors/general/ads/notifications-list';

export default async function Notifications_Page() {
  return (
    <Stack py={20} gap={10} w={'100%'} px={10}>
      <Group gap={10}>
        <BellRing size={20} className='!text-primary' />
        <Text fw={600} fz={20} className='!text-primary'>
          الإشعارات :
        </Text>
      </Group>
      <Notifications_List />
    </Stack>
  );
}
