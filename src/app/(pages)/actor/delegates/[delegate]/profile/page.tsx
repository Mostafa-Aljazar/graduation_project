import Delegate_Profile_Form from '@/components/actors/delegate/profile/delegate-profile-form';
import { Suspense } from 'react';

export default async function Delegate_Profile({
  params,
}: {
  params: Promise<{ delegate: string }>;
}) {
  const { delegate } = await params;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Delegate_Profile_Form delegate_Id={parseInt(delegate)} />
      </Suspense>
    </>
  );
}
