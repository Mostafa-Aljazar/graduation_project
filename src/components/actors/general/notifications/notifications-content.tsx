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
  Box,
} from '@mantine/core';
import { NotificationsResponse } from '@/@types/actors/general/notification/notificationResponse.type';
import { useQuery } from '@tanstack/react-query';
import {
  getNotifications,
  getNotificationsProps,
} from '@/actions/actors/general/notifications/getNotifications';
import { parseAsInteger, useQueryStates } from 'nuqs';
import useAuth from '@/hooks/useAuth';
import { USER_TYPE } from '@/constants/userTypes';
import { MessageCircleWarning } from 'lucide-react';
import Notification_Card from './notification/notification-card';
import Notifications_List from './notifications-list';

export default function Notifications_Content() {
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
  } = useQuery<NotificationsResponse, Error>({
    queryKey: [
      'notifications',
      query['notifications-page'],
      user?.id || 0,
      user?.role || USER_TYPE.DISPLACED,
    ],
    queryFn: () =>
      getNotifications({
        page: query['notifications-page'],
        limit: itemsPerPage,
        actor_Id: user?.id || 0,
        role: user?.role || USER_TYPE.DISPLACED,
      }),
  });

  return (
    <Box dir='rtl' w='100%' p='md'>
      {error || notificationsData?.error ? (
        <Paper p='xl' withBorder className='!bg-red-100 !rounded-md'>
          <Center mb='sm'>
            <ThemeIcon color='red' variant='light' size='lg'>
              <MessageCircleWarning />
            </ThemeIcon>
          </Center>
          <Text ta='center' c='red' fw={600}>
            فشل في تحميل الإشعارات
          </Text>
        </Paper>
      ) : (
        <Notifications_List
          notification_items={notificationsData?.notifications || []}
          total_pages={notificationsData?.pagination.total_pages || 1}
          loading={isLoading}
        />
      )}
    </Box>
  );
}
