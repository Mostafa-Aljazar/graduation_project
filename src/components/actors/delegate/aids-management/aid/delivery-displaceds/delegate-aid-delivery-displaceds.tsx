'use client';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { useState } from 'react';
import Aid_Displaceds_Table from './delegate-aid-displaceds-table';
import { DESTINATION_AID } from '../../common/delegate-aid-page';
import Aid_Delivery_Displaceds_Filters from '@/components/actors/delegate/aids-management/aid/delivery-displaceds/aid-delivery-displaceds-filters';

interface DelegateAidDeliveryDisplacedsProps {
  aid_Data: Aid;
  destination: DESTINATION_AID;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
    | typeof USER_TYPE.SECURITY_OFFICER
  >;
}

export default function Delegate_Aid_Delivery_Displaceds({
  aid_Data,
  destination,
  actor_Id,
  role,
}: DelegateAidDeliveryDisplacedsProps) {
  // console.log('🚀 ~ aid_Data:', aid_Data);
  const [displacedNum, setDisplacedNum] = useState(
    aid_Data.selected_displaced_ids.length
  );

  return (
    <Stack>
      <Aid_Delivery_Displaceds_Filters displacedNum={displacedNum} />

      <Aid_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        aid_Data={aid_Data}
        actor_Id={actor_Id}
        role={role}
      />
    </Stack>
  );
}
