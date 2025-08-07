'use client';

import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { useState } from 'react';
import Aid_Add_Displaceds_Filters from './aid-add-displaceds-filters';
import Aid_Ad_Displaceds_Table from './aid-add-displaceds-table';
import { displacedsFilterValues } from '@/validation/actor/general/displaceds-filter-form';
import Displaceds_Filters from '@/components/actors/general/displaceds/content/displaceds-filters';
import Common_Displaceds_Filters from '@/components/actors/general/common-displaceds/common-displaceds-filters';
import { WIFE_STATUS } from '@/@types/actors/common-types/index.type';
import Aid_Add_Displaceds_Table from './aid-add-displaceds-table';

interface DelegateAidDeliveryDisplacedsProps {
  aid_Data: Aid;
  delegate_Id: number;
}

export default function Delegate_Aid_Add_Displaceds({
  aid_Data,
  delegate_Id,
}: DelegateAidDeliveryDisplacedsProps) {
  console.log('🚀 ~  ~ delegate_Id:', delegate_Id);

  const [localFilters, setLocalFilters] = useState<displacedsFilterValues>({
    wife_status: WIFE_STATUS.PREGNANT,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    family_status_type: null,
    delegate: delegate_Id ? [delegate_Id.toString()] : [],
  });

  const [displacedNum, setDisplacedNum] = useState(
    aid_Data.selected_displaced_Ids.length
  );

  return (
    <Stack>
      <Common_Displaceds_Filters
        destination='AID'
        actor_Id={delegate_Id}
        role='DELEGATE'
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />

      {/* <Aid_Displaceds_Table
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
        setReceivedDisplaceds={setReceivedDisplaceds}
        receivedDisplaceds={receivedDisplaceds}
        setSelectedDisplacedIds={setSelectedDisplacedIds}
        selectedDisplacedIds={selectedDisplacedIds}
        destination={destination}
        aid_Id={aid_Id}
      /> */}

      <Aid_Add_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        localFilters={localFilters}
        aid_Data={aid_Data}
        delegate_Id={delegate_Id}
      />
    </Stack>
  );
}
