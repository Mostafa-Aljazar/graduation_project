import Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import { Stack } from '@mantine/core';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegates';
import { APP_URL } from '@/constants/services';
import { MAN } from '@/assets/actor';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';



export default function Delegates() {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Delegates_List />
    </Stack>
  );
}
