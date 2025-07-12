'use client';

import { AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getAid } from '@/actions/actors/general/aids-management/getAid';
import { LoadingOverlay, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Add_Aid_Page from '../add/page/add-aid-page';
// import Add_Aid_Page from '@/components/actors/manager/aids-management/add/page/add-aid-page';

export interface AidProps {
  aid_id: number;
}

export default function Aid_Page({ aid_id }: AidProps) {
  const { data, isLoading, error } = useQuery<AidResponse, Error>({
    queryKey: ['aid', aid_id],
    queryFn: () => getAid({ id: aid_id }),
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
  if (!data) return <div>No data found</div>;

  return (
    <Stack pos={'relative'}>
      Add_Aid_Page
      {/* <Add_Aid_Page aid_id={aid_id} />; */}
      <Add_Aid_Page initialData={data as AidResponse} aid_id={aid_id} />;
    </Stack>
  );
}
