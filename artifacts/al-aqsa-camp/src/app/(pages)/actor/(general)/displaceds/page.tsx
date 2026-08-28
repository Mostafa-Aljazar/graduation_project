import Displaceds_List from '@/components/actors/general/displaceds/content/displaceds-list';
import { Stack } from '@mantine/core';
import { getDisplaceds } from '@/actions/actors/general/displaceds/getDisplaceds';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { MAN } from '@/assets/actor';



export default function Displaceds() {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Displaceds_List />
    </Stack>
  );
}
