'use client';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { ROUTES } from '@/content/routes';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Image from 'next/image';
import { logo } from '@/assets/common';

export default function Mantine_Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pinned = useHeadroom({ fixedAt: 70 });
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      // footer={{ height: 40, collapsed: !pinned, offset: false }}
      navbar={{
        width: {
          base: 0,
          md: 225,
          lg: 300,
        },
        breakpoint: 'md',
        collapsed: { mobile: false, desktop: false },
      }}
      className='w-full min-h-screen'
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

      <AppShell.Main
        // pt={pathname.includes(ROUTES.MESSAGES) ? 0 : 60}
        className='!flex-1 !bg-amber-400 !w-full'
      >
        {/* {children} */}
      </AppShell.Main>

      {/* <Aside /> */}
      {/*<Footer /> */}
    </AppShell>
  );
}
