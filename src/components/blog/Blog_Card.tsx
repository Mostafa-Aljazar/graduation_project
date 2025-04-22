import { img_1 } from '@/assets/home';
import { Button, Card, CardSection, Group, Stack, Text } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  img: StaticImageData | string;
  date: string;
  title: string;
  desc: string;
  link: string;
};
export default function Blog_Card({ img, date, title, desc, link }: Props) {
  return (
    <Card
      shadow='sm'
      p={0}
      w={{ base: '100%', md: 500, lg: 800 }}
      className='!shadow-lg !rounded-md !overflow-hidden'
    >
      <Group wrap='nowrap' p={0} h={200}>
        <Image src={img} width={300} alt='No way!' className='!h-full' />
        <Stack gap={5} justify='space-between' h={'100%'} py={20} px={20}>
          <Text fw={400} fz={12} className='!text-primary'>
            {date}
          </Text>
          <Text fw={500} fz={20} className='!text-primary'>
            {title}
          </Text>
          <Text fw={500} fz={12} size='sm' className='!text-dark'>
            {desc}
          </Text>

          <Link href={link} className='!self-end'>
            <Button
              variant='gradient'
              w={100}
              h={30}
              className='!p-0 !rounded-r-none !rounded-l-md'
              gradient={{ from: '#345E40', to: '#97A483', deg: 90 }} // Green to black gradient
            >
              المزيد
            </Button>
          </Link>
        </Stack>
      </Group>
    </Card>
  );
}
