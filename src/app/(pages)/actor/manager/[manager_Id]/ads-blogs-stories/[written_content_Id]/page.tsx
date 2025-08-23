import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { Suspense } from 'react';

export default async function Manager_Aid_Blog_Story({
  params,
}: {
  params: Promise<{ manager_Id: string; written_content_Id: string }>;
}) {
  const { manager_Id, written_content_Id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ad_Blog_Story_Page written_content_Id={parseInt(written_content_Id)} />;
    </Suspense>
  );
}
