import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';

const FALLBACK = {
  TITLE: 'عرض المحتوى | AL-AQSA Camp',
  DESCRIPTION: 'عرض تفاصيل المحتوى النصي.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ manager: string; id: string }>;
  searchParams: Promise<{ 'written-tab'?: TYPE_WRITTEN_CONTENT }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { manager, id } = await params;
  const managerId = Number(manager);
  const contentId = Number(id);
  const { 'written-tab': tabParam } = await searchParams;
  const tab = tabParam || TYPE_WRITTEN_CONTENT.BLOG;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getAdBlogStory({ id: contentId, type: tab });
    const content = response?.ad_blog_story;

    if (content) {
      const title = content.title || FALLBACK.TITLE;
      const description = content.brief || content.content?.slice(0, 160) || FALLBACK.DESCRIPTION;
      const images = (content?.imgs.length ? content.imgs : [FALLBACK.IMAGE]).map((img) => ({
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
          url:
            APP_URL +
            MANAGER_ROUTES_fUNC({ manager_Id: managerId, written_content_Id: contentId })
              .AD_BLOG_STORY,
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
    }
  } catch {}

  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'article',
      url:
        APP_URL +
        MANAGER_ROUTES_fUNC({ manager_Id: managerId, written_content_Id: contentId }).AD_BLOG_STORY,
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

export default async function Manager_Aid_Blog_Story({ params }: Props) {
  const { id } = await params;
  const contentId = Number(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ad_Blog_Story_Page written_content_Id={contentId} />
    </Suspense>
  );
}
