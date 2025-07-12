'use client';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { useState } from 'react';
import { DESTINATION_AID } from '../../common/delegate-aid-page';
import { displacedFilterValues } from '@/validation/actor/general/displaced-filter-form';
import Aid_Add_Displaceds_Filters from './aid-add-displaceds-filters';
import Aid_Ad_Displaceds_Table from './aid-add-displaceds-table';

interface DelegateAidDeliveryDisplacedsProps {
  aid_Data: Aid;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
    | typeof USER_TYPE.SECURITY_OFFICER
  >;
}

export default function Delegate_Aid_Add_Displaceds({
  aid_Data,
  actor_Id,
  role,
}: DelegateAidDeliveryDisplacedsProps) {
  const [localFilters, setLocalFilters] = useState<displacedFilterValues>({
    wife_status: null,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    case_type: null,
    delegate: role == 'DELEGATE' ? [actor_Id.toString()] : [],
  });

  const [displacedNum, setDisplacedNum] = useState(
    aid_Data.selected_displaced_ids.length
  );

  return (
    <Stack>
      <Aid_Add_Displaceds_Filters
        actor_Id={actor_Id}
        role={role}
        displacedNum={displacedNum}
        setLocalFilters={setLocalFilters}
      />

      <Aid_Ad_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        localFilters={localFilters}
        aid_Data={aid_Data}
        actor_Id={actor_Id}
        role={role}
      />
    </Stack>
  );
}
