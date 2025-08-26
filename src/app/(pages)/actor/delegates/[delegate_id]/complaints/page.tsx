import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { USER_RANK } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';

export default async function Delegate_Complaints({
  params,
}: {
  params: Promise<{ delegate_id: string }>;
}) {
  const { delegate_id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <Common_Complaints_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Common_Complaints_Content actor_Id={Number(delegate_id)} rank={USER_RANK.DELEGATE} />
      </Suspense>
    </Stack>
  );
}
