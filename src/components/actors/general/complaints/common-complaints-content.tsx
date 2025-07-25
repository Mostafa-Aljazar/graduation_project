'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Center, Paper, Text, ThemeIcon } from '@mantine/core';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { ComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { USER_TYPE, UserRank, UserType } from '@/constants/userTypes';
import { CommonComplaintFilterFormValues } from '@/validation/actor/general/complaints/commonComplaintsSchema';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import Common_Complaints_Filters from './common-complaints-filters';
import Common_Complaints_List from './common-complaints-list';
import {
  COMPLAINTS_STATUS,
  COMPLAINTS_TABS,
} from '@/@types/actors/common-types/index.type';
import { MessageCircleWarning } from 'lucide-react';

interface CommonComplaintsContentProps {
  actor_Id: number;
  rank: UserType | UserRank;
}

export default function Common_Complaints_Content({
  actor_Id,
  rank,
}: CommonComplaintsContentProps) {
  const [query, setQuery] = useQueryStates({
    'complaints-tab': parseAsStringEnum<COMPLAINTS_TABS>(
      Object.values(COMPLAINTS_TABS)
    ).withDefault(COMPLAINTS_TABS.SENT_COMPLAINTS),
    'complaints-page': parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(''),
  });

  const [localFilters, setLocalFilters] =
    useState<CommonComplaintFilterFormValues>({
      status: null,
      date_range: [null, null],
    });

  const limit = 7;
  const role = rank;

  const {
    data: complaintsData,
    isLoading,
    error,
  } = useQuery<ComplaintResponse>({
    queryKey: ['common-complaints', query, localFilters, actor_Id],
    queryFn: () =>
      getCommonComplaints({
        page: query['complaints-page'],
        limit: limit,
        status: localFilters.status || COMPLAINTS_STATUS.ALL,
        date_range: localFilters.date_range,
        search: query.search,
        complaint_type:
          role == USER_TYPE.DISPLACED
            ? COMPLAINTS_TABS.SENT_COMPLAINTS
            : role == USER_TYPE.MANAGER
            ? COMPLAINTS_TABS.RECEIVED_COMPLAINTS
            : query['complaints-tab'],
        role,
        actor_Id: actor_Id!,
      }),
    enabled: !!actor_Id,
  });

  if (!actor_Id) {
    return (
      <Text c='red'>لا يمكن تحميل الشكاوى، لم يتم تحديد هوية المستخدم.</Text>
    );
  }
  const hasError = Boolean(error) || Boolean(complaintsData?.error);

  return (
    <Box dir='rtl' w='100%' p='sm'>
      <Common_Complaints_Filters
        setLocalFilters={setLocalFilters}
        complaintsNum={complaintsData?.pagination.total_items ?? 0}
        actor_Id={actor_Id}
        role={role}
      />

      {hasError ? (
        <Paper
          p='md'
          withBorder
          mt='md'
          className='!bg-red-100 rounded-md text-center'
        >
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {complaintsData?.error ||
                error?.message ||
                'حدث خطأ أثناء جلب الشكاوى'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Common_Complaints_List
          complaints={complaintsData?.complaints || []}
          total_pages={complaintsData?.pagination.total_pages || 1}
          loading={isLoading}
          actor_Id={actor_Id}
          role={role}
        />
      )}
    </Box>
  );
}
