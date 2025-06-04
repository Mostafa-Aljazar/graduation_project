'use client';
import { Article_SuccessStory_Ad } from '@/@types/common/article-successStories-adsResponse.type';
import { LANDING_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { Box, Button, Flex, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = Article_SuccessStory_Ad & {
  destination?: 'blogs' | 'article' | 'success-stories' | 'success-story';
};
export default function Blog_Story_Card({
  destination = 'blogs',
  id,
  imgs,
  createdAt,
  title,
  content,
  brief,
}: Props) {
  const isInBlogs = destination === 'blogs' || false;
  const isInSuccessStories = destination === 'success-stories' || false;
  const isInSuccessStory = destination === 'success-story' || false;

  return (
    <Stack
      align='start'
      justify='start'
      w={isInBlogs || isInSuccessStories ? { base: 350, md: '100%' } : 300}
      p={0}
      className={cn(
        '!shadow-lg !rounded-md md:h-[200px] !overflow-hidden  ',
        !isInBlogs && ' !h-full '
      )}
    >
      <Link
        href={
          isInSuccessStories || isInSuccessStory
            ? `${LANDING_ROUTES.SUCCESS_STORY}/${id}`
            : `${LANDING_ROUTES.BLOG}/${id}`
        }
        className='w-full'
      >
        <Flex
          direction={
            isInBlogs || isInSuccessStories
              ? { base: 'column', md: 'row' }
              : 'column'
          }
          justify='flex-start'
          align='center'
          wrap='nowrap'
          p={0}
          gap={0}
          w={'100%'}
          h={'100%'}
        >
          <Box
            pos={'relative'}
            w={{ base: 350, md: isInBlogs || isInSuccessStories ? 250 : 300 }}
            h={{ base: 150, md: 200 }}
          >
            {imgs && (
              <Image
                alt='Blog Image'
                src={imgs[0]}
                fill
                className={cn(
                  ' rounded-sm   !object-fill !w-[350px] md:!w-[300px]   !h-[150px] md:!h-[200px]',
                  (isInBlogs || isInSuccessStories) && 'md:!w-[250px]'
                )}
              />
            )}
          </Box>

          <Stack
            flex={1}
            gap={5}
            align='flex-start'
            justify='space-between'
            w={'100%'}
            h={'100%'}
            py={{ base: 10, md: 20 }}
            px={20}
          >
            <Text
              fw={400}
              fz={11}
              className='!text-primary'
              hidden={isInSuccessStory || isInSuccessStories}
            >
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </Text>
            <Text
              fw={500}
              fz={isInBlogs || isInSuccessStories ? { base: 16, lg: 20 } : 16}
              className='!text-primary'
            >
              {title}
            </Text>

            <Text fw={500} fz={14} size='sm' className='!text-dark'>
              {brief}
            </Text>
            {(isInBlogs || isInSuccessStories) && (
              <Button
                variant='gradient'
                w={100}
                h={30}
                className='self-end !p-0 !rounded-r-none !rounded-l-md'
                gradient={{ from: '#345E40', to: '#97A483', deg: 90 }} // Green to black gradient
              >
                المزيد
              </Button>
            )}
          </Stack>
        </Flex>
      </Link>
    </Stack>
  );
}
