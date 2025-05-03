'use client';
import { Box, Button, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import { man } from '@/assets/common';
import { LogOut } from 'lucide-react';
import { logout } from '@/utils/auth/logout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { managerNavLinks } from '@/content/actor/manager/navLinks';
import useAuth from '@/hooks/useAuth';
import {
  delegateNavLinks,
  guestDelegateNavLinks,
} from '@/content/actor/delegate/navLinks';
import {
  guestSecurityNavLinks,
  securityNavLinks,
} from '@/content/actor/security/navLinks';
import {
  displacedNavLinks,
  guestDisplacedNavLinks,
} from '@/content/actor/displaced/navLinks';

export default function ActorNavbar() {
  const pathname = usePathname();
  console.log('🚀 ~ ActorNavbar ~ pathname:', pathname);
  const {
    user,
    isDelegate,
    isDisplaced,
    isSecurity,
    isSecurityOfficer,
    isManager,
  } = useAuth();

  // Determine navigation links based on user role and pathname
  const getNavLinks = () => {
    const userId = Number(user?.id) || 0;

    if (pathname.includes('/displaced/')) {
      return isDisplaced && userId
        ? displacedNavLinks(userId)
        : guestDisplacedNavLinks(userId);
    } else if (pathname.includes('/delegate/')) {
      return isDelegate && userId
        ? delegateNavLinks(userId)
        : guestDelegateNavLinks(userId);
    } else if (pathname.includes('/security/')) {
      return (isSecurity || isSecurityOfficer) && userId
        ? securityNavLinks(userId)
        : guestSecurityNavLinks(userId);
    } else if (pathname.includes('/manager/')) {
      return managerNavLinks();
    } else if (isDisplaced) {
      return displacedNavLinks(userId);
    } else if (isDelegate) {
      return delegateNavLinks(userId);
    } else if (isSecurity || isSecurityOfficer) {
      return securityNavLinks(userId);
    }

    return managerNavLinks();
  };

  const navLinks = getNavLinks();

  return (
    <Stack p={10} w='100%' h='100%' justify='flex-start' align='center'>
      {/* User Profile Section */}
      <Stack
        w='100%'
        justify='center'
        align='center'
        gap={10}
        pb={10}
        className='!shadow-xl !rounded-[20px] !overflow-hidden'
      >
        {/* Image */}
        <Box
          w='100%'
          h={70}
          className='!relative !bg-gradient-to-l !from-primary !to-white !rounded-[20px]'
        >
          <Box
            pos='absolute'
            bottom='-50%'
            left='50%'
            className='bg-primary !rounded-full !overflow-hidden !-translate-x-1/2'
            w={85}
            h={85}
          >
            <Image
              src={man}
              alt='Profile'
              width={85}
              height={85}
              className='!object-cover'
            />
          </Box>
        </Box>

        <Group
          justify='center'
          align='baseline'
          gap={3}
          px={5}
          mt={30}
          wrap='nowrap'
        >
          <Text
            fw={500}
            fz={18}
            c='white'
            className='!text-primary !text-nowrap'
          >
            {pathname.includes('/actor/security/')
              ? 'الأمن :'
              : pathname.includes('/actor/delegate/')
              ? 'المندوب :'
              : pathname.includes('/actor/displaced/')
              ? 'النازح :'
              : 'المدير :'}
          </Text>
          <Text fw={400} fz={16} c='white' className='!text-primary'>
            {user?.name ?? 'غير معروف'}
          </Text>
        </Group>
        <Text
          fw={400}
          fz={14}
          c='white'
          ta='center'
          className='!text-primary'
          dir='ltr'
        >
          {user?.phone_number ?? 'لا يوجد رقم هاتف'}
        </Text>

        <Button
          variant='transparent'
          size='xs'
          radius='md'
          fw={500}
          fz={16}
          color='gray'
          leftSection={<LogOut size={20} />}
          onClick={logout}
        >
          تسجيل الخروج
        </Button>
      </Stack>

      {/* Navigation Links */}
      <Box w='100%' className='!shadow-xl !rounded-[20px] !overflow-hidden'>
        <Stack gap={0}>
          {navLinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 p-4 text-dark hover:bg-gray-200 transition-colors !border-0 !border-gray-100 !border-b-1',
                  pathname.includes(link.href) &&
                    '!bg-gradient-to-l !from-primary !to-white  !font-semibold  '
                )}
              >
                {link.icon && <link.icon size={20} />}
                <Text fz={18}>{link.label}</Text>
              </Link>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
