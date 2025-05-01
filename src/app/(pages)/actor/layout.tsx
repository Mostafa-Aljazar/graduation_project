import ActorNavbar from '@/components/actors/common/ActorNavbar';
import { Group, Stack } from '@mantine/core';
import React from 'react';

export default function Actor_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Group wrap='nowrap' gap={0}>
      <Stack
        pt={60}
        w={250}
        mih='100vh'
        visibleFrom='md'
        justify='flex-start'
        align='center'
      >
        <ActorNavbar />
      </Stack>
      <>{children}</>
    </Group>
  );
}
