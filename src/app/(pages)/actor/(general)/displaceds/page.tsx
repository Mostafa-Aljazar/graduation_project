'use client';
import Displaced_Filters from '@/components/actors/general/Displaced/Displaced_Filters';
import Displaced_Table from '@/components/actors/general/Displaced/Displaced_Table';
import { displacedFilterValues } from '@/validation/actor/general/displaced-filter-form';
import { Button, Group, Stack, Text } from '@mantine/core';
import { Database, UserPlus } from 'lucide-react';
import { useState } from 'react';

function Header_Displaceds() {
  return (
    <Group justify='space-between' align='center'>
      <Group gap={10} align='center'>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={20} className='!text-primary'>
          بيانات النازحين:
        </Text>
      </Group>
      <Button
        size='sm'
        fz={16}
        fw={500}
        c={'white'}
        radius={'lg'}
        className='!bg-primary'
        rightSection={<UserPlus size={16} />}
      >
        إضافة نازح
      </Button>
    </Group>
  );
}

export default function Displaceds() {
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
    <Stack p={10} pos={'relative'} w={'100%'}>
      <Header_Displaceds />

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
