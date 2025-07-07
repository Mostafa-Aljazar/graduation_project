import { Stack } from '@mantine/core';
import Security_Tasks_Header_Tabs from '@/components/actors/security/tasks/security-tasks-tabs';
import Security_Tasks_Content from '@/components/actors/security/tasks/security-tasks-content';

export default async function Security_Tasks({
  params,
}: {
  params: Promise<{ security_Id: string }>;
}) {
  const { security_Id } = await params;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Security_Tasks_Header_Tabs />
      <Security_Tasks_Content security_Id={Number(security_Id)} />
    </Stack>
  );
}
