import Hero_Section from '@/components/home/Hero_Section';
import { HERO_DESCRIPTION, HERO_IMAGES, HERO_TITLE } from '@/content/blog';
import { Button, Stack } from '@mantine/core';

export default function Blog() {
  return (
    <Stack pt={60} className='!bg-sky-200 w-full h-screen text-third'>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        imgs={HERO_IMAGES}
      />
    </Stack>
  );
}
