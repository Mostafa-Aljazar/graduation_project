'use client';

import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { useState } from 'react';
import DisplacedFilters from './displaced-filter';
import DisplacedTable from './displaced-table';

interface Filters {
  wife_status: string;
  family_number: number | undefined;
  ages: string[];
  chronic_disease: string;
  accommodation_type: string;
  case_type: string;
  delegate: string[];
}

interface DisplacedListProps {
  title?: string;
  setSelectedDisplacedIds: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >;
  selectedDisplacedIds: (string | number)[];
  isDisabled?: boolean;

  receivedDisplaced?: {
    //FIXME: add who is give him
    displaced: string | number;
    receivedTime: Date;
  }[];

  aid_id?: string | number;
}

function Displaced_List_Header({ title }: { title?: string }) {
  return (
    <Group justify='space-between' align='center'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          {title ?? 'بيانات النازحين:'}
        </Text>
      </Group>
    </Group>
  );
}

export default function DisplacedList({
  title,
  setSelectedDisplacedIds,
  selectedDisplacedIds,
  isDisabled = false,
  receivedDisplaced,
  aid_id,
}: DisplacedListProps) {
  // console.log('🚀 ~ selectedDisplacedIds:', selectedDisplacedIds);
  const [localFilters, setLocalFilters] = useState<Filters>({
    wife_status: '',
    family_number: undefined,
    ages: [],
    chronic_disease: '',
    accommodation_type: '',
    case_type: '',
    delegate: [],
  });

  const [displacedNum, setDisplacedNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Displaced_List_Header title={title} />
      <DisplacedFilters
        setLocalFilters={isDisabled ? () => {} : setLocalFilters} // Disable filter updates
        displacedNum={displacedNum}
        isDisabled={isDisabled}
      />
      <DisplacedTable
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
        setSelectedRows={setSelectedDisplacedIds}
        selectedRows={selectedDisplacedIds}
        isDisabled={isDisabled}
        receivedDisplaced={receivedDisplaced}
        aid_id={aid_id}
      />
    </Stack>
  );
}
