'use client';
import { Stack } from '@mantine/core';
import { Drawer } from '@mantine/core';
import React from 'react';
import Header_Links from './Header_Links';
import { usePathname } from 'next/navigation';
import Actor_Navbar from '@/components/actors/common/navbar/Actor_Navbar';

type Props = {
  opened: boolean;
  toggle: () => void;
};
export default function Header_Drawer({ opened, toggle }: Props) {
  const pathname = usePathname();

  const isActorPage = pathname.includes('actor');
  return (
    <Drawer
      position='left'
      opened={opened}
      onClose={toggle}
      size={300}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      dir='rtl'
      hiddenFrom='lg'
    >
      <Stack h='100%' px='md'>
        {/* In actor pages  or In landing page */}
        {isActorPage ? <Actor_Navbar /> : <Header_Links />}
      </Stack>
    </Drawer>
  );
}
