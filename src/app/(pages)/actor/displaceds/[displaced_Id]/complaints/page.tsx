import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { Stack } from '@mantine/core';

export default async function Displaced_Complaints({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;
  console.log('🚀 ~ Displaced_Complaints : displaced_Id:', displaced_Id);

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      {/* <Common_Complaints_Header_Tabs /> */}
      <Common_Complaints_Content displaced_Id={Number(displaced_Id)} />
    </Stack>
  );
}
