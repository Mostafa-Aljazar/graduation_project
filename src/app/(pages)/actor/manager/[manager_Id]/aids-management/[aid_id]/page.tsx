import Aid_Page from '@/components/actors/manager/aids-management/aid/aid-page';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager_Id: string; aid_Id: string }>;
}) {
  const { manager_Id, aid_Id } = await params;

  return (
    <Aid_Page
      aid_Id={parseInt(aid_Id)}
      actor_Id={parseInt(manager_Id)}
      role='MANAGER'
    />
  );
}
