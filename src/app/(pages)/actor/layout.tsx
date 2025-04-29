import Mantine_Layout from '@/components/common/Mantine_Layout';
import Navbar from '@/components/common/Navbar/Navbar';
import { Group, Stack } from '@mantine/core';
import React from 'react';

export default function Actor_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Group wrap='nowrap' gap={0}>
      <Stack w={300} visibleFrom='md'>
        <Navbar />
      </Stack>
      <>{children}</>
    </Group>
  );
}
