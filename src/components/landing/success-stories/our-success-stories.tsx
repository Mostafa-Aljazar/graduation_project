'use client';
import { Pagination, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getSuccessStories } from '@/actions/landing/success-stories/getSuccessStories';
import { OUR_SUCCESS_STORIES_TITLE } from '@/content/landing/success-story';
import Blog_Story_Card from '../common/blog-story-card';
import Blog_Story_Card_Skeleton from '../common/blog-story-card-skeleton';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Articles_SuccessStories_Ads_Response } from '@/@types/common/article-successStories-adsResponse.type';

export default function Our_Success_Stories() {
  const [activePage, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const {
    data: successStoriesData,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStories_Ads_Response, Error>({
    queryKey: ['success-stories', activePage],
    queryFn: async () => {
      return await getSuccessStories({ page: activePage, limit: 7 });
    },
  });

  if (error) {
    return (
      <Stack align='center' justify='center' h={200} px={10}>
        <Text fw={500} fz={{ base: 18, lg: 22 }} c='red' ta='center'>
          خطأ في تحميل قصص النجاح:
          {error.message || 'حدث خطأ غير متوقع'}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack py={30} px={20} gap={30} align='center' justify='center'>
      <Text
        fw={500}
        fz={{ base: 30, lg: 35 }}
        w={{ base: '100%', md: '80%' }}
        className='!text-primary'
      >
        {OUR_SUCCESS_STORIES_TITLE}
      </Text>

      <Stack
        justify='center'
        align='center'
        gap={30}
        w={{ base: '100%', md: '80%' }}
        mih={400}
        pos={'relative'}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Blog_Story_Card_Skeleton key={index} />
            ))
          : successStoriesData?.articles_successStories_ads?.map(
              (story, index) => (
                <Blog_Story_Card
                  destination='success-stories'
                  key={index}
                  id={story.id}
                  createdAt={story.createdAt}
                  title={story.title}
                  content={story.content}
                  imgs={story.imgs}
                  brief={story.content}
                />
              )
            )}
      </Stack>
      <Pagination
        hidden={isLoading}
        total={successStoriesData?.pagination?.totalPages || 0}
        pt={30}
        size='sm'
        radius='xl'
        withControls={false}
        classNames={{
          dots: '!rounded-full !text-gray-300 border-1',
          control: '!rounded-full  ',
        }}
        value={activePage}
        onChange={setPage}
      />
    </Stack>
  );
}
