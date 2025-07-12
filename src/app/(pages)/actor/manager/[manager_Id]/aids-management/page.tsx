import Common_Aids_Management_Page from '@/components/actors/general/aids-management/main/content/common-aids-management-page';

export default async function Manager_Aids_Management({
  params,
}: {
  params: Promise<{ manager_Id: string }>;
}) {
  const { manager_Id } = await params;

  return <Common_Aids_Management_Page manager_Id={Number(manager_Id)} />;
}
