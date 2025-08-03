'use client';

import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { displacedsFilterValues } from '@/validation/actor/general/displaceds-filter-form';
import Displaceds_Filters from '@/components/actors/general/displaceds/content/displaceds-filters';
import { DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import { ReceivedDisplaceds } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import Aid_Displaceds_Table from './aid-displaceds-table';
import useAuth from '@/hooks/useAuth';

function Aid_Displaced_List_Header({
  destination,
}: {
  destination: DESTINATION_AID;
}) {
  const title =
    destination == DESTINATION_AID.ADD_AIDS
      ? 'إضافة نازحين للمساعدة'
      : destination == DESTINATION_AID.EDIT_AIDS
      ? 'تعديل النازحين المستقبلين '
      : destination == DESTINATION_AID.DISPLAY_AIDS
      ? 'بيانات النازحين'
      : '';

  return (
    <Group justify='right' align='center'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          {title} :
        </Text>
      </Group>
    </Group>
  );
}

interface AidDisplacedsListProps {
  aid_Id?: number;
  destination: DESTINATION_AID;
  setSelectedDisplacedIds: Dispatch<SetStateAction<number[]>>;
  selectedDisplacedIds: number[];
  receivedDisplaceds: ReceivedDisplaceds[];
  setReceivedDisplaceds: Dispatch<SetStateAction<ReceivedDisplaceds[]>>;
}

export default function Aid_Displaceds_List({
  destination,
  setReceivedDisplaceds,
  receivedDisplaceds,
  setSelectedDisplacedIds,
  selectedDisplacedIds,
  aid_Id,
}: AidDisplacedsListProps) {
  const { user, isDelegate, isManager } = useAuth();
  const [localFilters, setLocalFilters] = useState<displacedsFilterValues>({
    wife_status: null,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    family_status_type: null,
    delegate: isDelegate && user?.id ? [user.id.toString()] : [],
  });

  const [displacedNum, setDisplacedNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Aid_Displaced_List_Header destination={destination} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Displaceds_Filters
          setLocalFilters={setLocalFilters}
          displacedNum={displacedNum}
        />
      </Suspense>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Aid_Displaceds_Table
          localFilters={localFilters}
          setDisplacedNum={setDisplacedNum}
          setReceivedDisplaceds={setReceivedDisplaceds}
          receivedDisplaceds={receivedDisplaceds}
          setSelectedDisplacedIds={setSelectedDisplacedIds}
          selectedDisplacedIds={selectedDisplacedIds}
          destination={destination}
          aid_Id={aid_Id}
        />
      </Suspense>
    </Stack>
  );
}
