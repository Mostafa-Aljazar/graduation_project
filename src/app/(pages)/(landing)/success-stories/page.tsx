import { BLOG_CHILD } from '@/assets/landing/blog';
import {
  SUCCESS_STORY_HERO_SLIDER_1,
  SUCCESS_STORY_HERO_SLIDER_2,
  SUCCESS_STORY_HERO_SLIDER_3,
  SUCCESS_STORY_HERO_SLIDER_4,
} from '@/assets/landing/success-story';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import Our_Success_Stories from '@/components/landing/success-stories/our-success-stories';
import { HERO_DESCRIPTION, HERO_TITLE } from '@/content/landing/success-story';
import { Suspense } from 'react';

export default function Success_Story() {
  return (
    <>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        slider_images={[
          SUCCESS_STORY_HERO_SLIDER_1,
          SUCCESS_STORY_HERO_SLIDER_2,
          SUCCESS_STORY_HERO_SLIDER_3,
          SUCCESS_STORY_HERO_SLIDER_4,
        ]}
      />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Our_Success_Stories />
      </Suspense>

      <Child_Section
        child_image={BLOG_CHILD}
        desc={
          <>
            النزوح <span className='text-red-500'>يسرق</span> الطفولة ، لكنه لا
            يستطيع <span className='text-red-500'>قتل</span> البراءة
          </>
        }
      />
    </>
  );
}
