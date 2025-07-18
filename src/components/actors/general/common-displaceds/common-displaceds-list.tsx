'use client';

import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { Suspense, useState } from 'react';
import {} from '@/validation/actor/general/displaceds-filter-form';
import Displaceds_Filters from '../../delegate/aids-management/aid/delivery-displaceds/aid-delivery-displaceds-filters';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';

interface CommonDisplacedListProps {}

export default function Common_Displaceds_List({}: CommonDisplacedListProps) {
  const [localFilters, setLocalFilters] = useState<displacedsFilterValues>({
    wife_status: null,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    case_type: null,
    delegate: [],
  });

  const [displacedNum, setDisplacedNum] = useState(selectedDisplacedIds.length);

  console.log('🚀 Common_Displaceds_List ~ aid_Data:', aid_Data);

  console.log('🚀 ~ localFilters:', localFilters);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          بيانات النازحين :
        </Text>
      </Group>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Displaceds_Filters
          setLocalFilters={setLocalFilters}
          displacedNum={displacedNum}
        />
      </Suspense>

      {/* <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Displaceds_Table
          destination={destination}
          localFilters={localFilters}
          setDisplacedNum={setDisplacedNum}
          setSelectedRows={setSelectedDisplacedIds}
          selectedRows={selectedDisplacedIds}
          receivedDisplaced={receivedDisplaced}
          aid_id={aid_id}
        />
      </Suspense> */}
    </Stack>
  );
}
