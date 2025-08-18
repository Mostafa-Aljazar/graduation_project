'use client';

import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import Displaceds_Filters from '@/components/actors/general/displaceds/content/displaceds-filters';
import { WIFE_STATUS } from '@/@types/actors/common-types/index.type';
import Aid_Add_Displaceds_Table from './common-aid-add-displaceds-table';
import { displacedsFilterValuesType } from '@/validation/actor/general/displaceds/displaceds-filter-form';
import Common_Displaceds_Filters from '@/components/actors/general/common-displaceds/common-displaceds-filters';

interface CommonAidDeliveryDisplacedsProps {
  aid_Data?: Aid;
  actor_Id: number;
  role: 'MANAGER' | 'DELEGATE';
  selectedDisplacedIds: number[];
  setSelectedDisplacedIds: Dispatch<SetStateAction<number[]>>;
}

export default function Common_Aid_Add_Displaceds({
  aid_Data,
  actor_Id,
  role,
  selectedDisplacedIds,
  setSelectedDisplacedIds,
}: CommonAidDeliveryDisplacedsProps) {
  const [localFilters, setLocalFilters] = useState<displacedsFilterValuesType>({
    wife_status: WIFE_STATUS.PREGNANT,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    family_status_type: null,
    delegate: role == 'DELEGATE' ? [actor_Id.toString()] : [],
  });

  const [displacedNum, setDisplacedNum] = useState<number>(
    aid_Data?.selected_displaced_Ids.length as number
  );

  return (
    <Stack>
      <Common_Displaceds_Filters
        destination='AID'
        actor_Id={actor_Id}
        role={role}
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />
      <Aid_Add_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        localFilters={localFilters}
        aid_Data={aid_Data as Aid}
        actor_Id={actor_Id}
        role={role}
        selectedDisplacedIds={selectedDisplacedIds}
        setSelectedDisplacedIds={setSelectedDisplacedIds}
      />
    </Stack>
  );
}
