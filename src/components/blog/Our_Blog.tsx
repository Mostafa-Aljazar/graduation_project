'use client';
import { Pagination, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import Blog_Card from './Blog_Card';
import {
  OUR_BLOG_DATE,
  OUR_BLOG_DESC,
  OUR_BLOG_IMAGE,
  OUR_BLOG_LINK,
  OUR_BLOG_TITLE,
} from '@/content/blog';

export default function Our_Blog() {
  const [activePage, setPage] = useState(1);
  console.log('🚀 ~ Our_Blog ~ activePage:', activePage);

  return (
    <Stack pt={30} px={100} pb={100}>
      <Text
        fw={500}
        fz={{ base: 25, md: 30, lg: 35 }}
        className='!text-primary'
      >
        مدونتنا :
      </Text>

      <Stack justify='center' align='center' w={'100%'}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            <Blog_Card
              key={index}
              date={OUR_BLOG_DATE}
              title={OUR_BLOG_TITLE}
              desc={OUR_BLOG_DESC}
              img={OUR_BLOG_IMAGE}
              link={OUR_BLOG_LINK}
            />
          ))}
        <Pagination
          total={5}
          pt={30}
          size='sm'
          radius='xl'
          withControls={false}
          classNames={{
            dots: '!rounded-full !text-gray-300 border-1',
            control: '!rounded-full  ',
          }}
          value={activePage}
          onChange={setPage}
        />
      </Stack>
    </Stack>
  );
}
