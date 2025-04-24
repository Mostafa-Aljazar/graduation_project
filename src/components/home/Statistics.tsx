import { img_1, img_2 } from '@/assets/home';
import {
  Box,
  Group,
  Stack,
  Text,
  SimpleGrid,
  ThemeIcon,
  Flex,
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import {
  Statistics_Data,
  Statistics_MESSAGE,
  Statistics_TITLE,
} from '@/content/home';

export default function Statistics() {
  return (
    <Stack
      bg={'#F7F2DB'}
      align='center'
      px={{ base: '5%', xl: '10%' }}
      py={30}
      gap={20}
    >
      <Text
        fw={600}
        fz={{ base: 20, md: 25 }}
        c={'primary.8'}
        ta={'start'}
        w={'100%'}
      >
        {Statistics_TITLE}
      </Text>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        w={'100%'}
        justify='space-between'
      >
        <Stack justify='center' gap='lg'>
          <Text fz={{ base: 16, md: 20 }} fw={500} c={'dark'}>
            {Statistics_MESSAGE}
          </Text>

          <SimpleGrid cols={2} spacing='lg'>
            {Statistics_Data.map((stat, index) => (
              <Group key={index} gap='sm' wrap='nowrap' align='center'>
                <ThemeIcon variant='transparent' className='!text-primary'>
                  <stat.icon size={30} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text fw={600} fz='lg' className='!text-primary'>
                    {stat.value}
                  </Text>
                  <Text fz='lg' className='!text-primary'>
                    {stat.label}
                  </Text>
                </Stack>
              </Group>
            ))}
          </SimpleGrid>
        </Stack>
        <Box
          pos={'relative'}
          w={{ base: '100%', sm: 300, md: 400 }}
          h={250}
          mx={{ base: 'auto', md: 0 }}
          visibleFrom='md'
        >
          {/* Bottom Image */}
          <Image
            src={img_2}
            alt='statistic-2'
            width={220}
            height={150}
            style={{
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              position: 'absolute',
              bottom: 20,
              right: 0,
              zIndex: 2,
            }}
          />
          {/* Top Image */}
          <Image
            src={img_1}
            alt='statistic-1'
            width={220}
            height={150}
            style={{
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              position: 'absolute',
              top: 20,
              left: 0,
              zIndex: 1,
            }}
          />
        </Box>
      </Flex>
    </Stack>
  );
}
