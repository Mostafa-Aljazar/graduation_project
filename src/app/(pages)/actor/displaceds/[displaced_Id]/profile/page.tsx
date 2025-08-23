import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { Suspense } from 'react';

export default async function Displaced_Profile({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Profile_Form displaced_Id={parseInt(displaced_Id)} />
      </Suspense>
    </>
  );
}
