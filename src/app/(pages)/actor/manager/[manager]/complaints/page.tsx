import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import { USER_RANK } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';

export default async function Manager_Complaints({
  params,
}: {
  params: Promise<{ manager: string }>;
}) {
  const { manager } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <Common_Complaints_Content actor_Id={Number(manager)} rank={USER_RANK.MANAGER} />
      </Suspense>
    </Stack>
  );
}
