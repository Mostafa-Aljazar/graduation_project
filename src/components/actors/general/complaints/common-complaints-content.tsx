'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Pagination, Loader, Stack } from '@mantine/core';
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

import { ComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { delegateComplaintFilterFormValues } from '@/validation/actor/delegate/complaints/delegateComplaintsSchema';
import { USER_TYPE } from '@/constants/userTypes';
import { CommonComplaintFilterFormValues } from '@/validation/actor/general/complaints/commonComplaintsSchema';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import Common_Complaints_Filters from './common-complaints-filters';
import Common_Complaints_List from './common-complaints-list';

interface CommonComplaintsContentProps {
  delegate_Id?: number;
  security_Id?: number;
}

export default function Common_Complaints_Content({
  delegate_Id,
  security_Id,
}: CommonComplaintsContentProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-tab': parseAsStringEnum<COMPLAINTS_TABS>(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.RECEIVED_COMPLAINTS),
    search: parseAsString.withDefault(''),
    'complaints-page': parseAsInteger.withDefault(1),
  });

  const [localFilters, setLocalFilters] =
    useState<CommonComplaintFilterFormValues>({
      status: null,
      date_range: [null, null],
    });

  const itemsPerPage = 10;

  const role = delegate_Id ? USER_TYPE.DELEGATE : USER_TYPE.SECURITY;
  const actor_Id = delegate_Id || security_Id;

  const {
    data: complaintsData,
    isLoading,
    error,
  } = useQuery<ComplaintResponse>({
    queryKey: ['common-complaints', query, localFilters, actor_Id],
    queryFn: () =>
      getCommonComplaints({
        page: query['complaints-page'],
        limit: itemsPerPage,
        status: localFilters.status || COMPLAINTS_STATUS.ALL,
        date_range: localFilters.date_range,
        search: query.search,
        type: query['complaints-tab'],
        role,
        actor_Id: (delegate_Id || security_Id)!,
      }),
    enabled: !!actor_Id,
  });
  console.log('🚀 ~ complaintsData:', complaintsData);

  if (!actor_Id) {
    return (
      <Text c='red'>لا يمكن تحميل الشكاوى، لم يتم تحديد هوية المستخدم.</Text>
    );
  }

  return (
    <Box dir='rtl' w='100%' p='md'>
      <Common_Complaints_Filters
        setLocalFilters={setLocalFilters}
        complaintsNum={complaintsData?.pagination.totalItems ?? 0}
      />
      {error || complaintsData?.error ? (
        <Text c='red' mt='md'>
          {complaintsData?.error ||
            error?.message ||
            'حدث خطأ أثناء جلب الشكاوى'}
        </Text>
      ) : (
        <Common_Complaints_List
          complaints={complaintsData?.complaints || []}
          totalPages={complaintsData?.pagination.totalPages || 1}
          loading={isLoading}
          actor_Id={actor_Id}
          role={role}
        />
      )}
    </Box>
  );
}
