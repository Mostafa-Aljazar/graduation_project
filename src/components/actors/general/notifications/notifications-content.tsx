'use client';

import { Text, Paper, ThemeIcon, Center, Box } from '@mantine/core';
import { NotificationsResponse } from '@/@types/actors/general/notification/notificationResponse.type';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/actions/actors/general/notifications/getNotifications';
import { parseAsInteger, useQueryStates } from 'nuqs';
import useAuth from '@/hooks/useAuth';
import { UserType } from '@/constants/userTypes';
import { MessageCircleWarning } from 'lucide-react';
import Notifications_List from './notifications-list';

export default function Notifications_Content() {
  const [query] = useQueryStates({
    'notifications-page': parseAsInteger.withDefault(1),
  });

  const { user } = useAuth();
  const limit = 10;

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
  } = useQuery<NotificationsResponse, Error>({
    queryKey: ['notifications', query['notifications-page'], user],
    queryFn: () =>
      getNotifications({
        page: query['notifications-page'],
        limit: limit,
        actor_Id: user?.id as number,
        role: user?.role as UserType,
      }),
  });

  const hasError = Boolean(error) || Boolean(notificationsData?.error);
  return (
    <Box dir='rtl' w='100%' p='md'>
      {hasError ? (
        <Paper p='sm' withBorder className='!bg-red-100 rounded-md text-center'>
          <Box>
            <Center mb='sm'>
              <ThemeIcon color='red' variant='light' size='lg'>
                <MessageCircleWarning />
              </ThemeIcon>
            </Center>
            <Text c='red' fw={600}>
              {notificationsData?.error || error?.message || 'فشل في تحميل الإشعارات'}
            </Text>
          </Box>
        </Paper>
      ) : (
        <Notifications_List
          notification_items={notificationsData?.notifications ?? []}
          total_pages={notificationsData?.pagination.total_pages ?? 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
