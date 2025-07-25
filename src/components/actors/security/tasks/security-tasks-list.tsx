'use client';

import { Stack, Group, Text, Flex, Pagination } from '@mantine/core';
import { MessageCircleWarning } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import Security_Tasks_Card from './task/security-task-card';
import Security_Task_Skeleton from './task/security-task-skeleton';

interface SecurityTasksListProps {
  tasks: Task[];
  total_pages: number;
  limit: number;
  loading: boolean;
  security_Id: number;
}

export default function Security_Tasks_List({
  tasks,
  total_pages,
  limit,
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
          {Array.from({ length: limit }).map((_, index) => (
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
      {!loading && total_pages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={query['tasks-page']}
            onChange={(value: number) => setQuery({ 'tasks-page': value })}
            total={total_pages}
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
