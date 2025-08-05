'use client';
import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { Package } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { USER_RANK, USER_TYPE, UserRank } from '@/constants/userTypes';
import { AdBlogStory } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import Ad_Blog_Story_Card_Skeleton from './ad-blog-story-card-skeleton';
import Ad_Blog_Story_Card from './blog-story-ad-card';

interface AdsBlogsStoriesListProps {
  data: AdBlogStory[];
  total_pages: number;
  isLoading: boolean;
  manager_Id: number;
}

export default function Ads_Blogs_Stories_List({
  data,
  total_pages,
  isLoading,
  manager_Id,
}: AdsBlogsStoriesListProps) {
  const [activePage, setActivePage] = useQueryState(
    'written-page',
    parseAsInteger.withDefault(1)
  );

  return (
    <Stack pos={'relative'} py={20}>
      {isLoading ? (
        <Stack gap='xs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Ad_Blog_Story_Card_Skeleton key={index} />
          ))}
        </Stack>
      ) : data.length === 0 ? (
        <Group gap={10} w={'100%'} justify='center' mt={30}>
          <Package size={25} className='!text-primary' />
          <Text fw={500} fz={24} ta='center' className='!text-primary'>
            لا توجد بيانات المحتوى لعرضها
          </Text>
        </Group>
      ) : (
        <Stack gap='xs'>
          {data.map((item) => (
            <Ad_Blog_Story_Card
              key={item.id}
              written_data={item}
              manager_Id={manager_Id}
            />
          ))}
        </Stack>
      )}

      {!isLoading && total_pages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={total_pages}
            size='sm'
            radius='xl'
            withControls={false}
            mx='auto'
            classNames={{
              dots: '!rounded-full !text-gray-300 border-1',
              control: '!rounded-full',
            }}
          />
        </Flex>
      )}
    </Stack>
  );
}
