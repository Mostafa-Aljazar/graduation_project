'use client';
import { Box, Flex, Skeleton, Stack } from '@mantine/core';
import React from 'react';

type Props = {
  destination?: 'blogs' | 'article';
};

export default function Blog_Story_Card_Skeleton({
  destination = 'blogs',
}: Props) {
  const isInBlogs = destination === 'blogs';

  return (
    <Stack
      align='start'
      justify='start'
      w={isInBlogs ? { base: 350, md: '100%' } : 300}
      p={0}
      style={{ overflow: 'hidden' }}
      h={isInBlogs ? { md: 200 } : 'auto'}
      className='!shadow-lg !rounded-md'
    >
      <Flex
        direction={isInBlogs ? { base: 'column', md: 'row' } : 'column'}
        justify='flex-start'
        align='center'
        wrap='nowrap'
        p={0}
        gap={0}
        w='100%'
        h='100%'
      >
        <Box
          pos='relative'
          w={{ base: 350, md: isInBlogs ? 250 : 300 }}
          h={{ base: 150, md: 200 }}
        >
          <Skeleton
            width='100%'
            height='100%'
            radius='sm'
            className={
              isInBlogs
                ? 'w-[350px] md:w-[250px] h-[150px] md:h-[200px]'
                : 'w-[350px] md:w-[300px] h-[150px] md:h-[200px]'
            }
          />
        </Box>
        <Stack
          flex={1}
          gap={5}
          align='flex-start'
          justify='space-between'
          w='100%'
          h='100%'
          py={{ base: 10, md: 20 }}
          px={20}
          ta='right'
        >
          <Skeleton height={11} width='20%' radius='sm' />
          <Skeleton
            h={isInBlogs ? { base: 16, lg: 20 } : 16}
            width='60%'
            radius='sm'
          />
          <Skeleton height={14} width='80%' radius='sm' />
          {isInBlogs && (
            <Skeleton
              height={30}
              width={100}
              radius='md 0 0 md'
              className='self-end'
            />
          )}
        </Stack>
      </Flex>
    </Stack>
  );
}
