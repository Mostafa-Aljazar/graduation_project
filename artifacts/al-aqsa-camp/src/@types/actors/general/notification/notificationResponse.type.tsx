import { UserType } from '@/constants/userTypes';
import { TYPE_AIDS } from '../../common-types/index.type';

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
  aid_type?: TYPE_AIDS;
}

export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export interface NotificationItem {
  id: number;
  dateTime: Date;
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
