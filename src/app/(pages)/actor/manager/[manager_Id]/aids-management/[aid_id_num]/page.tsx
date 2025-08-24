import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';
import { Suspense } from 'react';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager_Id: string; aid_id_num: string }>;
}) {
  const { manager_Id, aid_id_num } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Aid_Page aid_Id={parseInt(aid_id_num)} manager_Id={parseInt(manager_Id)} />;
    </Suspense>
  );
}
