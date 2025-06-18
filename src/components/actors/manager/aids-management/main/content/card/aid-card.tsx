import { general_Aid } from '@/@types/actors/general/aids/aidsResponse.type';
import {
  GET_AIDS_TYPE_ICONS,
  TYPE_AIDS,
} from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import { Center, Group, Stack, Text } from '@mantine/core';
import { Package, UsersRound } from 'lucide-react';
import React from 'react';
import Aid_Action from './aid-action';

type Props = {
  aid: general_Aid;
};
export default function Aid_Card({ aid }: Props) {
  // Map aid type to its corresponding icon, default to Package if not found
  const getAidTypeIcon = (type: TYPE_AIDS) => {
    const IconComponent = GET_AIDS_TYPE_ICONS[type] || Package;
    return <IconComponent size={20} className='text-white' />;
  };

  return (
    <Stack
      key={aid.id}
      p='md'
      className={cn(
        'border-1 border-gray-200 rounded-lg   hover:bg-gray-50 !bg-green-100',
        aid.complete && '!bg-red-100'
      )}
    >
      <Group>
        <Center
          w={48}
          h={48}
          className='bg-primary border-1 border-gray-300 rounded-full'
        >
          {getAidTypeIcon(aid.type as TYPE_AIDS)}
        </Center>
        <Stack flex={1} gap={5}>
          <Group justify='space-between'>
            <Text fz='md' fw={600} className='!text-primary'>
              {aid.title || `مساعدة: ${aid.type}`}
            </Text>
            <Group align='center'>
              <Text fz='xs' c='dimmed'>
                {aid.distribution_date}
              </Text>
              <Aid_Action aid_id={aid.id} />
            </Group>
          </Group>
          <Group gap={5}>
            <UsersRound size={15} className='!text-primary' />
            <Text fz='sm' className='!text-dark'>
              عدد المستفيدين: {aid.recipients_number}
            </Text>
          </Group>
          {aid.description && (
            <Text fz='sm' c='dimmed'>
              {aid.description}
            </Text>
          )}
        </Stack>
      </Group>
    </Stack>
  );
}
