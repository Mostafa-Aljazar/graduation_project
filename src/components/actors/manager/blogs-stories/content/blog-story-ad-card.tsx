'use client';
import { Article_SuccessStory_Ad } from '@/@types/common/article-successStories-adsResponse.type';
import { cn } from '@/utils/cn';
import { Box, Button, Flex, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Action_Card from './action-card';
import { TYPE_CONTENT } from '@/content/actor/manager/ads-blogs-stories';

type Props = Article_SuccessStory_Ad & {
  destination?: TYPE_CONTENT;
};

export default function Article_Story_Ad_Card({
  destination = TYPE_CONTENT.BLOG,
  id,
  imgs,
  createdAt,
  title,
  brief,
}: Props) {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      justify='flex-start'
      align='flex-start'
      wrap='nowrap'
      p={0}
      gap={0}
      w='100%'
      className='bg-white shadow-lg rounded-md overflow-hidden'
    >
      <Box
        pos='relative'
        w={{ base: '100%', sm: 250, md: 300 }}
        h={{ base: 150, sm: 180, md: 200 }}
      >
        {imgs && (
          <Image alt='Blog Image' src={imgs[0]} fill className='object-cover' />
        )}
      </Box>

      <Stack
        flex={1}
        gap={10}
        align='flex-start'
        justify='space-between'
        w='100%'
        h='100%'
        py={{ base: 10, sm: 15, md: 20 }}
        px={{ base: 15, sm: 20 }}
      >
        <Group w={'100%'} justify='space-between' align='center'>
          <Text
            fw={400}
            fz={{ base: 10, sm: 11, md: 12 }}
            className='!text-primary'
          >
            {createdAt && new Date(createdAt).toLocaleDateString()}
          </Text>
          <Action_Card id={id} destination={destination} />
        </Group>

        <Stack flex={1} gap={8} w='100%'>
          <Text
            fw={500}
            fz={{ base: 14, sm: 16, lg: 20 }}
            className='!text-primary line-clamp-2'
          >
            {title}
          </Text>
          <Text
            fw={400}
            fz={{ base: 12, sm: 13, md: 14 }}
            className='!text-dark line-clamp-3'
          >
            {brief}
          </Text>
        </Stack>

        <Button
          hidden
          variant='gradient'
          w={{ base: 90, md: 100 }}
          h={{ base: 28, md: 30 }}
          className='!self-end !p-0 !rounded-r-none !rounded-l-md'
          gradient={{ from: '#345E40', to: '#97A483', deg: 90 }}
        >
          المزيد
        </Button>
      </Stack>
    </Flex>
  );
}
