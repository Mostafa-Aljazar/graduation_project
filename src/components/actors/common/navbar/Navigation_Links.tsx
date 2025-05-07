'use client';
import { Box, Stack, Text } from '@mantine/core';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  guestManagerNavLinks,
  managerNavLinks,
} from '@/content/actor/manager/navLinks';
import useAuth from '@/hooks/useAuth';
import {
  delegateNavLinks,
  displacedAsGuestDelegateNavLinks,
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

// Define types for navigation links to ensure type safety
interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number }>;
}

export default function Navigation_Links() {
  const {
    user,
    isDelegate,
    isDisplaced,
    isSecurity,
    isSecurityOfficer,
    isManager,
  } = useAuth();

  const pathname = usePathname();

  // Extract ID from pathname (e.g., /actor/displaced/1/profile)
  const getIdFromPathname = (path: string): number => {
    if (!pathname.includes(path)) return 0;
    const segments = pathname.split('/');
    const idIndex = segments.indexOf(path) + 1;
    return idIndex < segments.length ? Number(segments[idIndex]) || 0 : 0;
  };

  // Determine navigation links based on user role and pathname
  const getNavLinks = useMemo(() => {
    // get user id from registered user as number
    const userId = Number(user?.id) || 0;

    const selectNavLinks = (role: string, isOwnPage: boolean, id: number) => {
      switch (role) {
        case 'displaced':
          // Return (authenticated or guest) displaced links
          return isOwnPage
            ? displacedNavLinks(userId)
            : guestDisplacedNavLinks(id);
        case 'delegate':
          // Handle delegate links, with special case for displaced users (get just profile)
          if (isOwnPage) return delegateNavLinks(userId);
          return isDisplaced
            ? displacedAsGuestDelegateNavLinks(id)
            : guestDelegateNavLinks(id);
        case 'security':
          return isOwnPage
            ? securityNavLinks(userId)
            : guestSecurityNavLinks(id);
        case 'manager':
          return isOwnPage ? managerNavLinks(userId) : guestManagerNavLinks(id);
        default:
          return null;
      }
    };

    // Check specific role-based paths
    if (pathname.includes('/displaced/')) {
      const displacedId = getIdFromPathname('displaced'); // get displaced id from url
      return selectNavLinks(
        'displaced',
        isDisplaced && userId === displacedId, // check if the user is guest or in his main pages
        displacedId // displaced id from url,  it might be my ID or the guest ID.
      );
    } else if (pathname.includes('/delegate/')) {
      const delegateId = getIdFromPathname('delegate');
      return selectNavLinks(
        'delegate',
        isDelegate && userId === delegateId,
        delegateId
      );
    } else if (pathname.includes('/security/')) {
      const securityId = getIdFromPathname('security');
      return selectNavLinks(
        'security',
        (isSecurity || isSecurityOfficer) && userId === securityId,
        securityId
      );
    } else if (pathname.includes('/manager/')) {
      const managerId = getIdFromPathname('manager');
      return selectNavLinks(
        'manager',
        isManager && userId === managerId,
        managerId
      );
    }

    // Now, handle general pages (common pages) for registered users
    if (isDisplaced) return displacedNavLinks(userId);
    if (isDelegate) return delegateNavLinks(userId);
    if (isSecurity || isSecurityOfficer) return securityNavLinks(userId);
    if (isManager) return managerNavLinks(userId);

    return null;
  }, [pathname]);

  return (
    <Box w='100%' className='shadow-xl rounded-[20px] !overflow-hidden'>
      <Stack gap={0}>
        {getNavLinks?.map((link: NavLink, index: number) => {
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'flex items-center gap-2 px-2 py-4 text-dark hover:bg-gray-200 transition-colors border-0 border-gray-100',
                index !== getNavLinks.length - 1 && 'border-b-1', // remove border bottom from last item
                isActive &&
                  'bg-gradient-to-l from-primary to-white font-semibold'
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
