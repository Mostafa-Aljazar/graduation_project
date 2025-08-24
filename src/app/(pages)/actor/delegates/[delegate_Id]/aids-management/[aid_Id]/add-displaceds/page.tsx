import Delegate_Aid_Add_Displaceds_Page from '@/components/actors/delegate/aids-management/add-displaceds/delegate-aid-add-displaceds-page';

export default async function Delegate_Add_Displaceds_Aid({
  params,
}: {
  params: Promise<{ delegate_Id: string; aid_Id: string }>;
}) {
  const { delegate_Id, aid_Id } = await params;

  return (
    <Delegate_Aid_Add_Displaceds_Page
      aid_Id={parseInt(aid_Id)}
      delegate_Id={parseInt(delegate_Id)}
    />
  );
}
