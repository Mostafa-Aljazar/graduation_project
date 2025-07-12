import Aid_Page from '@/components/actors/manager/aids-management/aid/Aid';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager_Id: string; aid_Id: string }>;
}) {
  const { manager_Id, aid_Id } = await params;

  return <div> console.log("🚀 ~ manager_Id:", {manager_Id})</div>;
  return <Aid_Page aid_id={parseInt(aid_Id)} />;
}
