import { TASKS_TABS } from "@/content/actor/security/tasks";


export interface Task {
    id: number;
    dateTime: Date;
    title: string;
    body: string;
    security_men: number[]
    type: TASKS_TABS;
}

export interface TasksResponse {
    status: string;
    message?: string;
    tasks: Task[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    error?: string;
}
