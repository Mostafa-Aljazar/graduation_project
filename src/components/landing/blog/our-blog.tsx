'use client';
import { Pagination, Stack, Text } from '@mantine/core';
import { OUR_BLOG_TITLE } from '@/content/landing/blog';
import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/actions/landing/blog/getArticles';
import Blog_Story_Card from '../common/blog-story-card';
import Blog_Story_Card_Skeleton from '../common/blog-story-card-skeleton';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Articles_SuccessStories_Ads_Response } from '@/@types/common/article-successStories-adsResponse.type';

export default function Our_Blog() {
  const [activePage, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const {
    data: articlesData,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStories_Ads_Response, Error>({
    queryKey: ['articles', activePage],
    queryFn: async () => {
      return await getArticles({ page: activePage, limit: 7 });
    },
  });

  if (error) {
    return (
      <Stack align='center' justify='center' h={200} px={10}>
        <Text fw={500} fz={{ base: 18, lg: 22 }} c='red' ta='center'>
          خطأ في تحميتل المقالات:
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
        {OUR_BLOG_TITLE}
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
          : articlesData?.articles_successStories_ads?.map((article, index) => (
              <Blog_Story_Card
                destination='blogs'
                key={index}
                id={article.id}
                createdAt={article.createdAt}
                title={article.title}
                content={article.content}
                imgs={article.imgs}
                brief={article.brief}
              />
            ))}
      </Stack>
      <Pagination
        hidden={isLoading}
        total={articlesData?.pagination?.totalPages || 0}
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
