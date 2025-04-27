import { logo } from '@/assets/common';
import {
  ABOUT_US_DESCRIPTION,
  ABOUT_US_OUR_MISSION,
  ABOUT_US_TITLE,
} from '@/content/home';
import { Flex, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function About_Us() {
  return (
    <Stack pr={'8%'} py={{ base: 20, md: 40 }} gap={25} id='about-us'>
      <Text
        fw={600}
        fz={25}
        ta={{ base: 'center', md: 'start' }}
        className='!text-primary'
      >
        {ABOUT_US_TITLE}
      </Text>

      <Group gap={50} wrap='nowrap' align='start' px={0}>
        <Image
          src={logo}
          alt='logo'
          width={120}
          height={120}
          className='hidden md:block'
        />
        <Stack gap={20} pl={'13%'}>
          <Text
            fw={500}
            fz={20}
            c={'dark'}
            ta={{ base: 'center', md: 'start' }}
          >
            {ABOUT_US_DESCRIPTION}
          </Text>
          <Text
            fw={500}
            fz={18}
            ta={{ base: 'center', md: 'start' }}
            className='!text-primary'
          >
            {ABOUT_US_OUR_MISSION}
          </Text>
        </Stack>
      </Group>
    </Stack>
  );
}
