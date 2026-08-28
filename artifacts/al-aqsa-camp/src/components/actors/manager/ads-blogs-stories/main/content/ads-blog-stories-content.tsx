'use client';

import { Box, Center, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { MessageCircleWarning, MessageSquarePlus } from 'lucide-react';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { useQuery } from '@tanstack/react-query';
import { AdsBlogsStoriesResponse } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { getAdsBlogsStories } from '@/actions/actors/manager/blog-stories-ads/getAdsBlogsStories';
import Ads_Blogs_Stories_List from './card/ads-blogs-stories-list';

interface AdsBlogsStoriesContentProps {
  manager_Id: number;
}
export default function Ads_Blogs_Stories_Content({ manager_Id }: AdsBlogsStoriesContentProps) {
  const [query, setQuery] = useQueryStates({
    'written-tab': parseAsStringEnum<TYPE_WRITTEN_CONTENT>(
      Object.values(TYPE_WRITTEN_CONTENT)
    ).withDefault(TYPE_WRITTEN_CONTENT.BLOG),
    'written-page': parseAsInteger.withDefault(1),
  });

  const limit = 10;

  const {
    data: writtenContentsData,
    isLoading,
    error,
  } = useQuery<AdsBlogsStoriesResponse>({
    queryKey: ['Ads_Blogs_Stories', query],
    queryFn: () =>
      getAdsBlogsStories({
        page: query['written-page'],
        limit,
        type: query['written-tab'],
      }),
  });

  const hasError = Boolean(error) || Boolean(writtenContentsData?.error);

  return (
    <Stack w={'100%'}>
      {hasError ? (
        <Paper p='md' withBorder mt='md' className='!bg-red-100 rounded-md text-center'>
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {writtenContentsData?.error || error?.message || 'حدث خطأ أثناء جلب المحتوى'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Ads_Blogs_Stories_List
          data={writtenContentsData?.ads_blogs_stories || []}
          total_pages={writtenContentsData?.pagination.total_pages || 1}
          isLoading={isLoading}
          manager_Id={manager_Id}
        />
      )}
    </Stack>
  );
}
