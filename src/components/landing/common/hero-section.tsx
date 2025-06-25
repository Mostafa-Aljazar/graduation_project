'use client';
import { Carousel } from '@mantine/carousel';
import { Text, Box, Overlay } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface Props {
  slider_images: StaticImageData[] | string[];
  title: string;
  desc: string;
}

export default function Hero_Section({ slider_images, title, desc }: Props) {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const slides = slider_images.map((item, index) => (
    <Carousel.Slide key={index} w={'100%'} h={'100%'}>
      <Box
        h={{ base: 250, md: 300, lg: 350 }}
        style={{ position: 'relative', width: '100%' }}
      >
        <Image
          alt={`Hero Image ${index + 1}`}
          src={item}
          fill
          priority={true}
        />
      </Box>
    </Carousel.Slide>
  ));

  return (
    <Box pos={'relative'} w={'100%'}>
      <Carousel
        w='100%'
        h={{ base: 250, md: 300, lg: 350 }}
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
      >
        {slides}
      </Carousel>
      <Overlay color='black' opacity={0.7} zIndex={0} />
      <Box ta={'start'} className='!z-10 !text-white'>
        <Text
          fw={500}
          fz={{ base: 25, md: 30, lg: 40 }}
          pos='absolute'
          top={'25%'}
          right={'10%'}
        >
          {title}
        </Text>
        <Text
          fz={{ base: 16, md: 20, lg: 25 }}
          pos='absolute'
          top={'50%'}
          right={'10%'}
          left={'10%'}
        >
          {desc}
        </Text>
      </Box>
    </Box>
  );
}
