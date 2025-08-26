import Displaced_Profile_Form from '@/components/actors/displaced/profile/displaced-profile-form';
import { Suspense } from 'react';

export default async function Displaced_Profile({
  params,
}: {
  params: Promise<{ displaced: string }>;
}) {
  const { displaced } = await params;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Profile_Form displaced_Id={parseInt(displaced)} />
      </Suspense>
    </>
  );
}
