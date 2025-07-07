'use client';
import CountUp from 'react-countup';
import {
  Statistics_Data,
  Statistics_TITLE,
  Statistics_MESSAGE,
} from '@/content/landing/home';
import { Group, Stack, Text, SimpleGrid, ThemeIcon, Flex } from '@mantine/core';

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
        c={'primary.8'}
        fz={{ base: 20, md: 25 }}
        ta={{ base: 'center', md: 'start' }}
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
          <Text
            fz={{ base: 16, md: 20 }}
            fw={500}
            c={'dark'}
            ta={{ base: 'center', md: 'start' }}
          >
            {Statistics_MESSAGE}
          </Text>

          <SimpleGrid cols={2} spacing='lg' w={'100%'}>
            {Statistics_Data.map((stat, index) => (
              <Group
                key={index}
                gap='sm'
                wrap='nowrap'
                align='center'
                className='!justify-cenater md:!justify-start'
              >
                <ThemeIcon variant='transparent' className='!text-primary'>
                  <stat.icon size={30} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text fw={600} fz='lg' className='!text-primary'>
                    <CountUp
                      start={0}
                      end={typeof stat.value === 'number' ? stat.value : 0}
                      duration={1.5}
                      // redraw={true}
                      enableScrollSpy
                      formattingFn={(val) =>
                        val >= 1000
                          ? `+${(val / 1000).toFixed(1)} K`
                          : `+${val}`
                      }
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </Text>
                  <Text fz='lg' className='!text-primary'>
                    {stat.label}
                  </Text>
                </Stack>
              </Group>
            ))}
          </SimpleGrid>
        </Stack>
      </Flex>
    </Stack>
  );
}
