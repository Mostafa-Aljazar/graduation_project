'use client';
import Common_Aids_Management_Header_Tabs from '@/components/actors/manager/aids-management/main/header/common-aids-management-header-tabs';
import { USER_TYPE } from '@/constants/userTypes';
import { Button, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Package, SquarePlus } from 'lucide-react';
import Common_Aids_Management_Content from './common-aids-management-content';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';

function Aids_Management_Header({
  visibleAdd,
  actor_Id,
}: {
  visibleAdd: boolean;
  actor_Id: number;
}) {
  const route = useRouter();
  const handelAdd = () => {
    route.push(MANAGER_ROUTES_fUNC({ manager_Id: actor_Id }).ADD_AID);
  };

  return (
    <Group justify='space-between' wrap='nowrap' w={'100%'}>
      <Group gap={10} wrap='nowrap' justify='center' align='center'>
        <Package size={20} className='!text-primary' />
        <Text fw={600} fz={22} className='!text-primary !text-nowrap'>
          المساعدات :
        </Text>
      </Group>
      <Button
        hidden={!visibleAdd}
        rightSection={<SquarePlus size={16} />}
        size='xs'
        fz={16}
        fw={500}
        c={'white'}
        radius={'md'}
        className='!bg-primary shadow-lg'
        onClick={handelAdd}
      >
        إضافة
      </Button>
    </Group>
  );
}

interface CommonAidsManagementPageProps {
  delegate_Id?: number;
  manager_Id?: number;
}

export default function Common_Aids_Management_Page({
  delegate_Id,
  manager_Id,
}: CommonAidsManagementPageProps) {
  const { user } = useAuth();

  const actor_Id = delegate_Id || manager_Id;
  const role = delegate_Id ? USER_TYPE.DELEGATE : USER_TYPE.MANAGER;

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Aids_Management_Header
        visibleAdd={role == USER_TYPE.MANAGER && actor_Id == user?.id}
        actor_Id={user?.id as number}
      />

      <Common_Aids_Management_Header_Tabs />

      <Common_Aids_Management_Content
        actor_Id={actor_Id as number}
        role={role}
      />
    </Stack>
  );
}
