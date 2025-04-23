'use client';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Story_Card from './Story_Card';
import { useQuery } from '@tanstack/react-query';
import { getSuccessStories } from '@/actions/getSuccessStories';
import { Loader } from '@mantine/core';

export default function Stories_Cards() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const { data: storiesData, isLoading: isLoading } = useQuery({
    queryKey: ['SuccessStories'],
    queryFn: async () => {
      const data = await getSuccessStories();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Carousel
      dir='ltr'
      align='start'
      plugins={[autoplay.current]}
      loop={true}
      withControls={true}
      h={200}
      classNames={{
        controls: '!text-black  !px-10 !hidden md:!flex',
        control: '!bg-second',
      }}
    >
      {storiesData &&
        storiesData.map((item) => <Story_Card {...item} key={item.id} />)}
    </Carousel>
  );
}
