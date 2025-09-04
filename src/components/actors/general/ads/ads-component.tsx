import Ads_Content from '@/components/actors/general/ads/ads-content';
import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { Megaphone } from 'lucide-react';
import { Suspense } from 'react';

function Ads_Header() {
  return (
    <Group gap={8}>
      <ThemeIcon color='green' radius={'100%'} variant='light' size='lg'>
        <Megaphone size={16} className='!text-primary' />
      </ThemeIcon>
      <Text fw={600} fz={{ base: 16, md: 20 }} className='!text-primary'>
        الإعلانات :
      </Text>
    </Group>
  );
}

export default function Ads_Component() {
  return (
    <Stack py={20} gap={10} w={'100%'} px={10}>
      <Ads_Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Ads_Content />
      </Suspense>
    </Stack>
  );
}
