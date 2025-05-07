'use client';
import { Stack } from '@mantine/core';
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
import ProfileInfo from './profile_Info';
import Navigation_Links from './Navigation_Links';

export default function ActorNavbar() {
  return (
    <Stack
      p={{ base: 5, md: 10 }}
      w='100%'
      h='100%'
      justify='flex-start'
      align='center'
    >
      {/* User Profile Section */}
      <ProfileInfo />

      {/* Navigation Links */}
      <Navigation_Links />
    </Stack>
  );
}
