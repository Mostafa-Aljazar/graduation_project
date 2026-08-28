import { Stack } from '@mantine/core';
import Security_Tasks_Header_Tabs from '@/components/actors/security/tasks/security-tasks-tabs';
import Security_Tasks_Content from '@/components/actors/security/tasks/security-tasks-content';

import { APP_URL } from '@/constants/services';
import { FAVICON } from '@/assets/common';
import { getSecurityTasks } from '@/actions/actors/security/tasks/getSecurityTasks';
import { TASKS_TABS } from '@/@types/actors/common-types/index.type';
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';


interface Props {
  params: { security: string  };
  searchParams: { 'tasks-tab'?: TASKS_TABS  };
}


export default function Security_Tasks({ params }: Props) {
  const { security } = params;
  const securityId = Number(security);

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Security_Tasks_Header_Tabs />

      <Security_Tasks_Content security_Id={securityId} />
    </Stack>
  );
}
