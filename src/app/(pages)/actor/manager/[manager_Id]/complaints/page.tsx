'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Group, Text } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { ManagerComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { managerComplaintFilterFormValues } from '@/validation/actor/manager/complaints/managerComplaintsSchema';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import { getManagerComplaints } from '@/actions/actors/manager/complaints/getManagerComplaints';
import Manager_Complaints_Filters from '@/components/actors/manager/complaints/manager-complaints-filters';
import Manager_Complaints_List from '@/components/actors/manager/complaints/manager-complaints-list';

export default function Complaints() {
  const [query, setQuery] = useQueryStates({
    search: parseAsString.withDefault(''),
    'complaints-page': parseAsInteger.withDefault(1),
  });

  // Local state to hold filter input values until "Filter" is clicked
  const [localFilters, setLocalFilters] =
    useState<managerComplaintFilterFormValues>({
      status: null,
      sender_type: null,
      delegate_ID: null,
      date_range: [null, null],
    });
  console.log('🚀 ~ Complaints ~ localFilters:', localFilters);

  // Items per page
  const itemsPerPage = 5;

  // Fetch complaints using React Query
  const {
    data: managerComplaints,
    isLoading,
    error,
  } = useQuery<ManagerComplaintResponse>({
    queryKey: ['manager-complaints', query, localFilters],
    queryFn: () =>
      getManagerComplaints({
        page: query['complaints-page'],
        limit: itemsPerPage,
        status: localFilters.status || COMPLAINTS_STATUS.ALL,
        sender_type: localFilters.sender_type,
        delegate_id: localFilters.delegate_ID,
        date_range: localFilters.date_range,
        search: query.search,
      }),
  });

  return (
    <Box p='md' dir='rtl'>
      <Group gap={10}>
        <MessageCircleWarning size={20} className='!text-primary' />
        <Text fw={600} fz={24} className='!text-primary'>
          الشكاوي :
        </Text>
      </Group>

      <Manager_Complaints_Filters
        setLocalFilters={setLocalFilters}
        complaintsNum={managerComplaints?.pagination.totalItems ?? 0}
      />

      {error || managerComplaints?.error ? (
        <Text c='red'>
          {managerComplaints?.error || 'حدث خطأ أثناء جلب الشكاوى'}
        </Text>
      ) : (
        <Manager_Complaints_List
          complaints={managerComplaints?.complaints || []}
          itemsPerPage={managerComplaints?.pagination.limit || 10}
          totalPages={managerComplaints?.pagination.totalPages || 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
