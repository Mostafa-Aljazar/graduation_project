'use client';

import { Articles_SuccessStories_Ads_Response } from '@/@types/common/article-successStories-adsResponse.type';
import { getAds } from '@/actions/actors/general/ads/getAds';
import { BLOG_CHILD } from '@/assets/landing/blog';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import {
  Box,
  Card,
  Center,
  Flex,
  Pagination,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsInteger, useQueryStates } from 'nuqs';

export default function Ads_List() {
  const [query, setQuery] = useQueryStates({
    'ads-page': parseAsInteger.withDefault(1),
  });

  const itemsPerPage = 6;

  const {
    data: adsData,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStories_Ads_Response, Error>({
    queryKey: ['ads', query],
    queryFn: async () => {
      return await getAds({ page: query['ads-page'], limit: itemsPerPage });
    },
  });

  if (isLoading) {
    return (
      <Stack gap='sm'>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Paper key={i} radius='md' withBorder>
              <Skeleton height={120} radius='sm' mb='sm' />
              <Stack p='sm'>
                <Skeleton height={12} width='60%' radius='xl' mb={4} />
                <Skeleton height={10} width='90%' radius='xl' />
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    );
  }

  if (error || !adsData) {
    return (
      <Paper className='!bg-red-100 !shadow-xl p-20 border-1 !border-red-400 rounded-md'>
        <Center mb='sm'>
          <ThemeIcon color='red' variant='light' size='lg'>
            <AlertCircle />
          </ThemeIcon>
        </Center>
        <Text ta='center' c='red' fw={600}>
          فشل في تحميل الإعلانات
        </Text>
      </Paper>
    );
  }

  if (adsData.articles_successStories_ads.length === 0) {
    return (
      <Paper p='xl' radius='md' withBorder>
        <Text ta='center' size='lg' c='gray'>
          لا توجد إعلانات حالياً
        </Text>
      </Paper>
    );
  }

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
        {adsData.articles_successStories_ads.map((ad, index) => (
          <Link href={`${GENERAL_ACTOR_ROUTES.ADS}/${ad.id}`} key={index}>
            <Card
              p={0}
              withBorder
              radius='md'
              shadow='xs'
              className='flex flex-col h-full hover:scale-[1.01] transition-transform duration-200 ease-in-out hover:cursor-pointer'
            >
              <Box>
                <Image
                  src={ad.imgs[0]}
                  alt={ad.title}
                  width={500}
                  height={300}
                  className='rounded-t-md w-full h-[140px] object-cover'
                />
              </Box>

              <Stack p='xs' gap={5} className='flex-1'>
                <Text fw={600} size='sm' lineClamp={1}>
                  {ad.title}
                </Text>

                <Text size='xs' c='dimmed' lineClamp={3} className='flex-1'>
                  {ad.brief || 'لا يوجد وصف'}
                </Text>
              </Stack>
            </Card>
          </Link>
        ))}
      </SimpleGrid>

      {adsData.pagination?.totalPages && adsData.pagination.totalPages > 1 && (
        <Flex justify='center' mt='lg'>
          <Pagination
            value={query['ads-page']}
            onChange={(value: number) => setQuery({ 'ads-page': value })}
            total={adsData.pagination.totalPages}
            size='sm'
            radius='xl'
            withControls={false}
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
