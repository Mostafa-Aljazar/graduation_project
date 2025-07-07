import Ads_List from '@/components/actors/general/ads/ads-list';
import { Box, Group, Stack, Text } from '@mantine/core';
import { Megaphone } from 'lucide-react';

export default function Ads() {
  return (
    <Stack py={20} gap={10} w={'100%'} px={10}>
      <Group gap={10}>
        <Megaphone size={20} className='!text-primary' />
        <Text fw={600} fz={20} className='!text-primary'>
          الإعلانات :
        </Text>
      </Group>
      <Ads_List />
    </Stack>
  );
}
