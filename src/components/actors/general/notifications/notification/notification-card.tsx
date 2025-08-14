'use client';
import {
  NotificationItem,
  NotificationStatus,
} from '@/@types/actors/general/notification/notificationResponse.type';
import { Flex, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import React from 'react';
import Notification_Icon from './notification-icon';
import Notification_Modal from './notification-modal';
import { useMutation } from '@tanstack/react-query';
import {
  changeNotificationStatus,
  changeNotificationStatusProps,
} from '@/actions/actors/general/notifications/changeNotificationStatus';
import { notifications } from '@mantine/notifications';
import useAuth from '@/hooks/useAuth';
import { useDisclosure } from '@mantine/hooks';
import { USER_RANK_LABELS, UserType } from '@/constants/userTypes';
import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import { Calendar } from 'lucide-react';
import { getTimeSince } from '@/utils/getTimeSince';

interface NotificationCardProps {
  notification: NotificationItem;
}

export default function Notification_Card({ notification }: NotificationCardProps) {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { user } = useAuth();

  const changeStatusMutation = useMutation<
    commonActionResponse,
    unknown,
    changeNotificationStatusProps
  >({
    mutationFn: changeNotificationStatus,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'تمت العملية بنجاح',
          message: data.message,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
        });
      } else {
        throw new Error(data.error || 'فشل في تغيير حالة الاشعار');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'فشل في تغيير حالة الاشعار';
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleOpenModal = async ({ n }: { n: NotificationItem }) => {
    if (n.status === NotificationStatus.UNREAD) {
      changeStatusMutation.mutate({
        notification_Id: n.id,
        actor_Id: user?.id ?? 0,
        role: user?.role as UserType,
      });
    }
    openModal();
  };

  return (
    <>
      <Paper
        key={notification.id}
        p='md'
        radius='md'
        withBorder
        shadow='xs'
        bg={notification.status === NotificationStatus.UNREAD ? 'blue.0' : 'white'}
        onClick={() => {
          handleOpenModal({ n: notification });
        }}
        style={{ cursor: 'pointer' }}
      >
        <Group align='center' wrap='nowrap'>
          <Notification_Icon notification={notification} />
          <Stack gap={4} flex={1}>
            <Flex justify='space-between' align='center' wrap='wrap'>
              <Text fw={600} fz={14}>
                {notification.title}
              </Text>

              <Group gap={5}>
                <Text fz={12} c='dimmed'>
                  {getTimeSince(notification.dateTime)}
                </Text>

                <ThemeIcon size='sm' variant='light' color='green'>
                  <Calendar size={14} />
                </ThemeIcon>
              </Group>
            </Flex>
            <Text fz={14} fw={500} c='dimmed'>
              من: {notification.from.name} ({` ${USER_RANK_LABELS[notification.from.role]} `})
            </Text>
          </Stack>
        </Group>
      </Paper>

      <Notification_Modal opened={modalOpened} onClose={closeModal} notification={notification} />
    </>
  );
}
