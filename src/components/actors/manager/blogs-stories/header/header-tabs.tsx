'use client';

import { GET_ADDS_BLOG_STORIES_TABS } from '@/content/actor/manager/Ads_Blogs';
import { cn } from '@/utils/cn';
import { Divider, Group, Stack, Tabs, Text, ThemeIcon } from '@mantine/core';
import { parseAsString, useQueryState } from 'nuqs';

export default function HEADER_TABS() {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault('BLOG')
  );

  const activeTabSection = (
    tabKey: keyof typeof GET_ADDS_BLOG_STORIES_TABS
  ) => {
    const IconComponent = GET_ADDS_BLOG_STORIES_TABS[tabKey].icon;
    return (
      <Tabs.Tab
        bg={'#fff'}
        value={tabKey}
        flex={1}
        w={'100%'}
        className='flex justify-center items-center'
      >
        <Group wrap='nowrap' gap={3} w={'100%'} justify='center'>
          <ThemeIcon
            variant='transparent'
            className='flex-shrink-0 !text-dark'
            size={16}
          >
            <IconComponent size={16} />
          </ThemeIcon>
          <Text
            flex={1}
            ta={'center'}
            fz={{ base: 12, sm: 14, md: 16 }}
            lh={1.25}
            className={cn(
              'transition-all duration-300 ease-in-out !text-nowrap overflow-hidden   !overflow-ellipsis',
              activeTab === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            {GET_ADDS_BLOG_STORIES_TABS[tabKey].label}
          </Text>
        </Group>
        {activeTab === tabKey && (
          <Divider
            orientation='horizontal'
            pos='absolute'
            bottom={0}
            left='50%'
            style={{
              transition: 'all 300ms ease-in-out',
              transform: 'translateX(-50%)',
            }}
            w={{ base: '40%' }}
            h={5}
            className='bg-primary rounded-full'
          />
        )}
      </Tabs.Tab>
    );
  };

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'}>
      <Tabs
        value={activeTab || 'BLOG'}
        variant='unstyled'
        onChange={setActiveTab}
        className='w-full'
      >
        <Tabs.List
          w={{ base: '100%', md: '80%', lg: '70%' }}
          mx={'auto'}
          className='shadow-lg border-[#DFDEDC] border-1 rounded-xl !overflow-hidden'
        >
          <Group
            w={'100%'}
            flex={1}
            wrap='nowrap'
            justify='space-between'
            align='center'
            gap={0}
          >
            {activeTabSection('BLOG')}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection('ADS')}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection('SUCCESS_STORIES')}
          </Group>
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
