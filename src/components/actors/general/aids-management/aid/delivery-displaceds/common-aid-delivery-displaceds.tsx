'use client';

import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Users } from 'lucide-react';
import Common_Aid_Displaceds_Table from './common-aid-displaceds-table';
import Common_Aid_Delivery_Displaceds_Filters from '@/components/actors/general/aids-management/aid/delivery-displaceds/common-aid-delivery-displaceds-filters';

function Common_Aid_Delivery_Displaceds_List_Header() {
  return (
    <Group justify='right' align='center'>
      <Group gap={10}>
        <Users size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          كشف النازحين :
        </Text>
      </Group>
    </Group>
  );
}

interface CommonAidDeliveryDisplacedsProps {
  aid_Data: Aid;
}

export default function Common_Aid_Delivery_Displaceds({
  aid_Data,
}: CommonAidDeliveryDisplacedsProps) {
  const [displacedNum, setDisplacedNum] = useState(
    aid_Data.selected_displaced_Ids.length
  );

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Common_Aid_Delivery_Displaceds_List_Header />

      <Common_Aid_Delivery_Displaceds_Filters displacedNum={displacedNum} />

      <Common_Aid_Displaceds_Table
        setDisplacedNum={setDisplacedNum}
        aid_Data={aid_Data}
      />
    </Stack>
  );
}
