import { Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Stories_Cards from './Stories_Cards';

export default function Success_Stories() {
  return (
    <Stack w={'100%'} align='center' gap={20} pt={{ base: 20, md: 30 }}>
      <Stack align='center'>
        <Title fz={{ base: 25, md: 35 }} className='text-primary'>
          قصص نجاح
        </Title>
        <Text fz={{ base: 18, md: 25 }} c={'dark'}>
          في كل خيمة يسكن الألم، لكن العزيمة لا تعرف الاستسلام
        </Text>
      </Stack>

      <Stories_Cards />
    </Stack>
  );
}
