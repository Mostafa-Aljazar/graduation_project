import Child_Blog from '@/components/blog/Child_Blog';
import Our_Blog from '@/components/blog/Our_Blog';
import Hero_Section from '@/components/home/Hero_Section';
import { HERO_DESCRIPTION, HERO_IMAGES, HERO_TITLE } from '@/content/blog';

export default function Blog() {
  return (
    <>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        imgs={HERO_IMAGES}
      />

      <Our_Blog />

      <Child_Blog />
    </>
  );
}
