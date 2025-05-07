'use client';
import { Box, Stack, Text } from '@mantine/core';
import React from 'react';
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

export default function Navigation_Links() {
  const pathname = usePathname();
  // console.log('🚀 ~ ActorNavbar ~ pathname:', pathname);
  const {
    user,
    isDelegate,
    isDisplaced,
    isSecurity,
    isSecurityOfficer,
    // isManager,
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
    <Box w='100%' className='!shadow-xl !rounded-[20px] !overflow-hidden'>
      <Stack gap={0}>
        {navLinks.map((link, index) => {
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'flex items-center gap-2 px-2 py-4   text-dark hover:bg-gray-200 transition-colors !border-0 !border-gray-100 !border-b-1',
                isActive &&
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
  );
}
