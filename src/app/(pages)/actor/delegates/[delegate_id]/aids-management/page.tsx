import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';

export default async function Delegate_Aids_Management({
  params,
}: {
  params: Promise<{ delegate_id: string }>;
}) {
  const { delegate_id } = await params;

  return <Common_Aids_Management_Page delegate_Id={Number(delegate_id)} />;
}
