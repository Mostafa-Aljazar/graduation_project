import Delegate_Aid_Page, {
  DESTINATION_AID,
} from '@/components/actors/delegate/aids-management/common/delegate-aid-page';

export default async function Delegate_Add_Aid({
  params,
}: {
  params: Promise<{ delegate_Id: string; aid_Id: string }>;
}) {
  const { delegate_Id, aid_Id } = await params;

  return (
    <Delegate_Aid_Page
      aid_id={parseInt(aid_Id)}
      actor_Id={parseInt(delegate_Id)}
      destination={DESTINATION_AID.ADD_AID}
    />
  );
}
