import Delegate_Aid_Page from '@/components/actors/delegate/aids-management/add-displaceds/delegate-aid-add-displaceds-page';

export default async function Delegate_Aid({
  params,
}: {
  params: Promise<{ delegate_Id: string; aid_id: string }>;
}) {
  const { delegate_Id, aid_id } = await params;

  return <Delegate_Aid_Page aid_Id={parseInt(aid_id)} delegate_Id={parseInt(delegate_Id)} />;
}
