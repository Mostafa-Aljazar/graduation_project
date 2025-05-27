'use client';
import { getArticles } from '@/actions/landing/blog/getArticles';
import Blog_Story_Card_Skeleton from '@/components/landing/common/blog-story-card-skeleton';
import { Pagination, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Articles_SuccessStories_Ads_Response } from '@/@types/common/article-successStories-adsResponse.type';
import { getAds } from '@/actions/actors/manager/blog-stories-ads/ad/getAds';
import { getSuccessStories } from '@/actions/landing/success-stories/getSuccessStories';
import Article_Story_Ad_Card from './blog-story-ad-card';

type Props = {
  type: 'BLOG' | 'SUCCESS_STORIES' | 'ADS';
};

export default function Blog_Story_Ad_Cards({ type }: Props) {
  const [activePage, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const {
    data: articles_successStories_ads_Data,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStories_Ads_Response | null, Error>({
    queryKey: [activePage, type],
    queryFn: async () => {
      if (type == 'BLOG')
        return await getArticles({ page: activePage, limit: 4 });
      else if (type == 'SUCCESS_STORIES')
        return await getSuccessStories({ page: activePage, limit: 4 });
      else return await getAds({ page: activePage, limit: 4 });
    },
  });

  if (error) {
    return (
      <Stack align='center' justify='center' h={200} px={10}>
        <Text fw={500} fz={{ base: 18, lg: 22 }} c='red' ta='center'>
          خطأ في التحميل:
          {error.message || 'حدث خطأ غير متوقع'}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      justify='center'
      align='center'
      gap={30}
      py={30}
      w={{ base: '100%', md: '80%' }}
    >
      <Stack justify='center' align='center' pos={'relative'} w={'100%'}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Blog_Story_Card_Skeleton key={index} />
            ))
          : articles_successStories_ads_Data?.articles_successStories_ads?.map(
              (article, index) => (
                <Article_Story_Ad_Card
                  destination={type}
                  key={index}
                  id={article.id}
                  createdAt={article.createdAt}
                  title={article.title}
                  content={article.content}
                  img={article.img}
                  brief={article.brief}
                />
              )
            )}
      </Stack>
      <Pagination
        hidden={isLoading}
        total={articles_successStories_ads_Data?.pagination?.totalPages || 0}
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
