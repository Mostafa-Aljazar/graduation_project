import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { Suspense } from 'react';

import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';


interface Props {
  params: { manager: string; id: string  };
  searchParams: { 'written-tab'?: TYPE_WRITTEN_CONTENT  };
}


export default function Manager_Aid_Blog_Story({ params }: Props) {
  const { id } = params;
  const contentId = Number(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ad_Blog_Story_Page written_content_Id={contentId} />
    </Suspense>
  );
}
