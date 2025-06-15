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
  setSelectedDisplacedIds: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >;
  selectedDisplacedIds: (string | number)[];
}

export default function DisplacedList({
  setSelectedDisplacedIds,
  selectedDisplacedIds,
}: DisplacedListProps) {
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
      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Database size={20} className='!text-primary' />
          <Text fw={500} fz={20} className='!text-primary'>
            بيانات النازحين:
          </Text>
        </Group>
      </Group>
      <DisplacedFilters
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />
      <DisplacedTable
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
        setSelectedRows={setSelectedDisplacedIds}
        selectedRows={selectedDisplacedIds}
      />
    </Stack>
  );
}
