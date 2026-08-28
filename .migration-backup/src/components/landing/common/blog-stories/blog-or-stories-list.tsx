'use client';
import { Stack, Text, Flex, Pagination, Paper, Box, Center, ThemeIcon } from '@mantine/core';
import { Package } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { AdBlogStory } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import Blog_Story_Card_Skeleton from '../blog-story-card-skeleton';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import Common_Blog_Story_Card from './common-blog-story-card';

interface Props {
  data: AdBlogStory[];
  total_pages: number;
  isLoading: boolean;
  destination: TYPE_WRITTEN_CONTENT;
}

export default function Blog_Or_Stories_List({ data, total_pages, isLoading, destination }: Props) {
  const [activePage, setActivePage] = useQueryState('page', parseAsInteger.withDefault(1));

  return (
    <Stack w={'100%'} pos={'relative'} align='center' justify='center'>
      {isLoading ? (
        <Stack gap='xs' align='center' w={'100%'} px={{ base: 20, md: 30, lg: 130 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Blog_Story_Card_Skeleton key={index} />
          ))}
        </Stack>
      ) : data.length === 0 ? (
        <Paper w={'95%'} p='md' withBorder className='!bg-second-light rounded-md text-center'>
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='primary' variant='light' size='lg'>
                <Package size={25} className='!text-primary' />
              </ThemeIcon>
            </Center>
            <Text fw={600} fz={16} ta='center' className='!text-primary'>
              بيانات المحتوى لا توجد لعرضها
            </Text>
          </Box>
        </Paper>
      ) : (
        <Stack gap='xs' align='center' w={'100%'} px={{ base: 20, md: 30, lg: 130 }}>
          {data.map((article, index) => (
            <Common_Blog_Story_Card
              destination={destination}
              key={index}
              id={article.id}
              created_at={article.created_at}
              title={article.title}
              content={article.content}
              imgs={article.imgs}
              brief={article.brief}
              type={article.type}
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
