'use client';
import { Stack } from '@mantine/core';
import Profile_Info from './profile-info';
import Navigation_Links from './navigation-links';

export default function Actor_Navbar() {
  return (
    <Stack p={{ base: 5, md: 10 }} w='100%' h='100%' justify='flex-start' align='center'>
      <Profile_Info />
      <Navigation_Links />
    </Stack>
  );
}
