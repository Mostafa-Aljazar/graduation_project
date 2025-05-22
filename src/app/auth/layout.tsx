import { COVER_CAMP } from '@/assets/auth';
import Left_Section from '@/components/auth/Left_Section';
import { Box, Group, Overlay, Stack } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function Auth_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Desktop */}
      <Box visibleFrom='lg' pos={'relative'} w={'100%'}>
        {/* Image spanning the entire page */}
        <Image
          src={COVER_CAMP}
          alt='coverLogin'
          className='absolute inset-0 w-full h-full object-cover'
        />
        {/* Overlay */}
        <Overlay zIndex={40} pos={'absolute'} bg={'black'} opacity={0.5} />
        {/* Content Above the Overlay */}
        <Group
          pos={'relative'}
          wrap='nowrap'
          justify='center'
          align='center'
          w={'100%'}
          mih={'100vh'}
          className='!z-50'
        >
          <Box flex={1}>
            <Left_Section />
          </Box>
          <Box flex={1} h={550}>
            {children}
          </Box>
        </Group>
      </Box>

      {/* Mobile */}
      <Box hiddenFrom='lg' w={'100%'} mih={'100vh'}>
        <Box
          pos={'relative'}
          w={'100%'}
          className='!rounded-b-2xl !overflow-hidden'
        >
          {/* Image spanning the entire page */}
          <Box w={'100%'} h={285}>
            <Image
              src={COVER_CAMP}
              alt='Cover Login'
              objectFit='cover'
              className='w-full h-full object-cover'
            />
          </Box>
          {/* Overlay */}
          <Stack
            justify='center'
            align='center'
            pos={'absolute'}
            pb={40}
            w={'100%'}
            className='!inset-0 bg-black/50'
          >
            <Left_Section />
          </Stack>
        </Box>
        <Stack flex={1} justify='center' align='center' w={'100%'} my={20}>
          {children}
        </Stack>
      </Box>
    </>
  );
}
