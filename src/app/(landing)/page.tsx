import Hero_Section from '@/components/home/Hero_Section';
import { Button, Stack } from '@mantine/core';

export default function Home() {
  return (
    <Stack pt={60} className='!bg-sky-200 w-full h-screen text-third'>
      <Hero_Section />
    </Stack>
  );
}
