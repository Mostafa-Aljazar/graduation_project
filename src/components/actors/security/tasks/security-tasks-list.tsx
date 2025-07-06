'use client';

import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import Common_Complaint_Skeleton from '../../general/complaints/complaint/common-complaint-skeleton';
import Security_Tasks_Card from './task/security-tasks-card';
import Security_Task_Skeleton from './task/security-task-skeleton';

interface SecurityTasksListProps {
  tasks: Task[];
  totalPages: number;
  itemsPerPage: number;
  loading: boolean;
  security_Id: number;
}

export default function Security_Tasks_List({
  tasks,
  totalPages,
  itemsPerPage,
  loading,
  security_Id,
}: SecurityTasksListProps) {
  const [query, setQuery] = useQueryStates({
    'tasks-page': parseAsInteger.withDefault(1),
  });

  return (
    <Stack pos={'relative'}>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Security_Task_Skeleton key={index} />
          ))}
        </Stack>
      ) : tasks.length === 0 ? (
        <Group gap={10} w={'100%'} justify='center' mt={30}>
          <MessageCircleWarning size={25} className='!text-primary' />
          <Text fw={500} fz={24} ta='center' className='!text-primary'>
            لا توجد مهام لعرضها
          </Text>
        </Group>
      ) : (
        <Stack gap='xs'>
          {tasks.map((task, index) => (
            <Security_Tasks_Card
              key={index}
              task={task}
              security_Id={security_Id}
            />
          ))}
        </Stack>
      )}
      {!loading && totalPages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={query['tasks-page']}
            onChange={(value: number) => setQuery({ 'tasks-page': value })}
            total={totalPages}
            size='sm'
            radius='xl'
            withControls={false}
            mx='auto'
            classNames={{
              dots: '!rounded-full !text-gray-300 border-1',
              control: '!rounded-full',
            }}
          />
        </Flex>
      )}
    </Stack>
  );
}
