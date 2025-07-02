'use client';

import React from 'react';
import {
  UserCheck,
  Edit,
  Trash2,
  Phone,
  RefreshCcw,
  Calendar,
  PlusCircle,
  BellRing,
} from 'lucide-react';

import { ThemeIcon } from '@mantine/core';
import { GET_AIDS_TYPE_ICONS } from '@/content/actor/manager/aids-management';
import { NotificationItem } from '@/@types/actors/general/notification/notificationResponse.type';

const ACTION_ICONS = {
  change_delegate: UserCheck,
  edit: Edit,
  delete: Trash2,
  call: Phone,
  update: RefreshCcw,
  meeting: Calendar,
  'another-notification': BellRing,
} as const;

interface Props {
  notification: NotificationItem;
}

export default function Notification_Icon({ notification }: Props) {
  const { action, aidType } = notification.notificationType;

  if (action === 'add-aid' && aidType) {
    const AidIcon = GET_AIDS_TYPE_ICONS[aidType];
    if (AidIcon)
      return (
        <ThemeIcon color='blue' variant='light' size={40} radius='100%'>
          <AidIcon size={20} />
        </ThemeIcon>
      );
  }

  const actionKey = action as keyof typeof ACTION_ICONS;
  const ActionIcon = ACTION_ICONS[actionKey];
  if (ActionIcon)
    return (
      <ThemeIcon color='teal' variant='light' size={40} radius='100%'>
        <ActionIcon size={20} />
      </ThemeIcon>
    );

  return (
    <ThemeIcon color='gray' variant='light' size={40} radius='100%'>
      <PlusCircle size={20} />
    </ThemeIcon>
  );
}
