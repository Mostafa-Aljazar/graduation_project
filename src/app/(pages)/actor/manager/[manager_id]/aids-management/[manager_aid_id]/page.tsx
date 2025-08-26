import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';
import { Suspense } from 'react';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager_id: string; manager_aid_id: string }>;
}) {
  const { manager_id, manager_aid_id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Aid_Page aid_Id={parseInt(manager_aid_id)} manager_Id={parseInt(manager_id)} />;
    </Suspense>
  );
}
