'use client';
import { Stack } from '@mantine/core';
import ProfileInfo from './profile_Info';
import Navigation_Links from './Navigation_Links';

export default function Actor_Navbar() {
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
