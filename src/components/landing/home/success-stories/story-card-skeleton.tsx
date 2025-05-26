import { Flex, Skeleton, Stack } from '@mantine/core';
import React from 'react';

export default function StoryCardSkeleton() {
  return (
    <Flex
      direction='row'
      wrap='nowrap'
      w='100%'
      px={{ base: 10, md: '10%' }}
      h={{ base: 200, md: 200 }}
      align='center'
      style={{ overflow: 'hidden' }}
      gap={0}
    >
      {/* Image placeholder */}
      <Skeleton
        w={{ base: 150, md: 200 }}
        h={144}
        radius='md'
        className='w-[150px] md:w-[200px] md:h-36'
      />
      <Stack
        gap={10}
        w='100%'
        justify='space-evenly'
        h={'100%'}
        py={20}
        px={20}
      >
        <Skeleton h={40} w={{ base: '50%', md: '30%' }} />
        <Stack>
          <Skeleton h={30} w={'100%'} />
          <Skeleton h={30} w={'100%'} />
        </Stack>
      </Stack>
    </Flex>
  );
}
