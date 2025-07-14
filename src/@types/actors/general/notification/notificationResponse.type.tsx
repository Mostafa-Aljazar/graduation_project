import { UserType } from '@/constants/userTypes';
import { TYPE_AIDS } from '@/content/actor/manager/aids-management';

// add complaints {read, reply}
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
  aid_type?: TYPE_AIDS; // only for add-aid
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
  notification_type: NotificationType;
  from: {
    id: number;
    name: string;
    role: UserType;
  };
}

export interface NotificationsResponse {
  status: number;
  message?: string;
  notifications: NotificationItem[];
  error?: string;
  pagination: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
}
