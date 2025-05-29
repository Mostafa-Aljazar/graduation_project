import Blog_Stories_Content from '@/components/actors/manager/blogs-stories/content/blog-stories-content';
import HEADER_TABS from '@/components/actors/manager/blogs-stories/header/header-tabs';
import { Stack } from '@mantine/core';

export default function Ads_Blogs() {
  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <HEADER_TABS />
      <Blog_Stories_Content />
    </Stack>
  );
}
