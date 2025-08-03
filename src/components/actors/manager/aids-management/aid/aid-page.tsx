'use client';

import { AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { LoadingOverlay, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Add_Aid_Page from '../add/page/add-aid-page';
import { USER_RANK, UserRank } from '@/constants/userTypes';
// import Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/add-aid-page';

export interface AidProps {
  aid_Id: number;
  actor_Id: number;
  role: Exclude<
    (typeof USER_RANK)[UserRank],
    | typeof USER_RANK.SECURITY_OFFICER
    | typeof USER_RANK.DISPLACED
    | typeof USER_RANK.SECURITY
  >;
}

export default function Aid_Page({ aid_Id, actor_Id, role }: AidProps) {
  const {
    data: aid_Data,
    isLoading,
    error,
  } = useQuery<AidResponse, Error>({
    queryKey: ['aid', aid_Id],
    queryFn: () => getAid({ aid_Id, actor_Id, role }),
  });

  if (isLoading)
    return (
      <Stack pos={'relative'} h={500}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={49}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />
      </Stack>
    );
  if (error) return <Stack>Error: {error.message}</Stack>;
  if (!aid_Data) return <div>No data found</div>;

  return (
    <Stack pos={'relative'}>
      Aid_Page
      <Add_Aid_Page initial_Data={aid_Data as AidResponse} aid_Id={aid_Id} />;
    </Stack>
  );
}
