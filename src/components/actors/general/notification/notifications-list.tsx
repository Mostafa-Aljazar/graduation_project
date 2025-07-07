'use client';

import {
  Stack,
  Text,
  Paper,
  ThemeIcon,
  Flex,
  Pagination,
  Center,
  Skeleton,
} from '@mantine/core';
import { NotificationsResponse } from '@/@types/actors/general/notification/notificationResponse.type';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/actions/actors/general/notifications/getNotifications';
import { parseAsInteger, useQueryStates } from 'nuqs';
import useAuth from '@/hooks/useAuth';
import { USER_TYPE } from '@/constants/userTypes';
import { MessageCircleWarning } from 'lucide-react';
import Notification_Card from './notification-card';

export default function Notifications_List() {
  const [query, setQuery] = useQueryStates({
    'notifications-page': parseAsInteger.withDefault(1),
  });

  const { user } = useAuth();
  const itemsPerPage = 10;

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
  } = useQuery<NotificationsResponse>({
    queryKey: ['notifications', query],
    queryFn: () =>
      getNotifications({
        page: query['notifications-page'],
        limit: itemsPerPage,
        actor_Id: user?.id || 0,
        role: user?.role || USER_TYPE.DISPLACED,
      }),
  });

  if (isLoading) {
    return (
      <Stack gap='sm'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Paper key={i} p='md' radius='md' withBorder>
            <Skeleton height={10} width='30%' radius='xl' mb={6} />
            <Skeleton height={8} width='50%' radius='xl' />
          </Paper>
        ))}
      </Stack>
    );
  }

  if (error || !notificationsData) {
    return (
      <Paper p='xl' radius='md' withBorder bg='red.50'>
        <Center mb='sm'>
          <ThemeIcon color='red' variant='light' size='lg'>
            <MessageCircleWarning />
          </ThemeIcon>
        </Center>
        <Text ta='center' c='red' fw={600}>
          فشل في تحميل الإشعارات
        </Text>
      </Paper>
    );
  }

  if (notificationsData.notifications.length === 0) {
    return (
      <Paper p='xl' radius='md' withBorder>
        <Text ta='center' size='lg' c='gray'>
          لا توجد إشعارات حالياً
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap={8}>
      {notificationsData.notifications.map((n, index) => (
        <Notification_Card notification={n} key={index} />
      ))}

      {notificationsData.pagination.totalPages > 1 && (
        <Flex justify='center' mt='md'>
          <Pagination
            value={query['notifications-page']}
            onChange={(page) => setQuery({ 'notifications-page': page })}
            total={notificationsData.pagination.totalPages}
            size='sm'
            radius='xl'
            withControls={false}
            styles={{
              control: { borderRadius: '9999px' },
              dots: { color: 'gray' },
            }}
          />
        </Flex>
      )}
    </Stack>
  );
}
