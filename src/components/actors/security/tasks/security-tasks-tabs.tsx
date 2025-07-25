'use client';

import {
  GET_TASKS_TABS,
  TASKS_TABS,
} from '@/@types/actors/common-types/index.type';
import { cn } from '@/utils/cn';
import {
  Divider,
  FloatingIndicator,
  Group,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useState, useRef } from 'react';

export default function Security_Tasks_Header_Tabs() {
  const [query, setQuery] = useQueryStates({
    'tasks-tab': parseAsStringEnum<TASKS_TABS>(
      Object.values(TASKS_TABS)
    ).withDefault(TASKS_TABS.COMPLETED_TASKS),
    'tasks-page': parseAsInteger.withDefault(1),
  });

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<TASKS_TABS, HTMLButtonElement | null>>({
    [TASKS_TABS.COMPLETED_TASKS]: null,
    [TASKS_TABS.UPCOMING_TASKS]: null,
  });

  const setControlRef =
    (tabKey: TASKS_TABS) => (node: HTMLButtonElement | null) => {
      controlsRefs.current[tabKey] = node;
    };

  const activeTabSection = (tabKey: TASKS_TABS) => {
    const { label, icon: IconComponent } = GET_TASKS_TABS[tabKey];
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
          <Text
            ta={'center'}
            fz={{ base: 14, md: 16 }}
            lh={1.25}
            className={cn(
              '!overflow-ellipsis overflow-hidden !text-nowrap',
              query['tasks-tab'] === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            {label}
          </Text>
          {IconComponent && (
            <ThemeIcon
              variant='transparent'
              className='flex-shrink-0 !text-dark'
              size={18}
            >
              <IconComponent
                size={18}
                className={cn(
                  query['tasks-tab'] === tabKey
                    ? '!text-primary'
                    : '!text-[#817C74]'
                )}
              />
            </ThemeIcon>
          )}
        </Group>
      </Tabs.Tab>
    );
  };

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'}>
      <Tabs
        value={query['tasks-tab']}
        variant='unstyled'
        onChange={(value: string | null) => {
          if (value) {
            setQuery({ 'tasks-tab': value as TASKS_TABS, 'tasks-page': 1 });
          }
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
            {activeTabSection(TASKS_TABS.COMPLETED_TASKS)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(TASKS_TABS.UPCOMING_TASKS)}
          </Group>
          <FloatingIndicator
            target={controlsRefs.current[query['tasks-tab']]}
            parent={rootRef}
            className='!border-b-2 border-b-primary'
          />
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
