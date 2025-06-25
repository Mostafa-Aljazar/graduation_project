import Article_Story from '@/components/landing/common/article-story/article-story';
import { Stack } from '@mantine/core';

export default async function Page({
  params,
}: {
  params: Promise<{ story_Id: string }>;
}) {
  const { story_Id } = await params;
  return (
    <Stack pt={60}>
      <Article_Story
        article_story_Id={Number(story_Id)}
        destination={'story'}
      />
    </Stack>
  );
}
