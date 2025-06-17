'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Group, Text } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import Complaints_Filters from '@/components/actors/manager/complaints/Complaints_Filters';
// import ComplaintsList from './ComplaintsList';
import { UserType } from '@/constants/userTypes';
import { ComplaintsResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { getComplaints } from '@/actions/actors/manager/complaints/getComplaints';
import ComplaintsList from '@/components/actors/manager/complaints/Complaints_List';

export interface LocalFilters {
  status: 'read' | 'pending' | null;
  sender_type: UserType | null;
  delegate_id: string | null;
  date_range: Date[] | null; // Changed to `date` to match getComplaints
}

export default function Complaints() {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const [activePage, setActivePage] = useState(1);

  // Local state to hold filter input values until "Filter" is clicked
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    status: null,
    sender_type: null,
    delegate_id: null,
    date_range: null,
  });
  console.log('🚀 ~ Complaints ~ localFilters:', localFilters);

  // Items per page
  const itemsPerPage = 5;

  // Fetch complaints using React Query
  const { data, isLoading, error } = useQuery<ComplaintsResponse>({
    queryKey: ['complaints', activePage, search, localFilters],
    queryFn: () =>
      getComplaints({
        page: activePage,
        limit: itemsPerPage,
        status: localFilters.status,
        sender_type: localFilters.sender_type,
        delegate_id: localFilters.delegate_id,
        date_range: localFilters.date_range,
        search,
      }),
  });

  return (
    <Box p='md' dir='rtl'>
      {/* Header */}
      <Group gap={10}>
        <MessageCircleWarning size={20} className='!text-primary' />
        <Text fw={600} fz={24} className='!text-primary'>
          الشكاوي :
        </Text>
      </Group>

      <Complaints_Filters
        setLocalFilters={setLocalFilters}
        initialFilters={{
          status: localFilters.status,
          sender_type: localFilters.sender_type,
          delegate_id: localFilters.delegate_id,
          date_range: localFilters.date_range,
        }}
        complaintsNum={data?.pagination.totalItems ?? 0}
        setActivePage={setActivePage}
      />

      {error || data?.error ? (
        <Text c='red'>{data?.error || 'حدث خطأ أثناء جلب الشكاوى'}</Text>
      ) : (
        <ComplaintsList
          complaints={data?.complaints || []}
          activePage={activePage}
          setActivePage={setActivePage}
          itemsPerPage={itemsPerPage}
          totalPages={data?.pagination.totalPages || 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
