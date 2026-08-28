import { Suspense } from 'react';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { BLOG_CHILD } from '@/assets/landing/blog';
import { FAVICON } from '@/assets/common';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import Our_Blog_Or_Stories from '@/components/landing/common/blog-stories/our-blog-or-stories';
import { DESTINATION_HERO_SECTION } from '@/content/landing';
import { LANDING_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';



export default function Success_Story() {
  const childDescription = (
    <>
      النزوح <span className='text-red-500'>يسرق</span> الطفولة، لكنه لا يستطيع{' '}
      <span className='text-red-500'>قتل</span> البراءة
    </>
  );

  return (
    <>
      <Hero_Section destination={DESTINATION_HERO_SECTION.SUCCESS_STORIES} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Our_Blog_Or_Stories destination={TYPE_WRITTEN_CONTENT.SUCCESS_STORIES} />
      </Suspense>

      <Child_Section child_image={BLOG_CHILD} desc={childDescription} />
    </>
  );
}
