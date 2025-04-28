
import Child_Blog from '@/components/blog/Child_Blog';
import Our_Blog from '@/components/blog/Our_Blog';

import Hero_Section from '@/components/home/Hero_Section';
import { HERO_DESCRIPTION, HERO_IMAGES, HERO_TITLE } from '@/content/blog';
import { Stack } from '@mantine/core';

export default function Blog() {
  return (
    <Stack
      pt={60}
      gap={0}
      w={'100%'}
      className='!relative !h-screen text-third'
    >
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        imgs={HERO_IMAGES}
      />

      <Our_Blog />

      <Child_Blog />


      
    </Stack>
  );
}
