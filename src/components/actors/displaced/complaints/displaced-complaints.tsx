'use client';
import { displacedComplaintFilterFormValues } from '@/validation/actor/displaced/complaints/displacedComplaintsSchema';
import { Box, Group, Text } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useState } from 'react';
import Displaced_Complaints_Filters from './displaced-complaints-filters';
import { useQuery } from '@tanstack/react-query';
import { getDisplacedComplaints } from '@/actions/actors/displaced/complaints/getDisplacedComplaints';
import { DisplacedComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import Displaced_Complaints_List from './displaced-complaints-list';
import Send_Displaced_Complaint from './displaced-send-complaint';

interface DisplacedComplaintsProps {
  displaced_ID: number;
}

export default function Displaced_Complaints({
  displaced_ID,
}: DisplacedComplaintsProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-page': parseAsInteger.withDefault(1),
  });

  // Local state to hold filter input values until "Filter" is clicked
  const [localFilters, setLocalFilters] =
    useState<displacedComplaintFilterFormValues>({
      status: null,
      receiver_type: null,
      date_range: [null, null],
    });
  console.log('🚀 ~ Complaints ~ localFilters:', localFilters);

  // Items per page
  const itemsPerPage = 5;

  // Fetch complaints using React Query
  const {
    data: displacedComplaints,
    isLoading,
    error,
  } = useQuery<DisplacedComplaintResponse>({
    queryKey: ['displaced-complaints', query, localFilters],
    queryFn: () =>
      getDisplacedComplaints({
        page: query['complaints-page'],
        limit: itemsPerPage,
        status: localFilters.status || COMPLAINTS_STATUS.ALL,
        receiver_type: localFilters.receiver_type,
        date_range: localFilters.date_range,
        displaced_ID: displaced_ID,
      }),
  });
  console.log('🚀 ~ displacedComplaints:', displacedComplaints);

  if (isLoading) {
    <div>isLoading</div>;
  }
  return (
    <Box p='md' dir='rtl'>
      <Group gap={10} w={'100%'} justify='space-between'>
        <Group gap={10}>
          <MessageCircleWarning size={20} className='!text-primary' />
          <Text fw={600} fz={22} className='!text-primary'>
            الشكاوي :
          </Text>
        </Group>

        <Send_Displaced_Complaint displaced_ID={displaced_ID} />
      </Group>

      <Displaced_Complaints_Filters
        setLocalFilters={setLocalFilters}
        complaintsNum={displacedComplaints?.pagination.totalItems ?? 0}
      />

      {error || displacedComplaints?.error ? (
        <Text c='red'>
          {displacedComplaints?.error || 'حدث خطأ أثناء جلب الشكاوى'}
        </Text>
      ) : (
        <Displaced_Complaints_List
          complaints={displacedComplaints?.complaints || []}
          itemsPerPage={displacedComplaints?.pagination.limit || 10}
          totalPages={displacedComplaints?.pagination.totalPages || 1}
          loading={isLoading}
          displaced_Id={displaced_ID}
        />
      )}
    </Box>
  );
}
