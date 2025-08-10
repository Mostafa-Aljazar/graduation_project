import Manager_Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/manager-add-aid-page';

export default async function Manager_Add_Aid({
  params,
}: {
  params: Promise<{ manager_Id: string }>;
}) {
  const { manager_Id } = await params;

  return <Manager_Add_Aid_Page manager_Id={parseInt(manager_Id)} />;
}
