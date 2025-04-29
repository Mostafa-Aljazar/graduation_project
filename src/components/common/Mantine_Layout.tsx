'use client';
import { AppShell, Skeleton } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import Header from './Header';
import Footer from './Footer';

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
      navbar={{
        width: 0,
        breakpoint: 'md',
        collapsed: { mobile: !pinned },
      }}
      flex={1}
      withBorder={false}
      className='!flex !flex-col !w-full !min-h-screen'
    >
      <Header opened={opened} toggle={toggle} />
      {/* <Navbar /> */}
      <AppShell.Main
        pt={60}
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
