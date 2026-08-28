'use client';

import { Box, Button, Flex, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { CalendarDays, ChevronRight, Tag, TextQuote } from 'lucide-react';
import { AdBlogStory } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { USER_RANK, UserRank } from '@/constants/userTypes';
import useAuth from '@/hooks/useAuth';
import Ad_Blog_Story_Card_Action from './ad-blog-story-card-action';

interface AdBlogStoryCardProps {
  written_data: AdBlogStory;
  manager_Id: number;
}

export default function Ad_Blog_Story_Card({ written_data, manager_Id }: AdBlogStoryCardProps) {
  const { user, isManager } = useAuth();
  const isOwner = manager_Id == user?.id && isManager;

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      align='stretch'
      className='bg-white shadow-md hover:shadow-lg border border-gray-100 rounded-md overflow-hidden transition-all'
    >
      <Box pos='relative' w={{ base: '100%', sm: 180 }} h={{ base: 120, sm: 130 }}>
        {written_data.imgs?.[0] ? (
          <Image alt='Blog Image' src={written_data.imgs[0]} fill className='object-cover' />
        ) : (
          <Box w='100%' h='100%' bg='gray.2' />
        )}
      </Box>

      <Stack flex={1} justify='space-between' py={10} px={{ base: 12, sm: 16 }} gap={8}>
        <Group justify='space-between'>
          <Group gap={6} align='center'>
            <CalendarDays size={14} strokeWidth={1.5} className='text-gray-500' />
            <Text fz={11} c='dimmed'>
              {written_data.created_at && new Date(written_data.created_at).toLocaleDateString()}
            </Text>
          </Group>

          {isOwner && (
            <Ad_Blog_Story_Card_Action
              written_content_Id={written_data.id}
              type={written_data.type}
              manager_Id={manager_Id}
            />
          )}
        </Group>

        <Stack gap={6}>
          <Group gap={6} align='center'>
            <Tag size={14} strokeWidth={1.5} className='mt-1 text-primary' />
            <Text fw={600} fz={{ base: 14, sm: 16 }} className='!text-primary line-clamp-1'>
              {written_data.title}
            </Text>
          </Group>

          <Group gap={6} align='start'>
            <TextQuote size={16} strokeWidth={1.5} className='mt-1 text-gray-600' />
            <Text fw={400} fz={12} className='!text-dark line-clamp-2'>
              {written_data.brief}
            </Text>
          </Group>
        </Stack>

        <Button
          variant='subtle'
          size='xs'
          h={26}
          px={8}
          className='!self-end'
          rightSection={<ChevronRight size={14} />}
        >
          المزيد
        </Button>
      </Stack>
    </Flex>
  );
}
