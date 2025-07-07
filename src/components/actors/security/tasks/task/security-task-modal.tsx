'use client';

import {
  Modal,
  Text,
  Group,
  Stack,
  Divider,
  ThemeIcon,
  Grid,
  Paper,
  Badge,
} from '@mantine/core';
import {
  CalendarCheck,
  ClipboardList,
  Clock,
  UserRoundCheck,
  FileText,
} from 'lucide-react';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import { TASKS_TABS } from '@/content/actor/security/tasks';
import { format } from 'date-fns';

interface SecurityTaskModalProps {
  opened: boolean;
  onClose: () => void;
  task: Task;
}

export default function Security_Task_Modal({
  opened,
  onClose,
  task,
}: SecurityTaskModalProps) {
  const isCompleted = task.type === TASKS_TABS.COMPLETED_TASKS;

  // Format dateTime into readable strings
  const formattedDate = task.dateTime
    ? format(new Date(task.dateTime), 'yyyy-MM-dd')
    : '';
  const formattedTime = task.dateTime
    ? format(new Date(task.dateTime), 'HH:mm')
    : '';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size='lg'
      radius='md'
      withCloseButton
      title={
        <Text fz={18} fw={600} ta='center' className='!text-primary'>
          تفاصيل المهمة الأمنية
        </Text>
      }
      classNames={{ title: '!w-full' }}
      centered
    >
      <Stack gap='md'>
        <Group mb='xs'>
          <Badge
            color={isCompleted ? 'green' : 'blue'}
            variant='light'
            size='lg'
            radius='sm'
          >
            {isCompleted ? 'مهمة منجزة' : 'مهمة قادمة'}
          </Badge>
        </Group>

        <Divider />

        <Grid gutter='sm'>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='indigo' size='sm'>
                  <ClipboardList size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    عنوان المهمة
                  </Text>
                  <Text size='sm'>{task.title}</Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='teal' size='sm'>
                  <Clock size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    التاريخ والوقت
                  </Text>
                  <Text size='sm'>
                    {formattedDate} - {formattedTime}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='orange' size='sm'>
                  <UserRoundCheck size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    عناصر الأمن
                  </Text>
                  <Text size='sm'>
                    {task.security_men.map((id) => `#${id}`).join(', ')}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder radius='md' p='sm' bg='gray.0'>
              <Group gap='xs' align='start'>
                <ThemeIcon variant='light' color='grape' size='sm'>
                  <FileText size={18} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed'>
                    تفاصيل المهمة
                  </Text>
                  <Text size='sm'>{task.body}</Text>
                </Stack>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
}
