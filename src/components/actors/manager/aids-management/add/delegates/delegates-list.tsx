'use client';
import { Group, Stack, Text } from '@mantine/core';
import { Users } from 'lucide-react';
import { useState } from 'react';
import Delegate_Filters from './delegates-filter';
import Delegates_Table from './delegates-table';
import { SelectedDelegatePortion } from '@/app/(pages)/actor/manager/[manager_Id]/aids-management/add/page';

function Delegates_List_Header() {
  return (
    <Group align='center'>
      <Users className='!text-primary' />
      <Text fw={600} fz={18} className='!text-primary'>
        بيانات المناديب:
      </Text>
    </Group>
  );
}

export interface DelegatesFilters {
  displaceds_number: number[];
  tents_number: number[];
}

interface DelegatesListProps {
  setSelectedDelegatesPortions: React.Dispatch<
    React.SetStateAction<SelectedDelegatePortion[]>
  >;
  selectedDelegatesPortions: SelectedDelegatePortion[];
}

export default function Delegates_List({
  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
}: DelegatesListProps) {
  const [localFilters, setLocalFilters] = useState<DelegatesFilters>({
    displaceds_number: [],
    tents_number: [],
  });

  const [delegatesNum, setDelegatesNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Delegates_List_Header />

      <Delegate_Filters
        setLocalFilters={setLocalFilters}
        delegatesNum={delegatesNum}
      />

      <Delegates_Table
        localFilters={localFilters}
        setDelegatesNum={setDelegatesNum}
        selectedDelegatesPortions={selectedDelegatesPortions}
        setSelectedDelegatesPortions={setSelectedDelegatesPortions}
      />
    </Stack>
  );
}
