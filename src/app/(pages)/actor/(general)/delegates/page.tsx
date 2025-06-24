'use client';
import Delegate_Filters from '@/components/actors/general/delegates/Delegates_Filters';
import Delegates_Table from '@/components/actors/general/delegates/Delegates_Table';
import TEST_Delegates_List from '@/components/actors/general/delegates/content/delegates-list';
import { DESTINATION_DELEGATES } from '@/content/actor/delegate/filter';
import { Button, Group, Stack, Text } from '@mantine/core';
import { UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export interface DelegatesFilter {
  displaceds_number: number[];
  tents_number: number[];
}
export default function Delegates() {
  // Local state to hold filter input values until "Filter" is clicked
  // const [localFilters, setLocalFilters] = useState<DelegatesFilter>({
  //   displaceds_number: [],
  //   tents_number: [],
  // });

  const [selectedDelegateIDs, setSelectedDelegateIDs] = useState<number[]>([]);

  // const [delegatesNum, setDelegatesNum] = useState(0);

  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <TEST_Delegates_List
        destination={DESTINATION_DELEGATES.DELEGATES}
        selectedDelegateIDs={selectedDelegateIDs}
        setSelectedDelegateIDs={setSelectedDelegateIDs}
        showAddButton={true}
      />
      {/* <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Users className='!text-primary' />
          <Text fw={600} fz={24} className='!text-primary'>
            بيانات المناديب:
          </Text>
        </Group>
        <Button
          size='sm'
          px={15}
          fz={16}
          fw={500}
          c={'white'}
          radius={'lg'}
          className='!bg-primary !shadow-lg'
          rightSection={<UserPlus size={18} />}
        >
          إضافة مندوب
        </Button>
      </Group>
      <Delegate_Filters
        setLocalFilters={setLocalFilters}
        delegatesNum={delegatesNum}
      />
      <Delegates_Table
        localFilters={localFilters}
        setDelegatesNum={setDelegatesNum}
      /> */}
    </Stack>
  );
}
