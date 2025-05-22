import Actor_Navbar from '@/components/actors/common/navbar/Actor_Navbar';
import { Group, Stack } from '@mantine/core';
import React from 'react';

export default function Actor_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Group wrap='nowrap' gap={0} justify='start' align='start' pt={60}>
      <Stack
        w={250}
        // mih='100vh'
        visibleFrom='lg'
        justify='flex-start'
        align='center'
      >
        <Actor_Navbar />
      </Stack>
      <Stack mih='100vh' w={'100%'} h={'100%'} justify='start'>
        {children}
      </Stack>
    </Group>
  );
}
