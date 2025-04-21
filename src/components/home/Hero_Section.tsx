'use client';
import { Carousel } from '@mantine/carousel';
import { Text, Box, Overlay } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { img_1, img_2, img_3 } from '@/assets/home';

// Define shared title and category
const SHARED_TITLE = 'رسالتُنا :';
const SHARED_DESCRIPTION = `نسعى لخلق الحياة لأناسٍ سُلبت منهم الحياة  \n طفولة بريئة و عيون تبحث عن الأمل `;

// Image array
const imgs = [img_1, img_2, img_3];

export default function Hero_Section() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = imgs.map((item, index) => (
    <Carousel.Slide key={index}>
      <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
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
    <Box style={{ position: 'relative', width: '100%', height: 350 }}>
      <Carousel
        withIndicators
        dir='ltr'
        height={350}
        slideSize='100%'
        align='end'
        loop
        plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
      >
        {slides}
      </Carousel>
      <Overlay color='black' opacity={0.5} zIndex={10} />{' '}
      {/* Restored for text readability */}
      <Box
        style={{
          //   position: 'absolute',
          //   top: '50%',
          //   left: '50%',
          //   transform: 'translate(-50%, -50%)',
          zIndex: 20,
          //   textAlign: 'center',
          color: 'white',
        }}
        // pos='absolute'
        // top={'20%'}
        // right={'10%'}
        ta={'start'}
        className=''
      >
        <Text fw={700} size='xl' pos='absolute' top={'30%'} right={'10%'}>
          {SHARED_TITLE}
        </Text>
        <Text size='md' pos='absolute' top={'50%'} right={'10%'} left={'10%'}>
          {SHARED_DESCRIPTION}
        </Text>
      </Box>
    </Box>
  );
}
