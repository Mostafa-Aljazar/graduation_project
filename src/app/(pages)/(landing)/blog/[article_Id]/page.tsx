import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
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
        written_content_Id={parseInt(article_Id)}
        destination={TYPE_WRITTEN_CONTENT.BLOG}
      />
    </Stack>
  );
}
