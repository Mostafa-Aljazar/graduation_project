import React from 'react';
import Image from 'next/image'; // Assuming Next.js Image component
import { Box, Flex, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { SERVICES_Data, SERVICES_TITLE } from '@/content/landing/home';
import { SERVICES_TENT } from '@/assets/landing/home';

export default function Services() {
  return (
    <Stack
      align='center'
      px={{ base: '5%', xl: '10%' }}
      py={30}
      gap={0}
      id='our-service'
    >
      <Text
        fw={600}
        c={'primary.8'}
        fz={{ base: 20, md: 25 }}
        ta={{ base: 'center', md: 'start' }}
        w={'100%'}
      >
        {SERVICES_TITLE}
      </Text>
      <Flex
        p={0}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'start' }}
        gap={20}
      >
        <Box w={{ base: 200, md: 700, lg: 700 }}>
          <Image
            src={SERVICES_TENT}
            alt='Camp scene'
            className='!object-fill'
          />
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={20}>
          {SERVICES_Data.map((stat, index) => (
            <Stack
              key={index}
              gap='sm'
              align='center'
              bg={'white'}
              p={10}
              w={{ base: '100%', xs: 350, md: '100%' }}
              className='!shadow-xs hover:!shadow-md rounded-sm !transition-all !duration-300 !ease-in-out'
            >
              <ThemeIcon variant='transparent' className='!text-primary'>
                <stat.icon size={30} />
              </ThemeIcon>
              <Stack gap={0} justify='center' align='center'>
                <Text ta={'center'} fw={600} fz='lg' className='!text-primary'>
                  {stat.title}
                </Text>
                <Text ta={'center'} fw={500} fz='lg' className='!text-primary'>
                  {stat.description}
                </Text>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
}
