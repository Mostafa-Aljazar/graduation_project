'use client';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, Group, Text } from '@mantine/core';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { USER_TYPE } from '@/constants/userTypes';
import { TASKS_TABS } from '@/content/actor/security/tasks';
import { getSecurityTasks } from '@/actions/actors/security/tasks/getSecurityTasks';
import { TasksResponse } from '@/@types/actors/security/tasks/TasksResponse.type';
import Security_Tasks_List from './security-tasks-list';
import Security_Add_Task from './security-task-form-modal';

interface SecurityTasksContentProps {
  security_Id: number;
}
import { useDisclosure } from '@mantine/hooks';
// ...
import Security_Task_Form_Modal from './security-task-form-modal';
import { CalendarCheck } from 'lucide-react';

export default function Security_Tasks_Content({
  security_Id,
}: SecurityTasksContentProps) {
  const [query, setQuery] = useQueryStates({
    'tasks-tab': parseAsStringEnum<TASKS_TABS>(
      Object.values(TASKS_TABS)
    ).withDefault(TASKS_TABS.COMPLETED_TASKS),
    search: parseAsString.withDefault(''),
    'tasks-page': parseAsInteger.withDefault(1),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const itemsPerPage = 5;

  const {
    data: tasksData,
    isLoading,
    error,
  } = useQuery<TasksResponse>({
    queryKey: ['security-tasks', query, security_Id],
    queryFn: () =>
      getSecurityTasks({
        page: query['tasks-page'],
        limit: itemsPerPage,
        type: query['tasks-tab'],
        security_Id,
      }),
  });

  if (!security_Id) {
    return (
      <Text c='red'>لا يمكن تحميل المهام، لم يتم تحديد هوية المستخدم.</Text>
    );
  }

  return (
    <Box dir='rtl' w='100%' p='md'>
      <Group justify='end'>
        <Button
          onClick={open}
          size='sm'
          rightSection={<CalendarCheck size={18} />}
          className='!self-end !bg-primary shadow-md mb-4 font-semibold text-white'
        >
          إضافة مهمة
        </Button>
      </Group>

      {error || tasksData?.error ? (
        <Text c='red' mt='md'>
          {tasksData?.error || error?.message || 'حدث خطأ أثناء جلب المهام'}
        </Text>
      ) : (
        <Security_Tasks_List
          tasks={tasksData?.tasks || []}
          totalPages={tasksData?.pagination.totalPages || 1}
          itemsPerPage={tasksData?.pagination.limit || 10}
          loading={isLoading}
          security_Id={security_Id}
        />
      )}

      <Security_Task_Form_Modal
        opened={opened}
        onClose={close}
        security_Id={security_Id}
        taskToEdit={undefined} // إنشاء فقط
      />
    </Box>
  );
}
