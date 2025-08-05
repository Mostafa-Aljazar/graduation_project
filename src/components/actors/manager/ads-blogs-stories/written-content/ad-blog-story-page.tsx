'use client';

import {
  Box,
  Group,
  LoadingOverlay,
  Paper,
  Center,
  ThemeIcon,
  Text,
  Stack,
  Divider,
  Image,
} from '@mantine/core';
import { StaticImageData } from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { AdBlogStoryResponse } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import { MessageCircleWarning } from 'lucide-react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { parseAsStringEnum, useQueryStates } from 'nuqs';

interface AdBlogStoryPageProps {
  manager_Id: number;
  written_content_Id: number;
}

export default function Ad_Blog_Story_Page({
  manager_Id,
  written_content_Id,
}: AdBlogStoryPageProps) {
  const [query, setQuery] = useQueryStates({
    'written-tab': parseAsStringEnum<TYPE_WRITTEN_CONTENT>(
      Object.values(TYPE_WRITTEN_CONTENT)
    ).withDefault(TYPE_WRITTEN_CONTENT.BLOG),
  });

  const {
    data: writtenContentsData,
    isLoading,
    error,
  } = useQuery<AdBlogStoryResponse, Error>({
    queryKey: ['Ads_Blogs_Stories', written_content_Id, query['written-tab']],
    queryFn: () =>
      getAdBlogStory({
        id: written_content_Id,
        type: query['written-tab'],
      }),
  });

  const hasError = Boolean(error) || Boolean(writtenContentsData?.error);
  const data = writtenContentsData?.ad_blog_story;
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Stack pos='relative' px={{ base: 16, md: 40 }} py={24} w='100%'>
      <LoadingOverlay visible={isLoading} zIndex={1000} />

      {hasError ? (
        <Paper p='md' withBorder className='!bg-red-100 rounded-md'>
          <Center mb='sm'>
            <ThemeIcon color='red' variant='light' size='lg'>
              <MessageCircleWarning />
            </ThemeIcon>
          </Center>
          <Text c='red' fw={600} ta='center'>
            {writtenContentsData?.error ||
              error?.message ||
              'حدث خطأ أثناء جلب المحتوى'}
          </Text>
        </Paper>
      ) : (
        <Stack gap='xl' w='100%'>
          <Group justify='space-between' align='center' w='100%'>
            <Text fw={600} fz={20} className='text-gray-900'>
              {data?.title}
            </Text>
            <Text size='sm' c='dimmed'>
              نُشر بتاريخ:
              {data?.created_at
                ? new Date(data.created_at).toLocaleDateString('ar-EG')
                : 'تاريخ غير متوفر'}
            </Text>
          </Group>

          {data && data.imgs.length > 0 && (
            <Box w='100%' className='rounded overflow-hidden'>
              <Carousel
                slideSize='100%'
                withControls
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                emblaOptions={{ loop: true }}
                classNames={{
                  controls:
                    '!text-black !bg-transparent !px-10 !hidden md:!flex',
                  control: '!bg-gray-100',
                }}
                styles={{ root: { width: '100%' } }}
              >
                {data.imgs.map((img, index) => (
                  <Carousel.Slide key={index}>
                    <Image
                      src={
                        typeof img === 'object' && img !== null && 'src' in img
                          ? (img as StaticImageData).src
                          : (img as string)
                      }
                      alt={data.title}
                      radius='md'
                      className='mx-auto rounded w-full max-h-[250px] !object-cover'
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          )}

          <Divider my={8} />

          <Box
            dir='rtl'
            className='w-full max-w-none [&>*]:max-w-full prose prose-lg prose-slate'
            dangerouslySetInnerHTML={{ __html: data?.content || '' }}
          />
        </Stack>
      )}
    </Stack>
  );
}
