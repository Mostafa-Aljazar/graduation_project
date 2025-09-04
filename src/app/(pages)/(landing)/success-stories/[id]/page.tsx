import type { Metadata, ResolvingMetadata } from 'next';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { STORIES_PAGE } from '@/assets/common/manifest';
import { LANDING_ROUTES } from '@/constants/routes';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { Stack } from '@mantine/core';

type StoryPageProps = {
  params: Promise<{ id: string }>;
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Dynamic SEO metadata
export async function generateMetadata(
  { params }: StoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  const previousImages = (await parent)?.openGraph?.images || [];

  const res = await getAdBlogStory({
    id: parseInt(id),
    type: TYPE_WRITTEN_CONTENT.SUCCESS_STORIES,
  });

  const story = res.ad_blog_story;

  if (!story) return {};

  return {
    title: story.title,
    description: story.brief,
    openGraph: {
      title: story.title,
      description: story.brief,
      type: 'article',
      url: `https://al-aqsa-camp.vercel.app${LANDING_ROUTES.SUCCESS_STORY}/${story.id}`,
      images: [
        {
          url: story.imgs?.[0] || STORIES_PAGE.src,
          width: 1280,
          height: 720,
          alt: story.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.brief,
      images: [story.imgs?.[0] || STORIES_PAGE.src],
    },
  };
}

// Page component
export default async function Story_Page({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Article_Story
        written_content_Id={parseInt(id)}
        destination={TYPE_WRITTEN_CONTENT.SUCCESS_STORIES}
      />
    </Stack>
  );
}
