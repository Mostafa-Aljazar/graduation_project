import Manager_Profile_Form from '@/components/actors/manager/profile/manager-profile-form';
import { Suspense } from 'react';

export default async function Manager_Profile({
  params,
}: {
  params: Promise<{ manager: string }>;
}) {
  const { manager } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Manager_Profile_Form
        manager_Id={parseInt(manager)}
        // destination={ACTION_ADD_EDIT_DISPLAY.DISPLAY}
      />
    </Suspense>
  );
}
