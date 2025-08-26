import Manager_Aid_Page from '@/components/actors/manager/aids-management/aid/manager-aid-page';
import { Suspense } from 'react';

export default async function Manager_Aid({
  params,
}: {
  params: Promise<{ manager: string; aid: string }>;
}) {
  const { manager, aid } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Aid_Page manager_Id={parseInt(manager)} aid_Id={parseInt(aid)} />;
    </Suspense>
  );
}
