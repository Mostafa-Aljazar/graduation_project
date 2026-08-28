import type { Metadata, ResolvingMetadata } from 'next';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { LANDING_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';
import { BLOG_PAGE } from '@/assets/common/manifest';
import { Stack } from '@mantine/core';

interface Props {
  params: Promise<{ id: string }>;
}

const FALLBACK = {
  TITLE: 'مقال | AL-AQSA Camp',
  DESCRIPTION: 'اقرأ مقالات منصة مخيم الأقصى حول المواضيع المختلفة.',
  IMAGE: BLOG_PAGE.src,
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const { ad_blog_story: article } = await getAdBlogStory({
      id: parseInt(id),
      type: TYPE_WRITTEN_CONTENT.BLOG,
    });

    const title = article?.title ?? FALLBACK.TITLE;
    const description = article?.brief?.substring(0, 160) ?? FALLBACK.DESCRIPTION;

    const images = (article?.imgs.length ? article.imgs : [FALLBACK.IMAGE]).map((img) => ({
      url: typeof img === 'string' ? img : FALLBACK.IMAGE,
      width: 1280,
      height: 720,
      alt: title,
    }));

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'article',
        url: `${APP_URL + LANDING_ROUTES.BLOG}/${id}`,
        images: [...images, ...previousImages],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images,
      },
    };
  } catch (error) {
    return {
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        type: 'article',
        url: `${APP_URL + LANDING_ROUTES.BLOG}/${id}`,
        images: [
          {
            url: FALLBACK.IMAGE,
            width: 1280,
            height: 720,
            alt: FALLBACK.TITLE,
          },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        images: [FALLBACK.IMAGE],
      },
    };
  }
}

export default async function Article_Page({ params }: Props) {
  const { id } = await params;

  return (
    <Stack pt={60} className='w-full' mih='100vh'>
      <Article_Story written_content_Id={parseInt(id)} destination={TYPE_WRITTEN_CONTENT.BLOG} />
    </Stack>
  );
}
