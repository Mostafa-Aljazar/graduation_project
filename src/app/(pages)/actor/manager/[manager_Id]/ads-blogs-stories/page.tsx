import Ads_Blogs_Stories_Page from '@/components/actors/manager/ads-blogs-stories/main/content/ads-blogs-stories-page';

export default async function Ads_Blogs_Stories({
  params,
}: {
  params: Promise<{ manager_Id: string }>;
}) {
  const { manager_Id } = await params;

  return <Ads_Blogs_Stories_Page manager_Id={Number(manager_Id)} />;
}
