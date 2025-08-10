'use client';

import { useQuery } from '@tanstack/react-query';
import { Box, Center, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import {
  Aid,
  AidResponse,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import Add_Aid_Content from './manager-add-aid-content';

interface ManagerAddAidPageProps {
  manager_Id: number;
}

export default function Manager_Add_Aid_Page({
  manager_Id,
}: ManagerAddAidPageProps) {
  const [query, setQuery] = useQueryStates({
    action: parseAsStringEnum(
      Object.values(ACTION_ADD_EDIT_DISPLAY)
    ).withDefault(ACTION_ADD_EDIT_DISPLAY.ADD),
    aid_Id: parseAsInteger.withDefault(0),
  });

  const {
    data: aidData,
    isLoading,
    error,
  } = useQuery<AidResponse, Error>({
    queryKey: ['manager_aid', query],
    queryFn: () =>
      getAid({ aid_Id: query.aid_Id, actor_Id: manager_Id, role: 'MANAGER' }),
    enabled: !!query.aid_Id || query.action == ACTION_ADD_EDIT_DISPLAY.EDIT,
  });

  const hasError = Boolean(error) || Boolean(aidData?.error);
  return (
    <Stack w={'100%'} p={20}>
      {hasError ? (
        <Paper
          p='md'
          withBorder
          m='md'
          className='!bg-red-100 rounded-md text-center'
        >
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {aidData?.error ||
                error?.message ||
                'حدث خطأ أثناء جلب بيانات المساعدة'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Add_Aid_Content
          manager_Id={manager_Id}
          isLoading={isLoading}
          aid_Data={aidData?.aid as Aid}
        />
      )}
    </Stack>
  );
}
