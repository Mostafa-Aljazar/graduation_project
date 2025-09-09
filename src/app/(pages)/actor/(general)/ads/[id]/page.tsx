import type { Metadata, ResolvingMetadata } from 'next';
import { FAVICON } from '@/assets/common';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';

interface Props {
  params: Promise<{ id: string }>;
}

const FALLBACK = {
  TITLE: 'إعلان | AL-AQSA Camp',
  DESCRIPTION: 'شاهد أحدث الإعلانات والمحتوى على منصة مخيم الأقصى للنازحين',
  IMAGE: FAVICON.src,
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const { ad_blog_story: ad } = await getAdBlogStory({
      id: Number(id),
      type: TYPE_WRITTEN_CONTENT.ADS,
    });

    const title = ad?.title ?? FALLBACK.TITLE;
    const description = ad?.brief?.slice(0, 160) ?? FALLBACK.DESCRIPTION;

    const images = (ad?.imgs?.length ? ad.imgs : [FALLBACK.IMAGE]).map((img) => ({
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
        url: `${APP_URL + GENERAL_ACTOR_ROUTES.ADS}/${id}`,
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
        url: `${APP_URL + GENERAL_ACTOR_ROUTES.ADS}/${id}`,
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

export default async function Ad_Page({ params }: Props) {
  const { id } = await params;

  return (
    <Ad_Blog_Story_Page written_content_Id={Number(id)} destination={TYPE_WRITTEN_CONTENT.ADS} />
  );
}
