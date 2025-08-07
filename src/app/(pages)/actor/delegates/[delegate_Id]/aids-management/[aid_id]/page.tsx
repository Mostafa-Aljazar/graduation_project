import { DELEGATE_DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import Delegate_Aid_Page from '@/components/actors/delegate/aids-management/common/delegate-aid-page';

export default async function Delegate_Aid({
  params,
}: {
  params: Promise<{ delegate_Id: string; aid_Id: string }>;
}) {
  const { delegate_Id, aid_Id } = await params;

  return (
    <Delegate_Aid_Page
      aid_Id={parseInt(aid_Id)}
      delegate_Id={parseInt(delegate_Id)}
      destination={DELEGATE_DESTINATION_AID.DELIVERY_AID}
    />
  );
}
