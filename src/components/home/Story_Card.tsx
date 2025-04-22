import successStory from '@/@types/successStories';
import { Carousel } from '@mantine/carousel';
import { Flex, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = successStory;

export default function Story_Card(story: Props) {
  return (
    <Carousel.Slide h={{ base: 200, md: 200 }}>
      <Flex
        direction={'row'}
        wrap='nowrap'
        w={'100%'}
        px={{ base: 10, md: '10%' }}
        h={{ base: 200, md: 200 }}
        align={'center'}
        className='!overflow-hidden'
        gap={0}
      >
        <Image
          src={story.img}
          alt={'title'}
          className='w-[150px] md:w-[200px] md:h-36'
        />
        <Stack gap={5} justify='start' h={'100%'} py={20} px={20} ta={'right'}>
          <Text fw={500} fz={{ base: 20, lg: 25 }} className='!text-primary'>
            {story.title}
          </Text>
          <Text fw={400} fz={16} className='!text-dark'>
            {story.content}
          </Text>
        </Stack>
      </Flex>
    </Carousel.Slide>
  );
}
