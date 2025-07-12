'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Text, Group, Button } from '@mantine/core';
import { Package, SquarePlus } from 'lucide-react';
import Aids_Management_Filters from './aids-management-filters';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import Aids_List from './card/aids-list';
import { TYPE_GROUP_AIDS } from '@/content/actor/manager/aids-management';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import { AidsResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { aidsManagementFilterFormType } from '@/validation/actor/manager/aids-management/aids-management-filters-schema';
import { USER_TYPE } from '@/constants/userTypes';

function Aids_Management_Header({ delegate_Id }: { delegate_Id?: number }) {
  const route = useRouter();

  const { user } = useAuth();
  const handelAdd = () => {
    route.push(MANAGER_ROUTES_fUNC(user?.id as number).ADD_AID);
  };
  return (
    <Group justify='space-between' wrap='nowrap'>
      <Group gap={10} wrap='nowrap' justify='center' align='baseline'>
        <Package size={20} className='!text-primary' />
        <Text fw={600} fz={22} className='!text-primary !text-nowrap'>
          المساعدات :
        </Text>
      </Group>
      <Button
        hidden={!!delegate_Id}
        rightSection={<SquarePlus size={16} />}
        size='sm'
        fz={18}
        fw={500}
        c={'white'}
        radius={'lg'}
        className='!bg-primary shadow-lg'
        onClick={handelAdd}
      >
        إضافة
      </Button>
    </Group>
  );
}

interface CommonAidsManagementContentProps {
  delegate_Id?: number;
  manager_Id?: number;
}

export default function Common_Aids_Management_Content({
  delegate_Id,
  manager_Id,
}: CommonAidsManagementContentProps) {
  const [localFilters, setLocalFilters] =
    useState<aidsManagementFilterFormType>({
      type: null,
      date_range: [null, null],
      recipients_range: [null, null],
    });

  const [query, setQuery] = useQueryStates({
    'aids-tab': parseAsStringEnum<TYPE_GROUP_AIDS>(
      Object.values(TYPE_GROUP_AIDS)
    ).withDefault(TYPE_GROUP_AIDS.ONGOING_AIDS),

    'aids-page': parseAsInteger.withDefault(1),
  });

  const {
    data: AidsData,
    isLoading,
    error,
  } = useQuery<AidsResponse>({
    queryKey: ['aids', query, localFilters],
    queryFn: () =>
      getAids({
        page: query['aids-page'],
        limit: 10,
        type: localFilters.type,
        date_range: localFilters.date_range,
        recipients_range: localFilters.recipients_range,
        type_group_aids: query['aids-tab'],
        actor_Id: actor_Id as number,
        role: role,
      }),
  });

  return (
    <Stack w={'100%'}>
      <Aids_Management_Header delegate_Id={delegate_Id} />

      <Aids_Management_Filters
        setLocalFilters={setLocalFilters}
        aidsNum={AidsData?.pagination.totalItems ?? 0}
      />

      {error || AidsData?.error ? (
        <Text c='red'>{AidsData?.error || 'حدث خطأ أثناء جلب المساعدات'}</Text>
      ) : (
        <Aids_List
          data={AidsData?.aids || []}
          totalPages={AidsData?.pagination.totalPages || 1}
          isLoading={isLoading}
          delegate_Id={delegate_Id}
        />
      )}
    </Stack>
  );
}
