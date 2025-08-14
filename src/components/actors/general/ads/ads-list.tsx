'use client';

import { AdBlogStory } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { Flex, Group, Pagination, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import Ad_Skeleton from './ad/ad-skeleton';
import Ad_Card from './ad/ad-card';

interface AdsListProps {
  ads_items: AdBlogStory[];
  total_pages: number;
  loading: boolean;
}

export default function Ads_List({ ads_items, total_pages, loading }: AdsListProps) {
  const [query, setQuery] = useQueryStates({
    'ads-page': parseAsInteger.withDefault(1),
  });

  return (
    <Stack pos={'relative'}>
      {loading ? (
        <Stack gap='xs'>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
            {Array.from({ length: 8 }).map((_, index) => (
              <Ad_Skeleton key={index} />
            ))}
          </SimpleGrid>
        </Stack>
      ) : ads_items.length === 0 ? (
        <Paper p='xl' radius='md' withBorder>
          <Group gap={10} w={'100%'} justify='center' mt={30}>
            <MessageCircleWarning size={25} className='!text-primary' />
            <Text fw={500} fz={24} ta='center' className='!text-primary'>
              لا توجد إعلانات حالياً
            </Text>
          </Group>
        </Paper>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
          {ads_items.map((ad, index) => (
            <Ad_Card key={index} ad={ad} />
          ))}
        </SimpleGrid>
      )}

      {!loading && total_pages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={query['ads-page']}
            onChange={(value: number) => setQuery({ 'ads-page': value })}
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
