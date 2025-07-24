'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { Database, UserPlus } from 'lucide-react';
import { Suspense, useState } from 'react';
import Security_Data_Filters from './security-data-filters';
import Security_Data_Table from './security-data-table';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { USER_RANK, USER_TYPE } from '@/constants/userTypes';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';

function Security_Data_List_Header() {
  const { user } = useAuth();

  const router = useRouter();
  const showAddButton =
    user?.rank == USER_RANK.SECURITY_OFFICER || user?.role == USER_TYPE.MANAGER;

  return (
    <Group justify='space-between' align='center'>
      <Group gap={10}>
        <Database size={20} className='!text-primary' />
        <Text fw={600} fz={18} className='!text-primary'>
          بيانات الامن :
        </Text>
      </Group>
      {showAddButton && (
        <Button
          size='sm'
          fz={16}
          fw={500}
          c='white'
          radius='lg'
          className='!bg-primary'
          rightSection={<UserPlus size={16} />}
          onClick={() => router.push(GENERAL_ACTOR_ROUTES.ADD_SECURITIES)}
        >
          إضافة الامن
        </Button>
      )}
    </Group>
  );
}

export default function Security_Data_List() {
  const [securityNum, setSecurityNum] = useState(0);

  return (
    <Stack p={10} pos='relative' w='100%'>
      <Security_Data_List_Header />

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Security_Data_Filters securityNum={securityNum} />
      </Suspense>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Security_Data_Table setSecurityNum={setSecurityNum} />
      </Suspense>
    </Stack>
  );
}
