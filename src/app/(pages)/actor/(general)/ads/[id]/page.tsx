import type { Metadata, ResolvingMetadata } from 'next';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';

interface AdPageProps {
  params: Promise<{ id: string }>;
}

const FALLBACK_TITLE = 'إعلان | AL-AQSA Camp';
const FALLBACK_DESCRIPTION = 'محتوى الإعلان غير متوفر';
const FALLBACK_IMAGE = '/favicon.ico';

// Generate dynamic metadata for Ads page
export async function generateMetadata(
  { params }: AdPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const { ad_blog_story: ad } = await getAdBlogStory({
      id: parseInt(id),
      type: TYPE_WRITTEN_CONTENT.ADS,
    });

    if (!ad)
      return {
        title: FALLBACK_TITLE,
        description: FALLBACK_DESCRIPTION,
        metadataBase: new URL(APP_URL),
      };

    const description = ad.brief?.substring(0, 160) ?? 'شاهد الإعلان على منصة مخيم الأقصى للنازحين';

    const adImages = ad.imgs.length
      ? ad.imgs.map((img) => ({
          url: img,
          width: 1280,
          height: 720,
          alt: ad.title ?? FALLBACK_TITLE,
        }))
      : [
          {
            url: FALLBACK_IMAGE,
            width: 1280,
            height: 720,
            alt: ad.title ?? FALLBACK_TITLE,
          },
        ];

    return {
      title: ad.title ?? FALLBACK_TITLE,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title: ad.title ?? FALLBACK_TITLE,
        description,
        type: 'article',
        url: `${APP_URL + GENERAL_ACTOR_ROUTES.ADS}/${id}`,
        images: [...adImages, ...previousImages],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title: ad.title ?? FALLBACK_TITLE,
        description,
        images: adImages,
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

export default async function Ad_Page({ params }: AdPageProps) {
  const { id } = await params;

  return (
    <Ad_Blog_Story_Page written_content_Id={parseInt(id)} destination={TYPE_WRITTEN_CONTENT.ADS} />
  );
}
