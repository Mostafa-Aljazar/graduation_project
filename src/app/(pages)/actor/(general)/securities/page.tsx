import Security_Data_List from '@/components/actors/general/security-data/content/security-data-list';
import { Stack } from '@mantine/core';

export default function Security_Data() {
  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Security_Data_List />
    </Stack>
  );
}
