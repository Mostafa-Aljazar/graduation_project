'use client';

import {
  GET_AIDS_MANAGEMENT_TABS,
  TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';
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

export default function Common_Aids_Management_Header_Tabs() {
  const [query, setQuery] = useQueryStates({
    'aids-tab': parseAsStringEnum<TYPE_GROUP_AIDS>(
      Object.values(TYPE_GROUP_AIDS)
    ).withDefault(TYPE_GROUP_AIDS.ONGOING_AIDS),
    'aids-page': parseAsInteger.withDefault(1),
  });

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setControlRef =
    (tabKey: string) => (node: HTMLButtonElement | null) => {
      controlsRefs.current[tabKey] = node;
    };

  const activeTabSection = (tabKey: TYPE_GROUP_AIDS) => {
    const IconComponent = GET_AIDS_MANAGEMENT_TABS[tabKey].icon;
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
            <ThemeIcon
              variant='transparent'
              className='flex-shrink-0 !text-dark'
              size={16}
            >
              <IconComponent size={16} />
            </ThemeIcon>
          )}
          <Text
            ta={'center'}
            fz={{ base: 14, md: 16 }}
            lh={1.25}
            className={cn(
              ' !text-nowrap overflow-hidden !overflow-ellipsis',
              query['aids-tab'] === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            {GET_AIDS_MANAGEMENT_TABS[tabKey].label}
          </Text>
        </Group>
      </Tabs.Tab>
    );
  };

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'}>
      <Tabs
        value={query['aids-tab']}
        variant='unstyled'
        onChange={(value: string | null) => {
          const typedValue = value as TYPE_GROUP_AIDS;
          setQuery({ 'aids-page': 1, 'aids-tab': typedValue });
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
            {activeTabSection(TYPE_GROUP_AIDS.PREVIOUS_AIDS)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(TYPE_GROUP_AIDS.ONGOING_AIDS)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(TYPE_GROUP_AIDS.COMING_AIDS)}
          </Group>
          <FloatingIndicator
            target={controlsRefs.current[query['aids-tab']]}
            parent={rootRef}
            className='!border-b-2 border-b-primary'
          />
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
