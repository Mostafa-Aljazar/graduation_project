'use client';
import { Box, Center, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { AdsBlogsStoriesResponse } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { getAdsBlogsStories } from '@/actions/actors/manager/blog-stories-ads/getAdsBlogsStories';
import { BLOG_TITLE, SUCCESS_STORIES_TITLE } from '@/content/landing';
import { MessageCircleWarning } from 'lucide-react';
import Blog_Or_Stories_List from './blog-or-stories-list';

interface Props {
  destination: TYPE_WRITTEN_CONTENT;
}

export default function Our_Blog_Or_Stories({ destination }: Props) {
  const [activePage, setActivePage] = useQueryState('page', parseAsInteger.withDefault(1));

  const limit = 5;

  const {
    data: writtenContentData,
    isLoading,
    error,
  } = useQuery<AdsBlogsStoriesResponse>({
    queryKey: ['Ads_Blogs_Stories', activePage],
    queryFn: () =>
      getAdsBlogsStories({
        page: activePage,
        limit,
        type: destination,
      }),
  });

  const hasError = Boolean(error) || Boolean(writtenContentData?.error);

  return (
    <Stack py={20} gap={10}>
      <Text px={{ base: 20, md: 30 }} fw={600} fz={25} w='100%' className='!text-primary'>
        {destination === TYPE_WRITTEN_CONTENT.BLOG ? BLOG_TITLE : SUCCESS_STORIES_TITLE}
      </Text>
      <Stack w={'100%'}>
        {hasError ? (
          <Paper p='md' mx={10} withBorder className='!bg-red-100 rounded-md text-center'>
            <Box>
              <Center mb='sm'>
                <ThemeIcon color='red' variant='light' size='lg'>
                  <MessageCircleWarning />
                </ThemeIcon>
              </Center>
              <Text c='red' fw={600}>
                {writtenContentData?.error || error?.message || `حدث خطأ أثناء جلب المحتوى`}
              </Text>
            </Box>
          </Paper>
        ) : (
          <Blog_Or_Stories_List
            destination={destination}
            data={writtenContentData?.ads_blogs_stories || []}
            total_pages={writtenContentData?.pagination.total_pages || 1}
            isLoading={isLoading}
          />
        )}
      </Stack>
    </Stack>
  );
}
