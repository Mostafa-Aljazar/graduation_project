'use client';
import { useQuery } from '@tanstack/react-query';
import { Box, Stack, Text } from '@mantine/core';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import Story_Card from './story-card';
import { getSuccessStories } from '@/actions/landing/success-stories/getSuccessStories';
import Story_Card_Skeleton from './story-card-skeleton';
import { Articles_SuccessStories_Ads_Response } from '@/@types/common/article-successStories-adsResponse.type';

export default function Stories_Cards() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const {
    data: successStoriesData,
    isLoading,
    error,
  } = useQuery<Articles_SuccessStories_Ads_Response, Error>({
    queryKey: ['success-stories'],
    queryFn: async () => {
      return await getSuccessStories({ page: 1, limit: 7 });
    },
  });

  if (error || successStoriesData?.error) {
    return (
      <Stack align='center' justify='center' h={200} px={10}>
        <Text fw={500} fz={{ base: 18, lg: 22 }} c='red' ta='center'>
          خطأ في تحميل قصص النجاح:
          {error?.message || successStoriesData?.error || 'حدث خطأ غير متوقع'}
        </Text>
      </Stack>
    );
  }

  if (
    !isLoading &&
    successStoriesData?.articles_successStories_ads.length === 0
  ) {
    return (
      <Stack align='center' justify='center' h={200} px={10}>
        <Text
          fw={500}
          fz={{ base: 18, lg: 22 }}
          ta='center'
          className='!text-primary'
        >
          لا توجد قصص نجاح متاحة حالياً
        </Text>
      </Stack>
    );
  }
  return (
    <Box px={10} w='100%'>
      <Carousel
        h={200}
        w='100%'
        withControls
        slideSize='100%'
        emblaOptions={{
          loop: true,
          align: 'start',
          slidesToScroll: 1,
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={{
          controls: '!text-black !px-10 !hidden md:!flex',
          control: '!bg-second',
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Carousel.Slide h='100%' w='100%' key={`skeleton-${index}`}>
                <Story_Card_Skeleton />
              </Carousel.Slide>
            ))
          : successStoriesData?.articles_successStories_ads.map((item) => (
              <Carousel.Slide h='100%' w='100%' key={item.id}>
                <Story_Card {...item} />
              </Carousel.Slide>
            ))}
      </Carousel>
    </Box>
  );
}
