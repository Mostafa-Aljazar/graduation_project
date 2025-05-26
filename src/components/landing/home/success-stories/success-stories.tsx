import { Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Stories_Cards from './stories-cards';
import {
  SUCCESS_STORIES_DESCRIPTION,
  SUCCESS_STORIES_TITLE,
} from '@/content/landing/home';

export default function Success_Stories() {
  return (
    <Stack
      w={'100%'}
      h={'100%'}
      align='center'
      gap={20}
      pt={{ base: 20, md: 30 }}
    >
      <Stack align='center'>
        <Title fz={{ base: 20, md: 35 }} className='text-primary'>
          {SUCCESS_STORIES_TITLE}
        </Title>
        <Text fz={{ base: 16, md: 25 }} px={10} c={'dark'}>
          {SUCCESS_STORIES_DESCRIPTION}
        </Text>
      </Stack>

      <Stories_Cards />
    </Stack>
  );
}
