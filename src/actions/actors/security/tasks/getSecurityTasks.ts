'use server';

import { Task, TasksResponse } from "@/@types/actors/security/tasks/TasksResponse.type";
import { FAKE_TASKS, getFakeTasksResponse } from "@/content/actor/security/fake-security-tasks";
import { AqsaAPI } from "@/services";
import { TASKS_TABS } from "@/@types/actors/common-types/index.type";

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

    const fakeData: TasksResponse = getFakeTasksResponse({ limit, page, type });
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<TasksResponse>('/securities/tasks', {
            params: {
                page,
                limit,
                security_Id,
                type
            }
        });

        if (response.data?.tasks) {
            return response.data
        }

        throw new Error('بيانات المهام غير متوفرة');

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المهام';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            tasks: [],
            pagination: { page: 1, limit: 0, total_items: 0, total_pages: 0 },
            error: errorMessage,
        };
    }
}
