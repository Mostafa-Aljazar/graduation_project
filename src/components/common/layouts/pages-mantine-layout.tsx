'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ReactNode } from 'react';

export default function Pages_Mantine_Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pinned = useHeadroom({ fixedAt: 70 });
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      flex={1}
      withBorder={false}
      className='!flex !flex-col !w-full !min-h-screen'
    >
      <Header opened={opened} toggle={toggle} />

      <AppShell.Main
        flex={1}
        w={'100%'}
        h={'100%'}
        bg={'white'}
        className='!flex !flex-col !flex-1 !w-full !h-full'
      >
        {children}
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
