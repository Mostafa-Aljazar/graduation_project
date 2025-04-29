'use client';
import { Group, Loader, Stack, Text, Box } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/actions/landing/getArticle';
import Suggestions_Article from './Suggestions_Article';
import formatDateInArabic from '@/utils/formatDateInArabic';

type Props = { article_Id: string };
export default function Article({ article_Id }: Props) {
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article', article_Id],
    queryFn: () => getArticle(article_Id),
  });

  if (isLoading) {
    return (
      <Loader
        mx={'auto'}
        className='!mt-[200px]'
        size={'lg'}
        color={'primary'}
      />
    );
  }

  if (error) {
    return (
      <Text c={'red'} fz={20}>
        Error: {error.message}
      </Text>
    );
  }

  return (
    <Group
      wrap='nowrap'
      p={{ base: 10, md: 15, lg: 30 }}
      gap={10}
      align='start'
    >
      <Stack flex={1} p={0} gap={20}>
        <Text fw={400} fz={16} c='#345E40'>
          {article?.createdAt instanceof Date
            ? formatDateInArabic(article.createdAt)
            : article?.createdAt}
        </Text>
        <Text fw={600} fz={{ base: 20, md: 25 }} className='!text-primary'>
          {article?.title}
        </Text>

        {article?.image && (
          <Box
            hiddenFrom='md'
            className='relative mx-auto !w-[300px] !h-[200px]'
          >
            <Image
              alt='Blog Image'
              src={article.image}
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
          {article?.content && (
            <Text dangerouslySetInnerHTML={{ __html: article?.content }} />
          )}
        </div>
      </Stack>
      <Stack align='center' gap={20} visibleFrom='md'>
        {article?.image && (
          <Box className='relative !w-[300px] !h-[200px]'>
            <Image
              alt='Blog Image'
              src={article.image}
              fill
              className='shadow-md rounded-sm !object-contain'
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
              }}
            />
          </Box>
        )}

        <Suggestions_Article />
      </Stack>
    </Group>
  );
}
