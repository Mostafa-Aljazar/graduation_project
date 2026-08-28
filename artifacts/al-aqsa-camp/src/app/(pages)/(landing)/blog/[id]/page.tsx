
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { LANDING_ROUTES } from '@/constants/routes';
import { APP_URL } from '@/constants/services';
import { BLOG_PAGE } from '@/assets/common/manifest';
import { Stack } from '@mantine/core';

interface Props {
  params: { id: string  };
}



export default function Article_Page({ params }: Props) {
  const { id } = params;

  return (
    <Stack pt={60} className='w-full' mih='100vh'>
      <Article_Story written_content_Id={parseInt(id)} destination={TYPE_WRITTEN_CONTENT.BLOG} />
    </Stack>
  );
}
