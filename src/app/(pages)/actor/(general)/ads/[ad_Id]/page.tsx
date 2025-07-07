import Ad_Content from '@/components/actors/general/ads/ad/ad-content';

export default async function Ad_Page({
  params,
}: {
  params: Promise<{ ad_Id: string }>;
}) {
  const { ad_Id } = await params;

  return <Ad_Content ad_Id={Number(ad_Id)} />;
}
