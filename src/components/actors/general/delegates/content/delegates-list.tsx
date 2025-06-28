'use client';
import { Button, Group, Stack, Text } from '@mantine/core';
import { UserPlus, Users } from 'lucide-react';
import { Suspense, useState } from 'react';
import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { delegatesFilterValues } from '@/validation/actor/general/delegates-filter-form';
import { DESTINATION_DELEGATES } from '@/content/actor/delegate/filter';
import Delegate_Filters from './delegates-filter';
import Delegates_Table from './delegates-table';
import { useRouter } from 'next/navigation';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';

function DelegatesListHeader({
  title,
  showAddButton,
}: {
  title?: string;
  showAddButton?: boolean;
}) {
  const router = useRouter();
  return (
    <Group justify='space-between' align='center'>
      <Group gap={10}>
        <Users size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          {title ?? 'بيانات المناديب:'}
        </Text>
      </Group>
      {showAddButton && (
        <Button
          size='sm'
          fz={16}
          fw={500}
          c='white'
          radius='lg'
          className='!bg-primary'
          rightSection={<UserPlus size={16} />}
          onClick={() =>
            router.push(
              `${GENERAL_ACTOR_ROUTES.ADD_DELEGATES}?action=${ACTION_ADD_EDIT_DISPLAY.ADD}`
            )
          }
        >
          إضافة مندوب
        </Button>
      )}
    </Group>
  );
}

interface DelegatesListProps {
  destination: DESTINATION_DELEGATES;
  title?: string;
  aid_id?: number;
  showAddButton?: boolean;

  //HINT: select in DELEGATES PAGE
  setSelectedDelegateIDs?: React.Dispatch<React.SetStateAction<number[]>>;
  selectedDelegateIDs?: number[];

  //HINT: select in AIDS PAGE
  setSelectedDelegatesPortions?: React.Dispatch<
    React.SetStateAction<SelectedDelegatePortion[]>
  >;
  selectedDelegatesPortions?: SelectedDelegatePortion[];

  aid_data?: Aid;
}
// receivedDisplaced?: { displaced_ID: number; receivedTime: Date }[];

export default function Delegates_List({
  destination,
  title,
  showAddButton,
  aid_id,
  aid_data,

  selectedDelegateIDs,
  setSelectedDelegateIDs,

  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
}: DelegatesListProps) {
  const [localFilters, setLocalFilters] = useState<delegatesFilterValues>({
    displaceds_number: [],
    tents_number: [],
  });
  console.log('🚀 ~ localFilters:', localFilters);

  const [delegatesNum, setDelegatesNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <DelegatesListHeader title={title} showAddButton={showAddButton} />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Delegate_Filters
          setLocalFilters={setLocalFilters}
          delegatesNum={delegatesNum}
        />
      </Suspense>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Delegates_Table
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
          // receivedDisplaced={receivedDisplaced}

          destination={destination}
          localFilters={localFilters}
          setDelegatesNum={setDelegatesNum}
          setSelectedRows={setSelectedDelegateIDs}
          selectedRows={selectedDelegateIDs}
          // aid_id={aid_id}
          aid_data={aid_data}
        />
      </Suspense>
    </Stack>
  );
}
