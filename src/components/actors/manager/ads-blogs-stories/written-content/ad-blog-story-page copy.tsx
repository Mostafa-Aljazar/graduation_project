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
import formatDateInArabic from '@/utils/formatDateInArabic';
import { MessageCircleWarning } from 'lucide-react';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface AdBlogStoryPageProps {
  manager_Id: number;
  written_content_Id: number;
}

export default function Ad_Blog_Story_Page_Copy({
  manager_Id,
  written_content_Id,
}: AdBlogStoryPageProps) {
  const {
    data: writtenContentsData,
    isLoading,
    error,
  } = useQuery<AdBlogStoryResponse, Error>({
    queryKey: ['Ads_Blogs_Stories', written_content_Id, TYPE_WRITTEN_CONTENT.ADS],
    queryFn: () =>
      getAdBlogStory({
        id: written_content_Id,
        type: TYPE_WRITTEN_CONTENT.ADS,
      }),
  });

  const hasError = Boolean(error) || Boolean(writtenContentsData?.error);
  const writtenData = writtenContentsData && writtenContentsData.ad_blog_story;

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const data = writtenContentsData?.ad_blog_story;

  return (
    <Stack pos='relative' p={20}>
      <LoadingOverlay visible={isLoading} zIndex={1000} />

      {hasError ? (
        <Paper p='md' withBorder mt='md' className='!bg-red-100 rounded-md'>
          <Center mb='sm'>
            <ThemeIcon color='red' variant='light' size='lg'>
              <MessageCircleWarning />
            </ThemeIcon>
          </Center>
          <Text c='red' fw={600} ta='center'>
            {writtenContentsData?.error || error?.message || 'حدث خطأ أثناء جلب المحتوى'}
          </Text>
        </Paper>
      ) : (
        <Stack gap='xl'>
          <Group justify='space-between' align='center'>
            <Text fw={600} fz={22}>
              {data?.title}
            </Text>

            <Text size='sm' c='dimmed'>
              نُشر بتاريخ:{' '}
              {data?.created_at
                ? new Date(data.created_at).toLocaleDateString('ar-EG')
                : 'تاريخ غير متوفر'}
            </Text>
          </Group>

          {data && data.imgs.length > 0 && (
            <Box px={{ base: 0, md: 10 }} w='100%'>
              <Carousel
                slideSize='100%'
                withControls
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                emblaOptions={{ loop: true }}
                classNames={{
                  controls: '!text-black !bg-transparent !px-10 !hidden md:!flex',
                  control: '!bg-second !bg-gray-100',
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
                      className='mx-auto max-h-[300px] object-fill'
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          )}

          <Divider />

          <div
            className='flex-1 w-full [&>*]:max-w-full prose prose-lg prose-slate'
            dir='rtl'
            dangerouslySetInnerHTML={{ __html: data?.content || '' }}
          />
        </Stack>
      )}
    </Stack>
  );
}
