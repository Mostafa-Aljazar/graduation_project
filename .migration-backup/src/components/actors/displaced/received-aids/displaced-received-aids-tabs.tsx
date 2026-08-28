'use client';

import {
  DISPLACED_RECEIVED_AIDS_TABS,
  GET_DISPLACED_RECEIVED_AIDS_TABS,
} from '@/@types/actors/common-types/index.type';
import { cn } from '@/utils/cn';
import { Divider, FloatingIndicator, Group, Stack, Tabs, Text, ThemeIcon } from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useState, useRef } from 'react';

export default function Displaced_Received_Aid_Header_Tabs() {
  const [query, setQuery] = useQueryStates({
    'received-aids-tab': parseAsStringEnum<DISPLACED_RECEIVED_AIDS_TABS>(
      Object.values(DISPLACED_RECEIVED_AIDS_TABS)
    ).withDefault(DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS),
    'received-aids-page': parseAsInteger.withDefault(1),
  });

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<DISPLACED_RECEIVED_AIDS_TABS, HTMLButtonElement | null>>({
    [DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS]: null,
    [DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS]: null,
  });

  const setControlRef =
    (tabKey: DISPLACED_RECEIVED_AIDS_TABS) => (node: HTMLButtonElement | null) => {
      controlsRefs.current[tabKey] = node;
    };

  const activeTabSection = (tabKey: DISPLACED_RECEIVED_AIDS_TABS) => {
    const { label, icon: IconComponent } = GET_DISPLACED_RECEIVED_AIDS_TABS[tabKey];

    const secondWord = label.split(' ')[1] || label; // التقاط الكلمة الثانية

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
            <ThemeIcon variant='transparent' className='flex-shrink-0 !text-dark' size={18}>
              <IconComponent size={18} />
            </ThemeIcon>
          )}
          <Text
            ta={'center'}
            fz={{ base: 14, md: 16 }}
            lh={1.25}
            className={cn(
              '!overflow-ellipsis overflow-hidden !text-nowrap',
              query['received-aids-tab'] === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            <span className='md:hidden block'>{secondWord}</span>
            <span className='hidden md:block'>{label}</span>
          </Text>
        </Group>
      </Tabs.Tab>
    );
  };

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'}>
      <Tabs
        value={query['received-aids-tab']}
        variant='unstyled'
        onChange={(value: string | null) => {
          if (value) {
            setQuery({
              'received-aids-tab': value as DISPLACED_RECEIVED_AIDS_TABS,
              'received-aids-page': 1,
            });
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
            {activeTabSection(DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS)}
            <Divider
              orientation='vertical'
              h={'50%'}
              w={2}
              mx={0}
              my={'auto'}
              className='flex-shrink-0 !bg-primary'
            />
            {activeTabSection(DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS)}
          </Group>
          <FloatingIndicator
            target={controlsRefs.current[query['received-aids-tab']]}
            parent={rootRef}
            className='!border-b-2 border-b-primary'
          />
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
