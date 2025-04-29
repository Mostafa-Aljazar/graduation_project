'use client';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { ROUTES } from '@/content/routes';
import { usePathname } from 'next/navigation';
import Header from './Header/Header';
import Image from 'next/image';
import { logo } from '@/assets/common';
import Footer from './Footer/Footer';

export default function Mantine_Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pinned = useHeadroom({ fixedAt: 70 });
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout='alt'
      header={{ height: 60, collapsed: !pinned, offset: false }}
      footer={{ height: 40, offset: false }}
      navbar={{
        width: 0,
        breakpoint: 'md',
        collapsed: { mobile: !pinned },
      }}
      className='w-full !h-full'
    >
      <Header opened={opened} toggle={toggle} />

      <AppShell.Navbar p='md' mt={60} className='' hidden>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} />
          ))}
      </AppShell.Navbar>
      {/* <Navbar /> */}

      <AppShell.Main bg={'white'} flex={1} className='!flex-1 !w-full !h-full'>
        {children}
      </AppShell.Main>
      <AppShell.Footer p='md' bg={'red'}>
        Footer
      </AppShell.Footer>
    </AppShell>
  );
}
