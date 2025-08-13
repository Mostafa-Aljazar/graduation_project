'use client';

import { AdBlogStory } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { LANDING_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { Box, Button, Divider, Flex, Stack, Text, ThemeIcon } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';

interface Props extends AdBlogStory {
  destination: TYPE_WRITTEN_CONTENT;
}

export default function Common_Blog_Story_Card({
  destination,
  id,
  imgs,
  created_at,
  title,
  brief,
}: Props) {
  const router = useRouter();

  const handelOnClick = () => {
    destination == TYPE_WRITTEN_CONTENT.BLOG
      ? router.push(`${LANDING_ROUTES.BLOG}/${id}`)
      : router.push(`${LANDING_ROUTES.SUCCESS_STORY}/${id}`);
  };

  return (
    <Box className='w-full'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align='stretch'
        className='bg-white !shadow-md hover:!shadow-lg !rounded-lg md:!h-[200px] overflow-hidden transition-shadow duration-200'
      >
        <Box pos='relative' w={{ base: '100%', md: 280 }} h={{ base: 180, md: 200 }}>
          {imgs?.[0] && (
            <Image alt='Blog Image' src={imgs[0]} fill className={cn('object-cover')} />
          )}
        </Box>

        <Stack flex={1} justify='space-between' p={20} gap='xs' h={{ base: 180, md: 200 }}>
          <Flex align='center' gap={6} c='dimmed' fz={12}>
            <ThemeIcon variant='light' radius='xl' size={22} color='primary'>
              <Calendar size={14} />
            </ThemeIcon>
            {created_at && new Date(created_at).toLocaleDateString()}
          </Flex>

          <Text fw={600} fz={16} c='primary.8' lineClamp={2}>
            {title}
          </Text>

          <Text fz={14} c='dark' lineClamp={3} hiddenFrom='md'>
            {brief}
          </Text>

          <Text fz={14} c='dark' lineClamp={2} visibleFrom='md'>
            {brief}
          </Text>

          <Divider />

          <Button
            variant='light'
            size='xs'
            radius='md'
            rightSection={<ArrowRight size={14} />}
            className='self-start'
            color='primary'
            onClick={handelOnClick}
          >
            المزيد
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
