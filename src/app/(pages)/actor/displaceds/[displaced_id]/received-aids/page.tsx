import Displaced_Received_Aid_Content from '@/components/actors/displaced/received-aids/displaced-recived-aid-content';
import Displaced_Received_Aid_Header_Tabs from '@/components/actors/displaced/received-aids/displaced-received-aids-tabs';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';

export default async function Displaced_Received_Aid({
  params,
}: {
  params: Promise<{ displaced_id: string }>;
}) {
  const { displaced_id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Content displaced_Id={Number(displaced_id)} />
      </Suspense>
    </Stack>
  );
}
