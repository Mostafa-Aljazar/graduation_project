'use client';
import { AppShell, Skeleton } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import { usePathname } from 'next/navigation';
import { ACTOR_ROUTES } from '@/content/routes';
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
      flex={1}
      withBorder={false}
      className='!flex !flex-col !w-full !min-h-screen'
    >
      <Header opened={opened} toggle={toggle} />
      {/* <Navbar /> */}
      {/* <AppShell.Navbar p='md' mt={60} className=''>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} bg={'red'} />
          ))}
      </AppShell.Navbar> */}

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
