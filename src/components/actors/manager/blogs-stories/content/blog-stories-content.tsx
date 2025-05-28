'use client';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import {
  ADS_HEADER_TITLE,
  BLOG_HEADER_TITLE,
  SUCCESS_STORIES_HEADER_TITLE,
} from '@/content/actor/manager/Ads_Blogs';
import useAuth from '@/hooks/useAuth';
import { Button, Group, Text } from '@mantine/core';
import { MessageSquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';
import Blog_Story_Ad_Cards from './blog-story-ads-cards';

export enum typeAdd {
  BLOG = 'BLOG',
  SUCCESS_STORIES = 'SUCCESS_STORIES',
  ADS = 'ADS',
}

export default function Blog_Stories_Content() {
  const { user } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsStringEnum<typeAdd>(Object.values(typeAdd)) // pass a list of allowed values
      .withDefault(typeAdd.BLOG)
  );

  // const [activeTab, setActiveTab] = useQueryState(
  //   'tab',
  //   parseAsString.withDefault('BLOG')
  // );

  const handelAdd = () =>
    router.push(
      `${MANAGER_ROUTES_fUNC(user?.id ?? 0).ADD_ADS_BLOGS}?type=${activeTab}`
    );

  return (
    <>
      <Group
        w={{ base: '100%', md: '80%' }}
        mt={20}
        justify='space-between'
        wrap='nowrap'
        align='center'
      >
        <Text fw={600} fz={25} className='!text-primary'>
          {activeTab == 'ADS'
            ? ADS_HEADER_TITLE
            : activeTab == 'SUCCESS_STORIES'
            ? SUCCESS_STORIES_HEADER_TITLE
            : BLOG_HEADER_TITLE}
        </Text>
        <Button
          variant='filled'
          color='#4A704A'
          size={'sm'}
          radius='md'
          className='!shadow-md'
          leftSection={<MessageSquarePlus size={16} />}
          onClick={handelAdd}
        >
          اضافة
        </Button>
      </Group>

      <Blog_Story_Ad_Cards
        type={activeTab as 'BLOG' | 'SUCCESS_STORIES' | 'ADS'}
      />
    </>
  );
}
