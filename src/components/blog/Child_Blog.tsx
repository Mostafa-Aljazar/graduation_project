import { img_child } from '@/assets/blog';
import { img_1 } from '@/assets/home';
import { Box, Overlay, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function Child_Blog() {
  return (
    <Box pos={'relative'} w={'100%'} mah={330}>
      <Image src={img_child} alt='child' className='w-full h-full' />
      <Overlay color='black' opacity={0.2} zIndex={0} />
      <Text
        w={'100%'}
        fw={500}
        fz={{ base: 20, sm: 25, md: 30, lg: 50 }}
        pos='absolute'
        top={'5%'}
        right={'50%'}
        ta={'center'}
        className='!text-black translate-x-1/2'
      >
        النزوح <span className='text-red-500'>يسرق</span> الطفولة ، لكنه لا
        يستطيع <span className='text-red-500'>قتل</span> البراءة
      </Text>
    </Box>
  );
}
