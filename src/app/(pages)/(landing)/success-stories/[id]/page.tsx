import type { Metadata, ResolvingMetadata } from 'next';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { STORIES_PAGE } from '@/assets/common/manifest';
import { LANDING_ROUTES } from '@/constants/routes';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { Stack } from '@mantine/core';
import { APP_URL } from '@/constants/services';

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

const FALLBACK_TITLE = 'قصة نجاح | AL-AQSA Camp';
const FALLBACK_DESCRIPTION = 'محتوى قصة النجاح غير متوفر';
const FALLBACK_IMAGE = STORIES_PAGE.src;

// Dynamic SEO metadata
export async function generateMetadata(
  { params }: StoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const { ad_blog_story: story } = await getAdBlogStory({
      id: parseInt(id),
      type: TYPE_WRITTEN_CONTENT.SUCCESS_STORIES,
    });

    if (!story)
      return {
        title: FALLBACK_TITLE,
        description: FALLBACK_DESCRIPTION,
        metadataBase: new URL(APP_URL),
      };

    const storyImages = story.imgs.length
      ? story.imgs.map((img: string) => ({
          url: img,
          width: 1280,
          height: 720,
          alt: story.title,
        }))
      : [
          {
            url: FALLBACK_IMAGE,
            width: 1280,
            height: 720,
            alt: story.title ?? FALLBACK_TITLE,
          },
        ];

    return {
      title: story.title ?? FALLBACK_TITLE,
      description: story.brief,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title: story.title ?? FALLBACK_TITLE,
        description: story.brief,
        type: 'article',
        url: `${APP_URL + LANDING_ROUTES.SUCCESS_STORY}/${story.id}`,
        images: [...storyImages, ...previousImages],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title: story.title,
        description: story.brief,
        images: storyImages,
      },
    };
  } catch {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
      metadataBase: new URL(APP_URL),
    };
  }
}

export default async function Story_Page({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <Stack pt={60} className='w-full' mih='100vh'>
      <Article_Story
        written_content_Id={parseInt(id)}
        destination={TYPE_WRITTEN_CONTENT.SUCCESS_STORIES}
      />
    </Stack>
  );
}
