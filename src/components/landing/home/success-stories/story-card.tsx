import { Article_SuccessStory_Ad } from '@/@types/common/article-successStories-adsResponse.type';
import { LANDING_ROUTES } from '@/constants/routes';
import getLimitedWords from '@/utils/getLimitedWords';
import { Flex, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = Article_SuccessStory_Ad;

export default function Story_Card(story: Props) {
  return (
    <Link href={`${LANDING_ROUTES.SUCCESS_STORY}/${story.id}`}>
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
          src={story.imgs[0]}
          alt={'title'}
          className='w-[150px] md:w-[200px] md:h-36'
        />
        <Stack gap={5} justify='start' h={'100%'} py={20} px={20} ta={'right'}>
          <Text fw={500} fz={{ base: 18, lg: 25 }} className='!text-primary'>
            {story.title}
          </Text>
          <>
            <Text fw={400} fz={16} className='!text-dark' hiddenFrom='md'>
              {getLimitedWords(story.content, 10) + ' ...'}
            </Text>
            <Text fw={400} fz={16} className='!text-dark' visibleFrom='md'>
              {getLimitedWords(story.content, 50) + ' ...'}
            </Text>
          </>
        </Stack>
      </Flex>
    </Link>
  );
}
