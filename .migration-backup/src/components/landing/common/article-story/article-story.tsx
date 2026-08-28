import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Ad_Blog_Story_Page from '@/components/actors/manager/ads-blogs-stories/written-content/ad-blog-story-page';

interface Props {
  written_content_Id: number;
  destination?: TYPE_WRITTEN_CONTENT;
}
export default function Article_Story({ written_content_Id, destination }: Props) {
  return <Ad_Blog_Story_Page written_content_Id={written_content_Id} destination={destination} />;
}
