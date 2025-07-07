import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { Stack } from '@mantine/core';

export default async function Security_Complaints({
  params,
}: {
  params: Promise<{ security_Id: string }>;
}) {
  const { security_Id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Common_Complaints_Header_Tabs />
      <Common_Complaints_Content security_Id={Number(security_Id)} />
    </Stack>
  );
}
