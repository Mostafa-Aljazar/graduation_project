'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Text,
  Pagination,
  Loader,
  Stack,
  Image,
  Group,
} from '@mantine/core';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import {
  COMPLAINTS_STATUS,
  COMPLAINTS_TABS,
} from '@/content/actor/delegate/complaints';
import {
  DelegateComplaintResponse,
  Complaint,
} from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { getDelegatesComplaints } from '@/actions/actors/delegate/complaints/getDelegatesComplaints';
import Delegate_Complaints_Filters from './delegate-complaints-filters';
import { MAN } from '@/assets/actor';
import { delegateComplaintFilterFormValues } from '@/validation/actor/delegate/complaints/delegateComplaintsSchema';
import Delegate_Complaints_List from './delegate-complaints-list';

interface DelegateComplaintsContentProps {
  delegate_ID: number;
}

export default function Delegate_Complaints_Content({
  delegate_ID,
}: DelegateComplaintsContentProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-tab': parseAsStringEnum<COMPLAINTS_TABS>(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.RECEIVED_COMPLAINTS),
    search: parseAsString.withDefault(''),
    'complaints-page': parseAsInteger.withDefault(1),
  });

  const [localFilters, setLocalFilters] =
    useState<delegateComplaintFilterFormValues>({
      status: null,
      date_range: [null, null],
    });

  const itemsPerPage = 10;

  const {
    data: delegateComplaints,
    isLoading,
    error,
  } = useQuery<DelegateComplaintResponse>({
    queryKey: ['complaints', query, localFilters],
    queryFn: () =>
      getDelegatesComplaints({
        page: query['complaints-page'],
        limit: itemsPerPage,
        status: localFilters.status || COMPLAINTS_STATUS.ALL,
        date_range: localFilters.date_range,
        search: query.search,
        type: query['complaints-tab'],
        delegate_ID: delegate_ID,
      }),
  });

  const handlePageChange = (page: number) => {
    setQuery({ 'complaints-page': page });
  };

  return (
    <Box dir='rtl' w='100%' p='md'>
      <Delegate_Complaints_Filters
        setLocalFilters={setLocalFilters}
        complaintsNum={delegateComplaints?.pagination.totalItems ?? 0}
      />
      {error || delegateComplaints?.error ? (
        <Text c='red' mt='md'>
          {delegateComplaints?.error ||
            error?.message ||
            'حدث خطأ أثناء جلب الشكاوى'}
        </Text>
      ) : (
        <Delegate_Complaints_List
          complaints={delegateComplaints?.complaints || []}
          totalPages={delegateComplaints?.pagination.totalPages || 1}
          loading={isLoading}
          delegate_ID={delegate_ID}
        />
      )}
    </Box>
  );
}
