import Security_Data_List from '@/components/actors/general/securities/content/security-data-list';
import { Stack } from '@mantine/core';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { MAN } from '@/assets/actor';
import { getSecuritiesIds } from '@/actions/actors/general/security-data/getSecurities-Ids';



export default function SecurityData() {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Security_Data_List />
    </Stack>
  );
}
