import { home_child } from '@/assets/home';
import { Box, Overlay, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function Child_Home() {
  return (
    <Box pos={'relative'} w={'100%'} mah={330}>
      <Image src={home_child} alt='child' className='w-full h-full' />
      <Overlay color='black' opacity={0.2} zIndex={0} />
      <Text
        w={'100%'}
        fw={500}
        fz={{ base: 30, lg: 50 }}
        pos='absolute'
        top={'5%'}
        right={'50%'}
        ta={'center'}
        className='!text-white translate-x-1/2'
      >
        رغم <span className='text-red-600'>الألم</span> إلا أنه هناك دائماً{' '}
        <span className='text-green-600'>أمل</span>
        💡
      </Text>
    </Box>
  );
}
