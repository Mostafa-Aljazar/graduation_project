'use client';

import {
  Aid,
  AidResponse,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import {
  Box,
  Center,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { USER_TYPE } from '@/constants/userTypes';
import Delegate_Aid_Content from './delegate-aid-content';
import useAuth from '@/hooks/useAuth';
import { MessageCircleWarning } from 'lucide-react';
import { DELEGATE_DESTINATION_AID } from '@/@types/actors/common-types/index.type';

export interface DelegateAidPageProps {
  aid_Id: number;
  delegate_Id: number;
  destination: DELEGATE_DESTINATION_AID;
}

export default function Delegate_Aid_Page({
  aid_Id,
  delegate_Id,
  destination,
}: DelegateAidPageProps) {
  const {
    data: aidData,
    isLoading,
    error,
  } = useQuery<AidResponse, Error>({
    queryKey: ['delegate_aid', aid_Id],
    queryFn: () =>
      getAid({ aid_Id: aid_Id, actor_Id: delegate_Id, role: 'DELEGATE' }),
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
        <Delegate_Aid_Content
          delegate_Id={delegate_Id}
          isLoading={isLoading}
          aid_Data={aidData?.aid as Aid}
          destination={destination}
        />
      )}
    </Stack>
  );
}
