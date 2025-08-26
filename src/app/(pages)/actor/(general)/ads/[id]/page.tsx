import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';

export default async function Ad_Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Suspense fallback={<div>Loading...</div>}>
        <Ad_Blog_Story_Page
          written_content_Id={parseInt(id)}
          destination={TYPE_WRITTEN_CONTENT.ADS}
        />
      </Suspense>
    </Stack>
  );
}
