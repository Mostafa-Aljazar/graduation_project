import Manager_Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/manager-add-aid-page';
import { Suspense } from 'react';

export default async function Manager_Add_Aid({
  params,
}: {
  params: Promise<{ manager: string }>;
}) {
  const { manager } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Add_Aid_Page manager_Id={parseInt(manager)} />
    </Suspense>
  );
}
