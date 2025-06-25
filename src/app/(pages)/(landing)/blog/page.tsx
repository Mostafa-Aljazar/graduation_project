'use client';
import {
  BLOG_CHILD,
  BLOG_HERO_SLIDER_1,
  BLOG_HERO_SLIDER_2,
  BLOG_HERO_SLIDER_3,
} from '@/assets/landing/blog';
import Our_Blog from '@/components/landing/blog/our-blog';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import { HERO_DESCRIPTION, HERO_TITLE } from '@/content/landing/blog';
import { Suspense } from 'react';

export default function Blog() {
  return (
    <>
      <Hero_Section
        title={HERO_TITLE}
        desc={HERO_DESCRIPTION}
        slider_images={[
          BLOG_HERO_SLIDER_1,
          BLOG_HERO_SLIDER_2,
          BLOG_HERO_SLIDER_3,
        ]}
      />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Our_Blog />
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
