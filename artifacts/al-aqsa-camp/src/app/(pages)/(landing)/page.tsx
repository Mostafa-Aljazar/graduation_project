import { HOME_CHILD } from '@/assets/landing/home';
import { FAVICON } from '@/assets/common';
import Hero_Section from '@/components/landing/common/hero-section';
import Child_Section from '@/components/landing/common/child-section';
import Services from '@/components/landing/home/services';
import Statistics from '@/components/landing/home/statistics';
import { DESTINATION_HERO_SECTION } from '@/content/landing';
import { APP_URL } from '@/constants/services';
import { LANDING_ROUTES } from '@/constants/routes';



export default function Home() {
  const childDescription = (
    <>
      رغم <span className='text-red-600'>الألم</span> إلا أنه هناك دائماً
      <span className='text-green-600'> أمل </span> 💡
    </>
  );

  return (
    <>
      <Hero_Section destination={DESTINATION_HERO_SECTION.HOME} />
      <Statistics />
      <Services />
      <Child_Section child_image={HOME_CHILD} desc={childDescription} />
    </>
  );
}
