
import { FAVICON } from '@/assets/common';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';

interface Props {
  params: { id: string  };
}



export default function Ad_Page({ params }: Props) {
  const { id } = params;

  return (
    <Ad_Blog_Story_Page written_content_Id={Number(id)} destination={TYPE_WRITTEN_CONTENT.ADS} />
  );
}
