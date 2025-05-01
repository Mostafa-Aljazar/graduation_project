import Child_Blog from '@/components/blog/Child_Blog';
import Our_Blog from '@/components/blog/Our_Blog';

import Hero_Section from '@/components/home/Hero_Section';
import Success_Stories from '@/components/home/Success_Stories_Landing';
import {
  HERO_DESCRIPTION,
  HERO_IMAGES,
  HERO_TITLE,
} from '@/content/landing/blog';
import { Stack } from '@mantine/core';

export default function Success_Story() {
  return (
    <Stack
      pt={60}
      gap={0}
      w={'100%'}
      className='!relative !h-screen text-third'
    >
      <Success_Stories />
    </Stack>
  );
}
