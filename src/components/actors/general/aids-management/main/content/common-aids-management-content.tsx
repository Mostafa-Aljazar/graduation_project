'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Text } from '@mantine/core';
import { getAids } from '@/actions/actors/general/aids-management/getAids';
import { TYPE_GROUP_AIDS } from '@/content/actor/manager/aids-management';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import useAuth from '@/hooks/useAuth';
import { AidsResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { aidsManagementFilterFormType } from '@/validation/actor/manager/aids-management/aids-management-filters-schema';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import Common_Aids_Management_Filters from './common-aids-management-filters';
import Common_Aids_List from './card/common-aids-list';

interface CommonAidsManagementContentProps {
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.SECURITY_OFFICER
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
  >;
}

export default function Common_Aids_Management_Content({
  actor_Id,
  role,
}: CommonAidsManagementContentProps) {
  // const { user } = useAuth();
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
      <Common_Aids_Management_Filters
        setLocalFilters={setLocalFilters}
        aidsNum={AidsData?.pagination.total_items ?? 0}
      />

      {error || AidsData?.error ? (
        <Text c='red'>{AidsData?.error || 'حدث خطأ أثناء جلب المساعدات'}</Text>
      ) : (
        <Common_Aids_List
          data={AidsData?.aids || []}
          total_pages={AidsData?.pagination.total_pages || 1}
          isLoading={isLoading}
          actor_Id={actor_Id}
          role={role}
        />
      )}
    </Stack>
  );
}
