'use client';

import { Text, Paper, ThemeIcon, Center, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { MessageCircleWarning } from 'lucide-react';
import { getAdsBlogsStories } from '@/actions/actors/manager/blog-stories-ads/getAdsBlogsStories';
import { AdsBlogsStoriesResponse } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ads_List from './ads-list';

export default function Ads_Content() {
  const [query] = useQueryStates({
    'ads-page': parseAsInteger.withDefault(1),
  });

  const limit = 10;

  const {
    data: adsData,
    isLoading,
    error,
  } = useQuery<AdsBlogsStoriesResponse>({
    queryKey: ['Ads', query],
    queryFn: () =>
      getAdsBlogsStories({
        page: query['ads-page'],
        limit,
        type: TYPE_WRITTEN_CONTENT.ADS,
      }),
  });

  const hasError = Boolean(error) || Boolean(adsData?.error);
  return (
    <Box dir='rtl' w='100%' p='md'>
      {hasError ? (
        <Paper p='sm' withBorder className='!bg-red-100 rounded-md text-center'>
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {adsData?.error || error?.message || 'فشل في تحميل الإعلانات'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Ads_List
          ads_items={adsData?.ads_blogs_stories ?? []}
          total_pages={adsData?.pagination.total_pages ?? 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
