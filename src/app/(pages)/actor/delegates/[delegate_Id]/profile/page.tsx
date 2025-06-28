import Delegate_Profile_Form from '@/components/actors/delegate/delegate-profile-form';
import React from 'react';

export default async function Delegate_Profile({
  params,
}: {
  params: Promise<{ delegate_Id: string }>;
}) {
  const { delegate_Id } = await params;

  return <Delegate_Profile_Form delegate_ID={Number(delegate_Id)} />;
}
