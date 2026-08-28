import { Suspense } from 'react';
import { Stack } from '@mantine/core';

import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import { getDisplacedReceivedAids } from '@/actions/actors/displaced/received-aids/getDisplacedReceivedAids';
import Displaced_Received_Aid_Content from '@/components/actors/displaced/received-aids/displaced-recived-aid-content';
import Displaced_Received_Aid_Header_Tabs from '@/components/actors/displaced/received-aids/displaced-received-aids-tabs';
import {
  DISPLACED_RECEIVED_AIDS_TABS,
  GET_DISPLACED_RECEIVED_AIDS_TABS,
} from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';
import { APP_URL } from '@/constants/services';
import { DISPLACED_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { displaced: string  };
  searchParams: { 'received-aids-tab'?: DISPLACED_RECEIVED_AIDS_TABS  };
}


export default function Displaced_Received_Aid({ params }: Props) {
  const { displaced } = params;
  const displacedId = Number(displaced);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Content displaced_Id={displacedId} />
      </Suspense>
    </Stack>
  );
}
