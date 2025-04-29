import Footer from '@/components/common/Footer';
import About_Us from '@/components/home/About_Us';
import Child_Home from '@/components/home/Child_Home';
import Hero_Section from '@/components/home/Hero_Section';
import Services from '@/components/home/Services';
import Statistics from '@/components/home/Statistics';
import Success_Stories_Landing from '@/components/home/Success_Stories_Landing';
import { HERO_DESCRIPTION, HERO_IMAGES, HERO_TITLE } from '@/content/home';
import { Stack } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        imgs={HERO_IMAGES}
      />
      <About_Us />
      <Statistics />
      <Services />
      <Child_Home />
      <Success_Stories_Landing />
    </>
  );
}
