'use client';
import Displaced_Filters from '@/components/actors/general/Displaced/Displaced_Filters';
import Displaced_Table from '@/components/actors/general/Displaced/Displaced_Table';
import { Button, Group, Stack, Text } from '@mantine/core';
import { Database, UserPlus } from 'lucide-react';
import { useState } from 'react';

export interface DisplacedsFilter {
  wife_status: string;
  family_number: number | undefined;
  ages: string[];
  chronic_disease: string;
  accommodation_type: string;
  case_type: string;
  delegate: string[];
}

export default function Displaceds() {
  // Local state to hold filter input values until "Filter" is clicked
  const [localFilters, setLocalFilters] = useState<DisplacedsFilter>({
    wife_status: '',
    family_number: undefined as number | undefined,
    ages: [] as string[],
    chronic_disease: '',
    accommodation_type: '',
    case_type: '',
    delegate: [] as string[],
  });

  const [displacedNum, setDisplacedNum] = useState(0);
  return (
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Database className='!text-primary' />
          <Text fw={600} fz={24} className='!text-primary'>
            بيانات النازحين:
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
          إضافة نازح
        </Button>
      </Group>
      <Displaced_Filters
        setLocalFilters={setLocalFilters}
        displacedNum={displacedNum}
      />
      <Displaced_Table
        localFilters={localFilters}
        setDisplacedNum={setDisplacedNum}
      />
    </Stack>
  );
}
