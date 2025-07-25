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
  LoadingOverlay,
} from '@mantine/core';
import { ClipboardList, Clock, UserRoundCheck, FileText } from 'lucide-react';
import { Task } from '@/@types/actors/security/tasks/TasksResponse.type';
import { format } from 'date-fns';
import { TASKS_TABS } from '@/@types/actors/common-types/index.type';
import { useQuery } from '@tanstack/react-query';
import { SecurityNamesResponse } from '@/@types/actors/general/security-data/securitiesDataResponse.types';
import { getSecurityNames } from '@/actions/actors/general/security-data/getSecurityNames';
import { useEffect, useState } from 'react';

interface SecurityTaskModalProps {
  opened: boolean;
  onClose: () => void;
  task: Task;
}

interface SecurityMan {
  id: string;
  name: string;
}

export default function Security_Task_Modal({
  opened,
  onClose,
  task,
}: SecurityTaskModalProps) {
  const isCompleted = task.type === TASKS_TABS.COMPLETED_TASKS;

  const formattedDate = task.dateTime
    ? format(new Date(task.dateTime), 'yyyy-MM-dd')
    : '';
  const formattedTime = task.dateTime
    ? format(new Date(task.dateTime), 'HH:mm')
    : '';

  const [securityData, setSecurityData] = useState<SecurityMan[]>([]);

  const {
    data: securityNames,
    isLoading,
    error,
  } = useQuery<SecurityNamesResponse>({
    queryKey: ['security-names-by-id', task.id],
    queryFn: () => getSecurityNames({ ids: task.security_men }),
  });

  useEffect(() => {
    if (securityNames?.security_names) {
      const securityNamesMapped = securityNames.security_names.map(
        (security) => ({
          ...security,
          id: security.id.toString(),
        })
      );
      setSecurityData(securityNamesMapped);
    }
  }, [securityNames]);

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
      onClick={(e) => e.stopPropagation()}
    >
      <LoadingOverlay
        visible={isLoading}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

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
                    {securityData.map((item) => `# ${item.name}`).join(' ')}
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
