'use client';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import {
  ADS_HEADER_TITLE,
  BLOG_HEADER_TITLE,
  SUCCESS_STORIES_HEADER_TITLE,
  TYPE_CONTENT,
} from '@/content/actor/manager/ads-blogs-stories';
import useAuth from '@/hooks/useAuth';
import { Button, Group, Text } from '@mantine/core';
import { MessageSquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import Blog_Story_Ad_Cards from './blog-story-ads-cards';
import Link from 'next/link';

export default function Blog_Stories_Content() {
  const { user } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsStringEnum<TYPE_CONTENT>(Object.values(TYPE_CONTENT)) // pass a list of allowed values
      .withDefault(TYPE_CONTENT.BLOG)
  );

  const handelAdd = () => {
    router.push(
      `${
        MANAGER_ROUTES_fUNC(user?.id as number).ADD_ADS_BLOGS
      }?type=${activeTab}`
    );
  };
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
          {activeTab == TYPE_CONTENT.ADS
            ? ADS_HEADER_TITLE
            : activeTab == TYPE_CONTENT.SUCCESS_STORIES
            ? SUCCESS_STORIES_HEADER_TITLE
            : BLOG_HEADER_TITLE}
        </Text>
        <Link
          href={`${
            MANAGER_ROUTES_fUNC(user?.id as number).ADD_ADS_BLOGS
          }?type=${activeTab}`}
        >
          <Button
            variant='filled'
            color='#4A704A'
            size={'sm'}
            radius='md'
            className='!shadow-md'
            leftSection={<MessageSquarePlus size={16} />}
            // onClick={handelAdd}
          >
            اضافة
          </Button>
        </Link>
      </Group>

      <Blog_Story_Ad_Cards type={activeTab} />
    </>
  );
}
