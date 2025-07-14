'use client';

import {
  Modal,
  Stack,
  Group,
  Text,
  Paper,
  ThemeIcon,
  Flex,
} from '@mantine/core';
import { UserCircle, Info, Calendar } from 'lucide-react';
import { NotificationItem } from '@/@types/actors/general/notification/notificationResponse.type';
import { USER_RANK_LABELS, UserRank, UserType } from '@/constants/userTypes';

interface NotificationModalProps {
  opened: boolean;
  onClose: () => void;
  notification: NotificationItem;
}

export default function Notification_Modal({
  opened,
  onClose,
  notification,
}: NotificationModalProps) {
  return (
    <Modal
      title={
        <Text fz={16} fw={600} ta={'center'}>
          {notification.title}
        </Text>
      }
      opened={opened}
      onClose={onClose}
      size='lg'
      centered
      radius='md'
      overlayProps={{ blur: 3 }}
      transitionProps={{
        transition: 'fade',
        duration: 200,
        timingFunction: 'ease',
      }}
      withCloseButton
      classNames={{
        title: '!w-full',
      }}
    >
      <Stack>
        <Flex
          direction={{ base: 'column-reverse', md: 'row' }}
          justify={'space-between'}
          gap={5}
        >
          <Group gap={5}>
            <ThemeIcon size='sm' variant='light' color='green'>
              <UserCircle size={16} />
            </ThemeIcon>
            <Text size='sm' c='dimmed'>
              من: {notification.from.name} (
              {` ${USER_RANK_LABELS[notification.from.role as UserRank]} `})
            </Text>
          </Group>

          <Group gap={5}>
            <ThemeIcon size='sm' variant='light' color='yellow'>
              <Calendar size={16} />
            </ThemeIcon>
            <Text size='sm' c='dimmed'>
              {notification.date} - {notification.time}
            </Text>
          </Group>
        </Flex>

        <Paper p='xs' radius='md' withBorder shadow='xs' bg='gray.0'>
          <Group wrap='nowrap' align='flex-start' gap={5}>
            <ThemeIcon size='sm' variant='light' color='blue'>
              <Info size={16} />
            </ThemeIcon>
            <Text size='sm' fw={600}>
              {notification.body}
            </Text>
          </Group>
        </Paper>
      </Stack>
    </Modal>
  );
}
