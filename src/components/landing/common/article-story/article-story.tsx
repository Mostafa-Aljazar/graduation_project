'use client';
import { Group, Stack, Text, Box, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/actions/landing/blog/getArticle';
import formatDateInArabic from '@/utils/formatDateInArabic';
import { getStory } from '@/actions/landing/success-stories/getStory';
import Suggestions_Stories_Article from '../suggestions-stories-articles';
import { Article_SuccessStory_Ad_Response } from '@/@types/common/article-successStories-adsResponse.type';

type Props = { article_story_Id: number; destination?: 'article' | 'story' };

export default function Article_Story({
  article_story_Id,
  destination,
}: Props) {
  const isInArticle = destination == 'article';
  const {
    data: articleData,
    isLoading,
    error,
  } = useQuery<Article_SuccessStory_Ad_Response, Error>({
    queryKey: ['article', 'story', article_story_Id],
    queryFn: () => {
      if (isInArticle) {
        return getArticle({ id: article_story_Id });
      } else {
        return getStory(article_story_Id);
      }
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
    <Group
      wrap='nowrap'
      p={{ base: 10, md: 15, lg: 30 }}
      gap={10}
      align='start'
      pos={'relative'}
    >
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Stack flex={1} p={0} gap={20}>
        <Text fw={400} fz={16} c='#345E40'>
          {articleData?.article_successStory_ad?.createdAt instanceof Date
            ? formatDateInArabic(articleData.article_successStory_ad.createdAt)
            : articleData?.article_successStory_ad?.createdAt}
        </Text>
        <Text fw={600} fz={{ base: 20, md: 25 }} className='!text-primary'>
          {articleData?.article_successStory_ad?.title}
        </Text>

        {articleData?.article_successStory_ad?.imgs && (
          <Box
            hiddenFrom='md'
            className='relative mx-auto !w-[300px] !h-[200px]'
          >
            <Image
              alt='Blog Image'
              src={articleData?.article_successStory_ad.imgs[0]}
              fill
              className='shadow-md rounded-sm !object-contain'
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
              }}
            />
          </Box>
        )}

        <div>
          {articleData?.article_successStory_ad?.content && (
            <Text
              dangerouslySetInnerHTML={{
                __html: articleData?.article_successStory_ad?.content,
              }}
            />
          )}
        </div>
      </Stack>
      <Stack align='center' gap={20} visibleFrom='md'>
        {articleData?.article_successStory_ad?.imgs && (
          <Box className='relative !w-[300px] !h-[200px]'>
            <Image
              alt='Blog Image'
              src={articleData?.article_successStory_ad.imgs[0]}
              fill
              className='shadow-md rounded-sm !object-contain'
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
              }}
            />
          </Box>
        )}

        <Suggestions_Stories_Article
          destination={isInArticle ? 'articles' : 'success-stories'}
        />
      </Stack>
    </Group>
  );
}
