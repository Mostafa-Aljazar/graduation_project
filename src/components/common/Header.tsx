import {
  AppShell,
  Burger,
  Button,
  Drawer,
  Flex,
  Group,
  Stack,
} from '@mantine/core';
import Image from 'next/image';
import { logo } from '@/assets/common';
import Header_Links from './Header_Links';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/content/routes';

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function Header({ opened, toggle }: Props) {
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
            alt='Twitter logo'
            width={70}
            height={70}
            className='rounded-xl'
            priority
          />
        </Group>

        <Group h='100%' px='md' gap={25} visibleFrom='md'>
          <Header_Links />
        </Group>

        <Link href={AUTH_ROUTES.LOGIN}>
          <Button variant='outline' w={100} h={32} p={0} fw={600}>
            تسجيل دخول
          </Button>
        </Link>
      </Flex>

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
          <Header_Links />
        </Stack>
      </Drawer>
    </AppShell.Header>
  );
}
