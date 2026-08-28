'use client';

import {
  GET_WRITTEN_CONTENT_TABS,
  TYPE_WRITTEN_CONTENT,
} from '@/@types/actors/common-types/index.type';
import { cn } from '@/utils/cn';
import { Divider, FloatingIndicator, Group, Stack, Tabs, Text, ThemeIcon } from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useRef, useState } from 'react';

export default function Ads_Blogs_Stories_Header_Tabs() {
  const [query, setQuery] = useQueryStates({
    'written-tab': parseAsStringEnum<TYPE_WRITTEN_CONTENT>(
      Object.values(TYPE_WRITTEN_CONTENT)
    ).withDefault(TYPE_WRITTEN_CONTENT.BLOG),
    'written-page': parseAsInteger.withDefault(1),
  });

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setControlRef = (tabKey: string) => (node: HTMLButtonElement | null) => {
    controlsRefs.current[tabKey] = node;
  };

  const activeTabSection = (tabKey: TYPE_WRITTEN_CONTENT) => {
    const IconComponent = GET_WRITTEN_CONTENT_TABS[tabKey].icon;
    return (
      <Tabs.Tab
        value={tabKey}
        flex={1}
        w={'100%'}
        pos={'relative'}
        className='flex justify-center items-center'
        ref={setControlRef(tabKey)}
      >
        <Group flex={1} wrap='nowrap' gap={3} justify='center' align='center'>
          {IconComponent && (
            <ThemeIcon variant='transparent' className='flex-shrink-0 !text-dark' size={16}>
              <IconComponent size={16} />
            </ThemeIcon>
          )}
          <Text
            ta={'center'}
            fz={{ base: 14, md: 16 }}
            lh={1.25}
            className={cn(
              '!overflow-ellipsis overflow-hidden !text-nowrap',
              query['written-tab'] === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            {GET_WRITTEN_CONTENT_TABS[tabKey].label}
          </Text>
        </Group>
      </Tabs.Tab>
    );
  };

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'}>
      <Tabs
        value={query['written-tab']}
        variant='unstyled'
        onChange={(value: string | null) => {
          const typedValue = value as TYPE_WRITTEN_CONTENT;
          setQuery({ 'written-page': 1, 'written-tab': typedValue });
        }}
        w={'100%'}
      >
        <Tabs.List
          w={{ base: '100%', md: '80%' }}
          mx={'auto'}
          pos={'relative'}
          className='shadow-lg border-[#DFDEDC] border-1 rounded-xl overflow-hidden'
          ref={setRootRef}
        >
          <Group
            w={'100%'}
            flex={1}
            wrap='nowrap'
            justify='space-between'
            align='center'
            gap={0}
            p={0}
          >
            {activeTabSection(TYPE_WRITTEN_CONTENT.ADS)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(TYPE_WRITTEN_CONTENT.BLOG)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(TYPE_WRITTEN_CONTENT.SUCCESS_STORIES)}
          </Group>
          <FloatingIndicator
            target={controlsRefs.current[query['written-tab']]}
            parent={rootRef}
            className='!border-b-2 border-b-primary'
          />
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
