'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Text, Group } from '@mantine/core';
import { Package } from 'lucide-react';
import Aids_Management_Filters from './aids-management-filters';
import { getAids } from '@/actions/actors/manager/aids-management/getAids';
import Aids_List from './card/aids-list';
import { AidsResponse } from '@/@types/actors/general/aids/aidsResponse.type';
import {
  TYPE_AIDS,
  TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';
import { parseAsStringEnum, useQueryState } from 'nuqs';

export interface Aids_Management_LocalFilters {
  type: TYPE_AIDS | null; // Made nullable to allow clearing
  date_range: Date[] | null;
  recipients_range: number[] | null;
}

export default function Aids_Management_Content() {
  const [localFilters, setLocalFilters] =
    useState<Aids_Management_LocalFilters>({
      type: TYPE_AIDS.ALL_AIDS,
      date_range: null,
      recipients_range: null,
    });
  console.log('🚀 ~ Aids_Management_Content ~ localFilters:', localFilters);

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
      <Group gap={10}>
        <Package size={20} className='!text-primary' />
        <Text fw={600} fz={24} className='!text-primary'>
          المساعدات :
        </Text>
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
          highlightedDate={
            localFilters.date_range?.[0]
              ? localFilters.date_range[0].toISOString().split('T')[0]
              : null
          }
        />
      )}
    </Stack>
  );
}
