'use client';

import { Stack, Text, Paper, Flex, Pagination, Group } from '@mantine/core';
import { NotificationItem } from '@/@types/actors/general/notification/notificationResponse.type';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { MessageCircleWarning } from 'lucide-react';
import Notification_Card from './notification/notification-card';
import Notification_Skeleton from './notification/notification-skeleton';

interface NotificationsListProps {
  notification_items: NotificationItem[];
  total_pages: number;
  loading: boolean;
}

export default function Notifications_List({
  notification_items,
  total_pages,
  loading,
}: NotificationsListProps) {
  const [query, setQuery] = useQueryStates({
    'notifications-page': parseAsInteger.withDefault(1),
  });

  return (
    <Stack pos={'relative'}>
      {loading ? (
        <Stack gap='xs'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Notification_Skeleton key={index} />
          ))}
        </Stack>
      ) : notification_items.length === 0 ? (
        <Paper p='xl' radius='md' withBorder>
          <Group gap={10} w={'100%'} justify='center' mt={30}>
            <MessageCircleWarning size={25} className='!text-primary' />
            <Text fw={500} fz={24} ta='center' className='!text-primary'>
              لا توجد إشعارات حالياً
            </Text>
          </Group>
        </Paper>
      ) : (
        <Stack gap='xs'>
          {notification_items &&
            notification_items.map((item) => (
              <Notification_Card key={item.id} notification={item} />
            ))}
        </Stack>
      )}

      {!loading && total_pages > 1 && (
        <Flex justify='center' mt='xl'>
          <Pagination
            value={query['notifications-page']}
            onChange={(value: number) => setQuery({ 'notifications-page': value })}
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
