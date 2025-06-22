'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { Database, UserPlus } from 'lucide-react';
import { useState } from 'react';

import { displacedFilterValues } from '@/validation/actor/general/displaced-filter-form';
import Displaceds_Filters from './displaceds-filters';
import Displaceds_Table from './displaceds-table';
import { DESTINATION_DISPLACED } from '@/content/actor/displaced/filter';

interface DisplacedListProps {
  destination: DESTINATION_DISPLACED;
  title?: string;
  setSelectedDisplacedIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedDisplacedIds: number[];
  isDisabled?: boolean;
  receivedDisplaced?: { displaced_ID: number; receivedTime: Date }[];
  aid_id?: number;
  showAddButton?: boolean;
}

function DisplacedListHeader({
  title,
  showAddButton,
}: {
  title?: string;
  showAddButton?: boolean;
}) {
  return (
    <Group justify='space-between' align='center'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          {title ?? 'بيانات النازحين:'}
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
        >
          إضافة نازح
        </Button>
      )}
    </Group>
  );
}

export default function Displaceds_List({
  destination,
  title,
  setSelectedDisplacedIds,
  selectedDisplacedIds,
  receivedDisplaced,
  aid_id,
  showAddButton = false,
}: DisplacedListProps) {
  const [localFilters, setLocalFilters] = useState<displacedFilterValues>({
    wife_status: null,
    family_number: null,
    ages: [],
    chronic_disease: null,
    accommodation_type: null,
    case_type: null,
    delegate: [],
  });

  const [displacedNum, setDisplacedNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <DisplacedListHeader title={title} showAddButton={showAddButton} />
      <Displaceds_Filters
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />
      <Displaceds_Table
        destination={destination}
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
        setSelectedRows={setSelectedDisplacedIds}
        selectedRows={selectedDisplacedIds}
        receivedDisplaced={receivedDisplaced}
        aid_id={aid_id}
      />
    </Stack>
  );
}
