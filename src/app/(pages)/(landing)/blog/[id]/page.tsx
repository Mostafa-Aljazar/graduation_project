'use client';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { Stack } from '@mantine/core';
import { use } from 'react';

export default function Article_Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Article_Story written_content_Id={parseInt(id)} destination={TYPE_WRITTEN_CONTENT.BLOG} />
    </Stack>
  );
}
