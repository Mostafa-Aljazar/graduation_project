'use client';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack } from '@mantine/core';
import { useState } from 'react';
import Aid_Displaceds_Table from './delegate-aid-displaceds-table';
import Aid_Delivery_Displaceds_Filters from '@/components/actors/delegate/aids-management/aid/delivery-displaceds/aid-delivery-displaceds-filters';

interface DelegateAidDeliveryDisplacedsProps {
  aid_Data: Aid;
  delegate_Id: number;
}

export default function Delegate_Aid_Delivery_Displaceds({
  aid_Data,
  delegate_Id,
}: DelegateAidDeliveryDisplacedsProps) {
  const [displacedNum, setDisplacedNum] = useState(
    aid_Data.selected_displaced_Ids.length
  );

  return (
    <Stack>
      <Aid_Delivery_Displaceds_Filters
        displacedNum={displacedNum} // handel get just the only delegate's displaceds
      />

      <Aid_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        aid_Data={aid_Data}
        delegate_Id={delegate_Id}
      />
    </Stack>
  );
}
