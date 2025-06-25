import Aid_Page from '@/components/actors/manager/aids-management/aid/Aid';

export default async function Page({
  params,
}: {
  params: Promise<{ aid_id: string }>;
}) {
  const { aid_id } = await params;

  return <Aid_Page aid_id={parseInt(aid_id)} />;
}
