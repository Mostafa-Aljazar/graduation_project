'use client';
import { Text } from '@mantine/core';
import React from 'react';
import { ARTICLES_TITLE_ANOTHER } from '@/content/landing/blog';
import { getArticles } from '@/actions/landing/blog/getArticles';
import { useQuery } from '@tanstack/react-query';
import Blog_Story_Card_Skeleton from './blog-story-card-skeleton';
import Blog_Story_Card from './blog-story-card';
import { getSuccessStories } from '@/actions/landing/success-stories/getSuccessStories';
import { Articles_SuccessStoriesResponse } from '@/@types/landing/article-successStoriesResponse.type';
import { SUCCESS_STORIES_TITLE_ANOTHER } from '@/content/landing/success-story';
import { usePathname } from 'next/navigation';

type Props = {
  destination?: 'articles' | 'success-stories';
};

export default function Suggestions_Stories_Article({
  destination = 'articles',
}: Props) {
  // const pathName = usePathname();
  const isInArticle = destination == 'articles';

  // const isInArticle = pathName.includes('blog');

  const {
    data: articles_successStories_Data,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStoriesResponse, Error>({
    queryKey: ['articles', 'success-stories', destination],
    queryFn: async () => {
      if (isInArticle) return await getArticles({ page: 1, limit: 4 });
      else return await getSuccessStories({ page: 1, limit: 4 });
    },
  });

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
        {isInArticle ? ARTICLES_TITLE_ANOTHER : SUCCESS_STORIES_TITLE_ANOTHER}
      </Text>

      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Blog_Story_Card_Skeleton key={index} destination={'article'} />
          ))
        : articles_successStories_Data?.articles_successStories?.map(
            (article, index) => (
              <Blog_Story_Card
                destination={isInArticle ? 'article' : 'success-story'} //FIXME:
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
    </>
  );
}
