import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { BLOG_CHILD } from '@/assets/landing/blog';
import Our_Blog_Or_Stories from '@/components/landing/common/blog-stories/our-blog-or-stories';
import Child_Section from '@/components/landing/common/child-section';
import Hero_Section from '@/components/landing/common/hero-section';
import { DESTINATION_HERO_SECTION } from '@/content/landing';
import { Suspense } from 'react';

export default function Blog() {
  const child_description = (
    <>
      النزوح <span className='text-red-500'>يسرق</span> الطفولة ، لكنه لا يستطيع{' '}
      <span className='text-red-500'>قتل</span> البراءة
    </>
  );

  return (
    <>
      <Hero_Section destination={DESTINATION_HERO_SECTION.BLOG} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Our_Blog_Or_Stories destination={TYPE_WRITTEN_CONTENT.BLOG} />
      </Suspense>

      <Child_Section child_image={BLOG_CHILD} desc={child_description} />
    </>
  );
}
