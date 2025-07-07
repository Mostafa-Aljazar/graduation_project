'use server';

import { Task, TasksResponse } from "@/@types/actors/security/tasks/TasksResponse.type";
import { TASKS_TABS } from "@/content/actor/security/tasks";
import { FAKE_TASKS } from "@/content/actor/security/fake-security-tasks";
import { AqsaAPI } from "@/services";
import { USER_TYPE, UserType } from "@/constants/userTypes";

interface GetSecurityTasksProps {
    page?: number;
    limit?: number;
    type?: TASKS_TABS;
    security_Id: number;

}

export async function getSecurityTasks({
    page = 1,
    limit = 5,
    security_Id,
    type,
}: GetSecurityTasksProps): Promise<TasksResponse> {
    // Filter fake tasks based on type (tab)
    let filteredTasks: Task[] = FAKE_TASKS;

    if (type) {
        filteredTasks = filteredTasks.filter(task => task.type === type);
    }

    const totalItems = filteredTasks.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedTasks = filteredTasks.slice((page - 1) * limit, page * limit);

    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({
                status: '200',
                message: 'تم جلب المهام بنجاح',
                tasks: paginatedTasks,
                pagination: {
                    page,
                    limit,
                    totalItems,
                    totalPages,
                },
            });
        }, 500)
    );

    try {

        const params: Record<string, string | number> = {
            page,
            limit,
            security_Id,
        };

        const { data } = await AqsaAPI.get('/security/tasks', { params });

        if (!data?.complaints) {
            throw new Error('بيانات المهام غير متوفرة');
        }

        const totalItems = data.pagination?.totalItems || data.complaints.length;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            status: '200',
            message: 'تم جلب المهام بنجاح',
            tasks: data.complaints,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المهام';

        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            tasks: [],
            pagination: { page: 1, limit: 0, totalItems: 0, totalPages: 0 },
            error: errorMessage,
        };
    }
}
