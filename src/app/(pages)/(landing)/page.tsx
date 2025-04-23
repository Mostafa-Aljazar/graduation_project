import Child_Home from '@/components/home/Child_Home';
import Hero_Section from '@/components/home/Hero_Section';
import Success_Stories from '@/components/home/Success_Stories';
import { HERO_DESCRIPTION, HERO_IMAGES, HERO_TITLE } from '@/content/home';
import { Stack } from '@mantine/core';

export default function Home() {
  return (
    <Stack pt={60} gap={0} bg={'white'} className='w-full h-screen text-third'>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        imgs={HERO_IMAGES}
      />

      <Child_Home />

      <Success_Stories />
    </Stack>
  );
}
