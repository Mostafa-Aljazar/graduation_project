'use client';

import {
  GET_AIDS_MANAGEMENT_TABS,
  TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import {
  Divider,
  Flex,
  Group,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';

export default function Aids_Management_Header_Tabs() {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsStringEnum<TYPE_GROUP_AIDS>(
      Object.values(TYPE_GROUP_AIDS)
    ).withDefault(TYPE_GROUP_AIDS.ONGOING_AIDS)
  );

  const [activePage, setActivePage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const activeTabSection = (tabKey: TYPE_GROUP_AIDS) => {
    const IconComponent = GET_AIDS_MANAGEMENT_TABS[tabKey].icon;
    return (
      <Tabs.Tab
        bg={'#fff'}
        value={tabKey}
        flex={1}
        w={'100%'}
        className='flex justify-center items-center'
      >
        <Group flex={1} wrap='nowrap' gap={3} justify='center'>
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
              'transition-all duration-300 ease-in-out !text-nowrap overflow-hidden   !overflow-ellipsis',
              activeTab === tabKey
                ? '!text-primary !font-bold'
                : '!font-medium !text-[#817C74]'
            )}
          >
            {GET_AIDS_MANAGEMENT_TABS[tabKey].label}
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
        value={activeTab}
        variant='unstyled'
        onChange={(value: string | null) => {
          const typedValue = value as TYPE_GROUP_AIDS;
          setActiveTab(typedValue);
          setActivePage(1);
        }}
        w={'100%'}
      >
        <Tabs.List
          w={{ base: '100%', md: '80%' }}
          mx={'auto'}
          className='shadow-lg border-[#DFDEDC] border-1 rounded-xl overflow-hidden'
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
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}
