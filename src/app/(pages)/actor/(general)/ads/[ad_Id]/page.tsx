import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { Stack } from '@mantine/core';

export default async function Ad_Page({ params }: { params: Promise<{ ad_Id: string }> }) {
  const { ad_Id } = await params;

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Ad_Blog_Story_Page
        written_content_Id={parseInt(ad_Id)}
        destination={TYPE_WRITTEN_CONTENT.ADS}
      />
    </Stack>
  );
}
