import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import { Stack } from '@mantine/core';

export default async function Manager_Complaints({
  params,
}: {
  params: Promise<{ manager_Id: string }>;
}) {
  const { manager_Id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      {/* <Common_Complaints_Header_Tabs /> */}
      <Common_Complaints_Content manager_Id={Number(manager_Id)} />
    </Stack>
  );
}
