import {
  HOME_CHILD,
  HOME_HERO_SLIDER_1,
  HOME_HERO_SLIDER_2,
  HOME_HERO_SLIDER_3,
} from '@/assets/landing/home';
import About_Us from '@/components/landing/home/about-us';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import Services from '@/components/landing/home/services';
import Statistics from '@/components/landing/home/statistics';
import Success_Stories from '@/components/landing/home/success-stories/success-stories';
import { HERO_DESCRIPTION, HERO_TITLE } from '@/content/landing/home';

export default function Home() {
  return (
    <>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        slider_images={[
          HOME_HERO_SLIDER_1,
          HOME_HERO_SLIDER_2,
          HOME_HERO_SLIDER_3,
        ]}
      />
      <About_Us />
      <Statistics />
      <Services />
      <Child_Section
        child_image={HOME_CHILD}
        desc={
          <>
            رغم <span className='text-red-600'>الألم</span> إلا أنه هناك دائماً
            <span className='text-green-600'>أمل</span>
            💡
          </>
        }
      />
      <Success_Stories />
    </>
  );
}
