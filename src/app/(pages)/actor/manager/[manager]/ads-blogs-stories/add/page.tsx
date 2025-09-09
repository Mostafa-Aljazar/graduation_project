import Add_Written_Content_Form from '@/components/actors/manager/ads-blogs-stories/add/written-form/add-written-content-form';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'إضافة إعلان أو مدونة أو قصة | AL-AQSA Camp',
  DESCRIPTION: 'إضافة محتوى جديد (إعلان، مدونة، قصة) للمنصة عبر المدير.',
  IMAGE: FAVICON.src,
};

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'website',
      url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: 0 }).ADD_ADS_BLOGS_STORIES,
      images: [
        { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Add Ads Blogs Stories' },
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

export default function Add_Ad_Blog_Story_Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Add_Written_Content_Form />
    </Suspense>
  );
}
