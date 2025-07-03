import Delegate_Complaints_Content from '@/components/actors/delegate/complaints/delegate-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
// import Delegate_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { Stack } from '@mantine/core';

export default async function Complaints({
  params,
}: {
  params: Promise<{ delegate_Id: string }>;
}) {
  const { delegate_Id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Common_Complaints_Header_Tabs />
      <Delegate_Complaints_Content delegate_ID={Number(delegate_Id)} />
    </Stack>
  );
}
