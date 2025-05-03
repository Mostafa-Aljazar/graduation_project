'use client';
import { Stack } from '@mantine/core';
import { Drawer } from '@mantine/core';
import React from 'react';
import Header_Links from './Header_Links';
import { usePathname } from 'next/navigation';
import ActorNavbar from '@/components/actors/common/ActorNavbar';

type Props = {
  opened: boolean;
  toggle: () => void;
};
export default function Header_Drawer({ opened, toggle }: Props) {
  const pathname = usePathname();

  return (
    <Drawer
      position='left'
      opened={opened}
      onClose={toggle}
      size={300}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      dir='ltr'
      hiddenFrom='md'
    >
      <Stack h='100%' px='md'>
        {/* In actor pages  or In landing page */}
        {pathname.includes('actor') ? <ActorNavbar /> : <Header_Links />}
      </Stack>
    </Drawer>
  );
}
