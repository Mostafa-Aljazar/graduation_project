import { MANAGER_DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager_Id: string; aid_Id: string }>;
}) {
  const { manager_Id, aid_Id } = await params;

  return (
    <Manager_Aid_Page
      aid_Id={parseInt(aid_Id)}
      manager_Id={parseInt(manager_Id)}
      destination={MANAGER_DESTINATION_AID.AID}
    />
  );
}
