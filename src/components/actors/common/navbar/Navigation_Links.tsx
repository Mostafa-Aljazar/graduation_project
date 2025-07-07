'use client';

import { Box, Stack, Text } from '@mantine/core';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import useAuth from '@/hooks/useAuth';
import {
  managerNavLinks,
  guestManagerNavLinks,
} from '@/content/actor/manager/navLinks';
import {
  delegate_NavLinks,
  guest_Delegate_NavLinks,
  displaced_As_Guest_Delegate_NavLinks,
  security_OR_delegate_As_Guest_Delegate_NavLinks,
} from '@/content/actor/delegate/navLinks';
import {
  security_NavLinks,
  guest_Security_NavLinks,
  manager_OR_Security_Guest_Security_NavLinks,
} from '@/content/actor/security/navLinks';
import {
  displaced_NavLinks,
  guest_Displaced_NavLinks,
} from '@/content/actor/displaced/navLinks';

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
  const userId = Number(user?.id) || 0;
  const pathname = usePathname();

  const extractId = (key: string) => {
    const parts = pathname.split('/');
    const idx = parts.indexOf(key) + 1;
    return idx > 0 && idx < parts.length ? Number(parts[idx]) || 0 : 0;
  };

  const navLinks = useMemo(() => {
    if (pathname.includes('/displaceds/')) {
      if (pathname.includes('/displaceds/add') && isManager) {
        return managerNavLinks(userId);
      } else if (pathname.includes('/displaceds/add') && isDelegate) {
        return delegate_NavLinks(userId);
      } else {
        const id = extractId('displaceds');
        if (isDisplaced && userId === id) return displaced_NavLinks(userId);
        return guest_Displaced_NavLinks(id);
      }
    }

    if (pathname.includes('/delegates/')) {
      if (pathname.includes('/delegates/add') && isManager) {
        return managerNavLinks(userId);
      } else {
        const id = extractId('delegates');
        if (isDelegate && userId === id) return delegate_NavLinks(userId);
        if (isDisplaced) return displaced_As_Guest_Delegate_NavLinks(id);
        if (isDelegate || isSecurity)
          return security_OR_delegate_As_Guest_Delegate_NavLinks(id);
        return guest_Delegate_NavLinks(id);
      }
    }

    if (pathname.includes('/security/')) {
      const id = extractId('security');
      if ((isSecurity || isSecurityOfficer) && userId === id)
        return security_NavLinks(userId);
      if (isDisplaced) return guest_Security_NavLinks(id);
      return manager_OR_Security_Guest_Security_NavLinks(id);
    }

    if (pathname.includes('/manager/')) {
      const id = extractId('manager');
      if (isManager && userId === id) return managerNavLinks(userId);
      return guestManagerNavLinks(id);
    }

    if (isDisplaced) return displaced_NavLinks(userId);
    if (isDelegate) return delegate_NavLinks(userId);
    if (isSecurity || isSecurityOfficer) return security_NavLinks(userId);
    if (isManager) return managerNavLinks(userId);

    return [];
  }, [
    pathname,
    userId,
    isDisplaced,
    isDelegate,
    isSecurity,
    isSecurityOfficer,
    isManager,
  ]);

  return (
    <Box
      w='100%'
      className='!shadow-xl !border-1 !border-gray-200 rounded-[20px] !overflow-hidden'
    >
      <Stack gap={0}>
        {navLinks.map((link, index) => {
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'flex items-center gap-2 px-2 py-4 text-dark hover:bg-gray-200 transition-colors border-0 border-gray-100',
                index !== navLinks.length - 1 && 'border-b-1',
                isActive &&
                  'bg-gradient-to-l from-primary to-white font-semibold'
              )}
            >
              {link.icon && (
                <link.icon
                  size={20}
                  className={cn(isActive ? '!text-white' : '!text-black')}
                />
              )}
              <Text
                fz={16}
                fw={isActive ? 600 : 400}
                className={cn(
                  '!text-nowrap',
                  isActive ? '!text-white' : '!text-black'
                )}
              >
                {link.label}
              </Text>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
