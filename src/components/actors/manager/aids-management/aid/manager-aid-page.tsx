'use client';

import {
  Aid,
  AidResponse,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { Box, Center, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MessageCircleWarning } from 'lucide-react';
import { MANAGER_DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import Manager_Aid_Content from './manager-aid-content';

export interface ManagerAidPageProps {
  aid_Id: number;
  manager_Id: number;
  destination: MANAGER_DESTINATION_AID;
}

export default function Manager_Aid_Page({
  destination,
  manager_Id,
  aid_Id,
}: ManagerAidPageProps) {
  const {
    data: aidData,
    isLoading,
    error,
  } = useQuery<AidResponse, Error>({
    queryKey: ['manager_aid', aid_Id],
    queryFn: () => getAid({ aid_Id, actor_Id: manager_Id, role: 'MANAGER' }),
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
        <Manager_Aid_Content
          manager_Id={manager_Id}
          isLoading={isLoading}
          aid_Data={aidData?.aid as Aid}
          destination={destination}
        />
      )}
    </Stack>
  );
}
