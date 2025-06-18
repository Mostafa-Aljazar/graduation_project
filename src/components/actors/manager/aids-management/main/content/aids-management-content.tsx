'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Text, Group, Button } from '@mantine/core';
import { Package, SquarePlus } from 'lucide-react';
import Aids_Management_Filters from './aids-management-filters';
import { getAids } from '@/actions/actors/manager/aids-management/getAids';
import Aids_List from './card/aids-list';
import { AidsResponse } from '@/@types/actors/general/aids/aidsResponse.type';
import {
  TYPE_AIDS,
  TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';

export interface Aids_Management_LocalFilters {
  type: TYPE_AIDS | null; // Made nullable to allow clearing
  date_range: Date[] | null;
  recipients_range: number[] | null;
}

export default function Aids_Management_Content() {
  const route = useRouter();

  const { user } = useAuth();
  const handelAdd = () => {
    route.push(MANAGER_ROUTES_fUNC(user?.id as number).ADD_AID);
  };
  const [localFilters, setLocalFilters] =
    useState<Aids_Management_LocalFilters>({
      type: TYPE_AIDS.CLEANING_AID,
      date_range: null,
      recipients_range: null,
    });
  // console.log('🚀 ~ Aids_Management_Content ~ localFilters:', localFilters);

  const [activePage, setActivePage] = useState(1);

  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsStringEnum<TYPE_GROUP_AIDS>(
      Object.values(TYPE_GROUP_AIDS)
    ).withDefault(TYPE_GROUP_AIDS.ONGOING_AIDS)
  );

  // Fetch aids data using React Query
  const { data, isLoading, error } = useQuery<AidsResponse>({
    queryKey: ['aids', activePage, localFilters, activeTab],
    queryFn: () =>
      getAids({
        page: activePage,
        limit: 5, // Assuming 5 items per page, adjust as needed
        type: localFilters.type,
        date_range: localFilters.date_range,
        recipients_range: localFilters.recipients_range,
        type_group_aids: activeTab,
      }),
  });

  return (
    <Stack w={'100%'}>
      <Group justify='space-between' wrap='nowrap'>
        <Group gap={10} wrap='nowrap'>
          <Package size={20} className='!text-primary' />
          <Text fw={600} fz={24} className='!text-primary !text-nowrap'>
            المساعدات :
          </Text>
        </Group>
        <Button
          size='sm'
          px={15}
          fz={16}
          fw={500}
          c={'white'}
          radius={'lg'}
          className='!bg-primary !shadow-lg'
          rightSection={<SquarePlus size={18} />}
          onClick={handelAdd}
        >
          إضافة
        </Button>
      </Group>
      <Aids_Management_Filters
        setLocalFilters={setLocalFilters}
        initialFilters={{
          type: localFilters.type,
          date_range: localFilters.date_range,
          recipients_range: localFilters.recipients_range,
        }}
        setActivePage={setActivePage}
        aidsNum={data?.pagination.totalItems ?? 10}
      />

      {error || data?.error ? (
        <Text c='red'>{data?.error || 'حدث خطأ أثناء جلب المساعدات'}</Text>
      ) : (
        <Aids_List
          data={data?.aids || []}
          activePage={activePage}
          setActivePage={setActivePage}
          itemsPerPage={5} // Adjust as needed
          totalPages={data?.pagination.totalPages || 1}
          loading={isLoading}
        />
      )}
    </Stack>
  );
}
