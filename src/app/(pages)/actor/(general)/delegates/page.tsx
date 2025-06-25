'use client';
import TEST_Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import { DESTINATION_DELEGATES } from '@/content/actor/delegate/filter';
import { Stack } from '@mantine/core';
import { useState } from 'react';

export interface DelegatesFilter {
  displaceds_number: number[];
  tents_number: number[];
}
export default function Delegates() {
  const [selectedDelegateIDs, setSelectedDelegateIDs] = useState<number[]>([]);

  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <TEST_Delegates_List
        destination={DESTINATION_DELEGATES.DELEGATES}
        selectedDelegateIDs={selectedDelegateIDs}
        setSelectedDelegateIDs={setSelectedDelegateIDs}
        showAddButton={true}
      />
    </Stack>
  );
}
