import Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import { Stack } from '@mantine/core';

export default function Delegates() {
  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Delegates_List />
    </Stack>
  );
}
