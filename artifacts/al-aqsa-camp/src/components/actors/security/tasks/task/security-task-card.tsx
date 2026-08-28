'use client';

import { Card, Center, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CheckCircle2, Clock } from 'lucide-react';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import Security_Task_Modal from './security-task-modal';
import { cn } from '@/utils/cn';
import Security_Task_Actions from './security-task-actions';
import { format } from 'date-fns';
import { TASKS_TABS } from '@/@types/actors/common-types/index.type';

interface SecurityTasksCardProps {
  task: Task;
  security_Id: number;
}

export default function Security_Tasks_Card({ task, security_Id }: SecurityTasksCardProps) {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const isCompleted = task.type === TASKS_TABS.COMPLETED_TASKS;
  const taskIcon = isCompleted ? <CheckCircle2 size={18} /> : <Clock size={18} />;
  const taskColor = isCompleted ? 'green' : 'red';

  const formattedDate = task.dateTime ? format(new Date(task.dateTime), 'yyyy-MM-dd') : '';
  const formattedTime = task.dateTime ? format(new Date(task.dateTime), 'HH:mm') : '';

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // إضافة هذه السطر لمنع تصاعد الحدث
    // Prevent modal open if clicked inside action area (identified by data-click="action" or class includes "action")
    const path = e.nativeEvent.composedPath() as HTMLElement[];
    const clickedOnAction = path.some((el) => {
      if (!(el instanceof HTMLElement)) return false;
      return el.getAttribute('data-click') === 'action' || el.classList.contains('action');
    });

    if (!clickedOnAction) openModal();
  };

  return (
    <>
      <Card
        p={{ base: 'sm', md: 'md' }}
        radius='lg'
        shadow='sm'
        withBorder
        onClick={handleOpenModal}
        className={cn(isCompleted ? '!bg-gray-100' : '!bg-red-50')}
        style={{ cursor: 'pointer' }}
      >
        <Group align='center' gap='sm' wrap='nowrap'>
          <Center>
            <ThemeIcon size='lg' radius='xl' variant='light' color={taskColor}>
              {taskIcon}
            </ThemeIcon>
          </Center>

          <Group w='100%' justify='space-between'>
            <Stack flex={1} gap={3}>
              <Text size='xs' c='dimmed'>
                {formattedDate} - {formattedTime}
              </Text>
              <Text fz={14} fw={600} className='text-primary'>
                العنوان: {task.title}
              </Text>

              <Text fz={14} fw={500} c='dimmed' lh={1.6}>
                {task.body}
              </Text>
            </Stack>

            <Security_Task_Actions security_Id={security_Id} task={task} />
          </Group>
        </Group>
      </Card>

      <Security_Task_Modal opened={modalOpened} onClose={closeModal} task={task} />
    </>
  );
}
