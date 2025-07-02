import { UserType } from '@/constants/userTypes';
import { TYPE_AIDS } from '@/content/actor/manager/aids-management';

export type NotificationAction =
  | 'change_delegate'
  | 'edit'
  | 'delete'
  | 'call'
  | 'update'
  | 'meeting'
  | 'add-aid'
  | 'another-notification';

export interface NotificationType {
  action: NotificationAction;
  aidType?: TYPE_AIDS; // only for add-aid
}

export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export interface NotificationItem {
  id: number;
  date: string;
  time: string;
  title: string;
  body: string;
  status: NotificationStatus;
  notificationType: NotificationType;
  from: {
    id: number;
    name: string;
    role: UserType;
  };
}

export interface NotificationsResponse {
  status: string;
  message?: string;
  notifications: NotificationItem[];
  error?: string;
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
