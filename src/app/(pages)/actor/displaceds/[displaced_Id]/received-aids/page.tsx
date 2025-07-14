import Displaced_Received_Aid_Content from '@/components/actors/displaced/received-aids/displaced-recived-aid-content';
import Displaced_Received_Aid_Header_Tabs from '@/components/actors/displaced/received-aids/displaced-received-aids-tabs';
import { Stack } from '@mantine/core';

export default async function Displaced_Received_Aid({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return (
    <Stack
      justify={'center'}
      align={'center'}
      py={20}
      gap={30}
      w={'100%'}
      px={10}
    >
      <Displaced_Received_Aid_Header_Tabs />

      <Displaced_Received_Aid_Content displaced_Id={Number(displaced_Id)} />
    </Stack>
  );
}
