'use client';
import { Loader, Pagination, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import Blog_Card from './Blog_Card';
import { OUR_BLOG_TITLE } from '@/content/blog';
import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/actions/getArticles';

export default function Our_Blog() {
  const [activePage, setPage] = useState(1);
  // console.log('🚀 ~ Our_Blog ~ activePage:', activePage);

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(activePage, 5),
  });
  //   console.log('🚀 ~ Suggestions_Article ~ articles:', articles);

  if (isLoading) {
    return <Loader my={100} mx={'auto'} />;
  }

  if (error) {
    return (
      <Text c={'red'} fz={20}>
        Error: {error.message}
      </Text>
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
      >
        {articles?.map((article, index) => (
          <Blog_Card
            destination='blogs'
            key={index}
            id={article.id}
            createdAt={article.createdAt}
            title={article.title}
            content={article.content}
            image={article.image}
            brief={article.brief}
          />
        ))}
        <Pagination
          total={5}
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
    </Stack>
  );
}
