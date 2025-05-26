'use client';
import { AppShell, Burger, Button, Flex, Group } from '@mantine/core';
import Image from 'next/image';
import Header_Links from './Header_Links';
import Link from 'next/link';
import { AUTH_ROUTES, LANDING_ROUTES } from '@/constants/routes';
import Header_Drawer from './Header_Drawer';
import { usePathname } from 'next/navigation';
import { logout } from '@/utils/auth/logout';
import useAuth from '@/hooks/useAuth';
import { LOGO } from '@/assets/common';
import { LogIn, LogOut } from 'lucide-react';

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function Header({ opened, toggle }: Props) {
  const pathname = usePathname();
  const isActor = pathname.includes('actor');
  const { isAuthenticated } = useAuth();

  return (
    <AppShell.Header
      zIndex={50}
      withBorder={false}
      className='!bg-second-light'
    >
      <Flex justify='space-between' align='center' h='100%' px='md'>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='lg' size='sm' />
          <Link href={LANDING_ROUTES.HOME}>
            <Image
              src={LOGO}
              alt='Logo'
              width={70}
              height={70}
              className='rounded-xl'
              priority
            />
          </Link>
        </Group>

        {!isActor && (
          <Group h='100%' px='md' gap={25} visibleFrom='lg'>
            <Header_Links />
          </Group>
        )}

        {isAuthenticated ? (
          <Button
            variant='outline'
            h={32}
            fw={600}
            onClick={logout}
            rightSection={<LogOut size={18} />}
          >
            خروج
          </Button>
        ) : (
          <Link href={AUTH_ROUTES.LOGIN}>
            <Button
              variant='outline'
              h={32}
              fw={600}
              rightSection={<LogIn size={18} />}
            >
              دخول
            </Button>
          </Link>
        )}
      </Flex>

      <Header_Drawer opened={opened} toggle={toggle} />
    </AppShell.Header>
  );
}
