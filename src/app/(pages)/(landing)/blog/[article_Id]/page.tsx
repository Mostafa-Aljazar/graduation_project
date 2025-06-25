import Article_Story from '@/components/landing/common/article-story/article-story';
import { Stack } from '@mantine/core';

export default async function Article_Page({
  params,
}: {
  params: Promise<{ article_Id: string }>;
}) {
  const { article_Id } = await params;

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Article_Story
        article_story_Id={Number(article_Id)}
        destination={'article'}
      />
    </Stack>
  );
}
