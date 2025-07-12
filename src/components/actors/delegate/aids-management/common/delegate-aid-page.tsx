'use client';

import { AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import {
  Center,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { USER_TYPE } from '@/constants/userTypes';
import Delegate_Aid_Content from './delegate-aid-content';
import useAuth from '@/hooks/useAuth';

export enum DESTINATION_AID {
  AID = 'AID',
  ADD_AID = 'ADD_AID',
}

export interface DelegateAidPageProps {
  aid_id: number;
  actor_Id: number;
  destination: DESTINATION_AID;
}

export default function Delegate_Aid_Page({
  aid_id,
  actor_Id,
  destination,
}: DelegateAidPageProps) {
  const { isManager, isDelegate } = useAuth();

  const role = isDelegate ? USER_TYPE.DELEGATE : USER_TYPE.MANAGER;

  const { data, isLoading, error } = useQuery<AidResponse, Error>({
    queryKey: ['aid', aid_id],
    queryFn: () => getAid({ id: aid_id, actor_Id, role: role }),
  });

  if (isLoading) {
    return (
      <Stack pos='relative' h={400} align='center' justify='center'>
        <LoadingOverlay
          visible
          zIndex={10}
          overlayProps={{ radius: 'sm', blur: 1 }}
        />
        <Center>
          <Loader color='blue' size='md' />
        </Center>
      </Stack>
    );
  }

  if (error) {
    return (
      <Paper shadow='sm' p='md' bg='red.1'>
        <Text c='red' fw={600}>
          خطأ في تحميل بيانات المساعدة: {error.message}
        </Text>
      </Paper>
    );
  }

  if (!data) {
    return (
      <Paper shadow='sm' p='md' bg='gray.1'>
        <Text c='dimmed' fw={500}>
          لم يتم العثور على بيانات للمساعدة المطلوبة.
        </Text>
      </Paper>
    );
  }

  return (
    <Stack w='100%' p='sm'>
      <Delegate_Aid_Content
        aid_Data={data.aid}
        actor_Id={actor_Id}
        role={role}
        destination={destination}
      />
    </Stack>
  );
}
