'use client';
import { Group, Stack, Text } from '@mantine/core';
import { Database } from 'lucide-react';
import { useState } from 'react';
import Displaced_Filters from './displaced-filter';
import Displaced_Table from './displaced-table';

export default function Displaced_List() {
  // Local state to hold filter input values until "Filter" is clicked
  const [localFilters, setLocalFilters] = useState({
    wife_status: '',
    family_number: undefined as number | undefined,
    ages: [] as string[],
    chronic_disease: '',
    accommodation_type: '',
    case_type: '',
    delegate: [] as string[],
  });

  const [displacedNum, setDisplacedNum] = useState(0);

  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<
    (string | number)[]
  >([]);

  console.log(
    '🚀 ~ Displaced_List ~ selectedDisplacedIds:',
    selectedDisplacedIds
  );

  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Database size={20} className='!text-primary' />
          <Text fw={500} fz={20} className='!text-primary'>
            بيانات النازحين:
          </Text>
        </Group>
      </Group>
      <Displaced_Filters
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />
      <Displaced_Table
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
        setSelectedRows={setSelectedDisplacedIds}
        selectedRows={selectedDisplacedIds}
      />
    </Stack>
  );
}
