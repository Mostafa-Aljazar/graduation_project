import Ads_Blogs_Stories_Page from '@/components/actors/manager/ads-blogs-stories/main/content/ads-blogs-stories-page';
import { Suspense } from 'react';

export default async function Ads_Blogs_Stories({
  params,
}: {
  params: Promise<{ manager: string }>;
}) {
  const { manager } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ads_Blogs_Stories_Page manager_Id={Number(manager)} />
    </Suspense>
  );
}
