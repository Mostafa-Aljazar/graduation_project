import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Database, UserPlus } from 'lucide-react';
import React from 'react';

export default function Displaced() {
  return (
    <Stack p={10} pos={'relative'}>
      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Database className='!text-primary' />
          <Text fw={600} fz={24} className='!text-primary'>
            بيانات النازحين:
          </Text>
        </Group>
        <Button
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

      <Group justify='space-between' align='center'>
        <Group gap={10}>
          <Text fw={600} fz={20} className='!text-primary'>
            الفلاتر:
          </Text>
          <Text fw={600} fz={20} className='!text-primary'>
            700 نازح
          </Text>
        </Group>
        <Button
          px={15}
          fz={16}
          fw={500}
          c={'white'}
          radius={'lg'}
          className='!bg-primary !shadow-lg'
          rightSection={<UserPlus size={18} />}
          // onClick={() => handleSubmit()}
        >
          إضافة نازح
        </Button>
      </Group>
    </Stack>
  );
}
