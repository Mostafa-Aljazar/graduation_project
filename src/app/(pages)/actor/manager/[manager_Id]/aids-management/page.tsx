import Aids_Management_Content from '@/components/actors/manager/aids-management/content/aids-management-content';
import Aids_Management_Header_Tabs from '@/components/actors/manager/aids-management/header/aids-management-header-tabs';
import { Stack } from '@mantine/core';
import React from 'react';

export default function Aids_Management() {
  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Aids_Management_Header_Tabs />
      <Aids_Management_Content />
    </Stack>
  );
}
