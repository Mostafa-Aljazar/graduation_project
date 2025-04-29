'use client';
import { AppShell, Burger, Button, Flex, Group } from '@mantine/core';
import Image from 'next/image';
import { logo } from '@/assets/common';
import Header_Links from './Header_Links';
import Link from 'next/link';
import { ACTOR_ROUTES, AUTH_ROUTES } from '@/content/routes';
import Header_Drawer from './Header_Drawer';
import { usePathname } from 'next/navigation';
import { logout } from '@/utils/auth/logout';
import useAuth from '@/hooks/useAuth';

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function Header({ opened, toggle }: Props) {
  const pathname = usePathname();
  const isActor = pathname.includes(ACTOR_ROUTES.ACTOR);
  const { isAuthenticated } = useAuth();

  return (
    <AppShell.Header
      zIndex={50}
      withBorder={false}
      className='!bg-second-light'
    >
      <Flex justify='space-between' align='center' h='100%' px='md'>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='md' size='sm' />
          <Image
            src={logo}
            alt='Logo'
            width={70}
            height={70}
            className='rounded-xl'
            priority
          />
        </Group>

        {!isActor && (
          <Group h='100%' px='md' gap={25} visibleFrom='md'>
            <Header_Links />
          </Group>
        )}

        {isAuthenticated ? (
          <Button
            variant='outline'
            w={100}
            h={32}
            p={0}
            fw={600}
            onClick={logout}
          >
            تسجيل خروج
          </Button>
        ) : (
          <Link href={AUTH_ROUTES.LOGIN}>
            <Button variant='outline' w={100} h={32} p={0} fw={600}>
              تسجيل دخول
            </Button>
          </Link>
        )}
      </Flex>

      <Header_Drawer opened={opened} toggle={toggle} />
    </AppShell.Header>
  );
}
