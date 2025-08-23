'use client';
import { USER_TYPE } from '@/constants/userTypes';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Package, SquarePlus } from 'lucide-react';
import Common_Aids_Management_Content from './common-aids-management-content';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import Common_Aids_Management_Header_Tabs from '../header/common-aids-management-header-tabs';
import { Suspense } from 'react';

function Aids_Management_Header({
  visibleAdd,
  manager_Id,
}: {
  visibleAdd: boolean;
  manager_Id: number;
}) {
  const route = useRouter();
  const handelAdd = () => {
    route.push(MANAGER_ROUTES_fUNC({ manager_Id: manager_Id }).ADD_AID);
  };

  return (
    <Group justify='space-between' align='center'>
      <Group gap={10}>
        <Package size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          المساعدات :
        </Text>
      </Group>
      {visibleAdd && (
        <Button
          size='sm'
          fz={16}
          fw={500}
          c='white'
          radius='lg'
          className='!bg-primary'
          rightSection={<SquarePlus size={16} />}
          onClick={handelAdd}
        >
          إضافة
        </Button>
      )}
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
    <Stack p={10} pos='relative' w='100%'>
      <Aids_Management_Header
        visibleAdd={role == USER_TYPE.MANAGER && actor_Id == user?.id}
        manager_Id={actor_Id as number}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Common_Aids_Management_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Common_Aids_Management_Content actor_Id={actor_Id as number} role={role} />
      </Suspense>
    </Stack>
  );
}
