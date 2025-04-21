'use client';
import {
  AppShell,
  Burger,
  Button,
  Drawer,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/content/routes';
import { cn } from '@/utility/cn';
import { logo } from '@/assets/common';
import Link from 'next/link';
import { NAVBAR_LINKS } from '@/content/common/header';
import { useEffect, useState } from 'react';

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function Header({ opened, toggle }: Props) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  useEffect(() => {
    if (pathname !== ROUTES.HOME || !window.location.hash) {
      setCurrentHash('');
    }
  }, [pathname]);

  const isLinkActive = (link: string) => {
    const isAnchorLink = link.startsWith('/#');
    const linkHash = isAnchorLink ? link.slice(1) : '';

    if (isAnchorLink) {
      return pathname === ROUTES.HOME && currentHash === linkHash;
    }

    return pathname === link && !currentHash;
  };

  const handleLinkClick = (link: string) => {
    if (link.startsWith('/#')) {
      const hash = link.slice(1);
      setCurrentHash(hash);
    } else {
      setCurrentHash('');
    }
  };

  return (
    <AppShell.Header zIndex={50} withBorder={false} className='bg-GrayLight'>
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

        <Group h='100%' px='md' visibleFrom='md'>
          {NAVBAR_LINKS.map((item) => (
            <Link
              href={item.link}
              key={item.key}
              onClick={() => handleLinkClick(item.link)}
            >
              <Text
                fw={600}
                fz={18}
                className={cn(
                  'text-primary',
                  isLinkActive(item.link) && '!text-red-500'
                )}
              >
                {item.label}
              </Text>
            </Link>
          ))}
        </Group>

        <Button variant='outline' w={100} h={32} p={0} fw={600}>
          تسجيل دخول
        </Button>
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
          {NAVBAR_LINKS.map((item) => (
            <Link
              href={item.link}
              key={item.key}
              onClick={() => handleLinkClick(item.link)}
            >
              <Text
                fw={600}
                fz={18}
                className={cn(
                  'text-primary',
                  isLinkActive(item.link) && '!text-red-500'
                )}
              >
                {item.label}
              </Text>
            </Link>
          ))}
        </Stack>
      </Drawer>
    </AppShell.Header>
  );
}
