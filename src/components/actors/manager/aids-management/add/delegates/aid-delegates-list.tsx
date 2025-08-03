'use client';

import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import { displacedsFilterValues } from '@/validation/actor/general/displaceds-filter-form';
import { DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import {
  Aid,
  ReceivedDisplaceds,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import useAuth from '@/hooks/useAuth';
import Aid_Displaceds_Table from './aid-delegates-table';
import Aid_Delegates_Table from './aid-delegates-table';

function Aid_Delegates_List_Header({
  destination,
}: {
  destination: DESTINATION_AID;
}) {
  const title =
    destination == DESTINATION_AID.ADD_AIDS
      ? 'إضافة مناديب للمساعدة'
      : destination == DESTINATION_AID.EDIT_AIDS
      ? 'تعديل المناديب المستقبلين '
      : destination == DESTINATION_AID.DISPLAY_AIDS
      ? 'بيانات المناديب'
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

interface AidDelegatesListProps {
  aid_Id?: number;
  destination: DESTINATION_AID;
  selectedDelegatesPortions: SelectedDelegatePortion[];
  setSelectedDelegatesPortions: Dispatch<
    SetStateAction<SelectedDelegatePortion[]>
  >;
  aid_data?: Aid;
}

export default function Aid_Delegates_List({
  destination,
  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
  aid_data,
  aid_Id,
}: AidDelegatesListProps) {
  const { user, isDelegate, isManager } = useAuth();

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Aid_Delegates_List_Header destination={destination} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Aid_Delegates_Table
          destination={destination}
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
          aid_data={aid_data as Aid}
          aid_Id={aid_Id}
        />
      </Suspense>
    </Stack>
  );
}
