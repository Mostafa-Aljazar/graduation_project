'use client';

import {
  AddAidPayload,
  AidResponse,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/manager/aids-management/getAid';
import Add_Aid_Page from '@/app/(pages)/actor/manager/[manager_Id]/aids-management/add/page';
import { LoadingOverlay, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export interface AidProps {
  aid_id: string | number;
}

export default function Aid_Page({ aid_id }: AidProps) {
  const { data, isLoading, error } = useQuery<AidResponse, Error>({
    queryKey: ['aid', aid_id],
    queryFn: () => getAid({ id: aid_id }),
  });
  console.log('🚀 ~ Aid_Page ~ data:', data);

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
  if (!data) return <div>No data found</div>;

  return (
    <Stack pos={'relative'}>
      getAid: {data.aid.aidName}
      <Add_Aid_Page initialData={data} isDisabled={true} aid_id={aid_id} />;
    </Stack>
  );
}
