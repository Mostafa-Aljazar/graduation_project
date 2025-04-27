import Article from '@/components/Blog_Article/Article';
import { Stack } from '@mantine/core';
import React from 'react';

export default async function Article_Page({
  params,
}: {
  params: Promise<{ article_Id: string }>;
}) {
  const { article_Id } = await params;

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Article article_Id={article_Id} />
    </Stack>
  );
}
