import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import { USER_RANK } from '@/constants/userTypes';
import { Stack } from '@mantine/core';

export default async function Displaced_Complaints({
  params,
}: {
  params: Promise<{ displaced_Id: string }>;
}) {
  const { displaced_Id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      {/* <Common_Complaints_Header_Tabs /> */}
      <Common_Complaints_Content
        actor_Id={Number(displaced_Id)}
        rank={USER_RANK.DISPLACED}
      />
    </Stack>
  );
}
