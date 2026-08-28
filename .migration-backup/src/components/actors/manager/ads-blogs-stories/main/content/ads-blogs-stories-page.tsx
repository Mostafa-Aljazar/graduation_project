'use client';
import {
  GET_WRITTEN_CONTENT_TABS,
  TYPE_WRITTEN_CONTENT,
} from '@/@types/actors/common-types/index.type';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { USER_TYPE } from '@/constants/userTypes';
import useAuth from '@/hooks/useAuth';
import { Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import Ads_Blogs_Stories_Content from './ads-blog-stories-content';
import Ads_Blogs_Stories_Header_Tabs from '../header/ads-blogs-stories-header-tabs';

function Ads_Blogs_Stories_Header({
  visibleAdd,
  actor_Id,
}: {
  visibleAdd: boolean;
  actor_Id: number;
}) {
  const [activeTab, setActiveTab] = useQueryState(
    'written-tab',
    parseAsStringEnum<TYPE_WRITTEN_CONTENT>(Object.values(TYPE_WRITTEN_CONTENT)).withDefault(
      TYPE_WRITTEN_CONTENT.BLOG
    )
  );

  const route = useRouter();
  const handelAdd = () => {
    route.push(
      `${
        MANAGER_ROUTES_fUNC({ manager_Id: actor_Id }).ADD_ADS_BLOGS_STORIES
      }?written-tab=${activeTab}`
    );
  };

  const IconComponent = GET_WRITTEN_CONTENT_TABS[activeTab].icon;

  return (
    <Group justify='space-between' wrap='nowrap' w={'100%'}>
      <Group gap={10} wrap='nowrap' justify='center' align='center'>
        {IconComponent && (
          <ThemeIcon variant='transparent' className='flex-shrink-0 !text-primary' size={16}>
            <IconComponent size={16} />
          </ThemeIcon>
        )}
        <Text fw={600} fz={22} className='!text-primary !text-nowrap'>
          {GET_WRITTEN_CONTENT_TABS[activeTab].label}
        </Text>
      </Group>
      <Button
        hidden={!visibleAdd}
        rightSection={<SquarePen size={16} />}
        size='xs'
        fz={16}
        fw={500}
        c={'white'}
        radius={'md'}
        className='!bg-primary shadow-lg'
        onClick={handelAdd}
      >
        إضافة
      </Button>
    </Group>
  );
}

interface AdsBlogsStoriesPageProps {
  manager_Id: number;
}

export default function Ads_Blogs_Stories_Page({ manager_Id }: AdsBlogsStoriesPageProps) {
  const { user } = useAuth();
  const isOwner = user?.role == USER_TYPE.MANAGER && manager_Id == user?.id;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Ads_Blogs_Stories_Header visibleAdd={isOwner} actor_Id={manager_Id} />

      <Ads_Blogs_Stories_Header_Tabs />

      <Ads_Blogs_Stories_Content manager_Id={manager_Id} />
    </Stack>
  );
}
