'use client';
import articleResponse from '@/@types/landing/articleResponse.type';
import { img_1 } from '@/assets/landing/home';
import { LANDING_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import getLimitedWords from '@/utils/getLimitedWords';
import {
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = articleResponse & {
  destination?: 'blogs' | 'article';
};
export default function Blog_Card({
  destination = 'blogs',
  id,
  image,
  createdAt,
  title,
  content,
  brief,
}: Props) {
  const isInBlogs = destination === 'blogs' || false;
  console.log('🚀 ~ isInBlogs:', isInBlogs);

  return (
    <Stack
      align='start'
      justify='start'
      w={isInBlogs ? { base: 350, md: '100%' } : 300}
      p={0}
      className={cn(
        '!shadow-lg !rounded-md md:h-[200px] !overflow-hidden  ',
        !isInBlogs && ' !h-full '
      )}
    >
      <Link href={`${LANDING_ROUTES.BLOG}/${id}`} className='w-full'>
        <Flex
          direction={isInBlogs ? { base: 'column', md: 'row' } : 'column'}
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
            w={{ base: 350, md: isInBlogs ? 250 : 300 }}
            h={{ base: 150, md: 200 }}
            //  className={cn(
            // '   !w-[350px] md:!w-[300px] !h-[150px] md:!h-[200px]',
            // isInBlogs && 'md:!w-[250px]'
            // )}
          >
            {image && (
              <Image
                alt='Blog Image'
                src={image}
                fill
                className={cn(
                  ' rounded-sm   !object-fill !w-[350px] md:!w-[300px]   !h-[150px] md:!h-[200px]',
                  isInBlogs && 'md:!w-[250px]'
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
            <Text fw={400} fz={11} className='!text-primary'>
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </Text>
            <Text
              fw={500}
              fz={isInBlogs ? { base: 16, lg: 20 } : 16}
              className='!text-primary'
            >
              {title}
            </Text>

            <Text fw={500} fz={14} size='sm' className='!text-dark'>
              {brief}
            </Text>
            {isInBlogs && (
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
