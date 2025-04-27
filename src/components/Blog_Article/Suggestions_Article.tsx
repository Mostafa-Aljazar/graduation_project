'use client';
import { Loader, Text } from '@mantine/core';
import React from 'react';
import Blog_Card from '../blog/Blog_Card';
import { ARTICLES_TITLE_ANOTHER } from '@/content/blog';
import { getArticles } from '@/actions/getArticles';
import { useQuery } from '@tanstack/react-query';

export default function Suggestions_Article() {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(1, 2),
  });
  //   console.log('🚀 ~ Suggestions_Article ~ articles:', articles);

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
    <>
      <Text fw={600} fz={25} ta={'center'} className='!text-primary'>
        {ARTICLES_TITLE_ANOTHER}
      </Text>

      {articles &&
        articles.map((article, index) => (
          <Blog_Card
            destination='article'
            key={index}
            id={article.id}
            createdAt={article.createdAt}
            title={article.title}
            content={article.content}
            image={article.image}
            brief={article.brief}
          />
        ))}
    </>
  );
}
