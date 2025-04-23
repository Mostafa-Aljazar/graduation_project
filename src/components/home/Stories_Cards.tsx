'use client';
import Story_Card from './Story_Card';
import { useQuery } from '@tanstack/react-query';
import { getSuccessStories } from '@/actions/getSuccessStories';
import { Box, Loader, Text } from '@mantine/core';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import successStoryResponse from '@/@types/successStoryResponse';

export default function Stories_Cards() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const {
    data: storiesData,
    isLoading,
    error,
  } = useQuery<successStoryResponse[]>({
    queryKey: ['SuccessStories'],
    queryFn: getSuccessStories,
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error loading stories: {error.message}</Text>;

  return (
    <Box px={10} w='100%'>
      <Carousel
        dir='ltr' // important for avoid direction problems
        h={200}
        w='100%'
        align='start'
        withControls
        slideSize='100%'
        loop
        slidesToScroll={1}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={{
          controls: '!text-black !px-10 !hidden md:!flex',
          control: '!bg-second',
        }}
      >
        {storiesData &&
          storiesData.map((item, index) => (
            <Carousel.Slide h={'100%'} w={'100%'} key={item.id || index}>
              <Story_Card {...item} key={item.id || index} />
            </Carousel.Slide>
          ))}
      </Carousel>
    </Box>
  );
}
