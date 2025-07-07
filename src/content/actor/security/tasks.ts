import { CheckCircle2, CalendarClock } from "lucide-react";

// Define the enum for tasks tabs
export enum TASKS_TABS {
    COMPLETED_TASKS = 'COMPLETED_TASKS',
    UPCOMING_TASKS = 'UPCOMING_TASKS',
}

// TASKS Tabs configuration
export const GET_TASKS_TABS = {
    [TASKS_TABS.COMPLETED_TASKS]: {
        label: 'مهام منجزة',
        icon: CheckCircle2,
    },
    [TASKS_TABS.UPCOMING_TASKS]: {
        label: 'مهام قادمة',
        icon: CalendarClock,
    },
} as const;


