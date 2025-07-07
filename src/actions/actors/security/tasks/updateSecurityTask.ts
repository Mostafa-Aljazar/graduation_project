'use server';

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { TASKS_TABS } from "@/content/actor/security/tasks";
import { AqsaAPI } from "@/services";

export interface updateSecurityTaskProps {
    task_Id: number;
    security_Id: number;
    dateTime: Date;
    title: string;
    body: string;
    security_men: number[];
    type: TASKS_TABS;
}

export const updateSecurityTask = async ({
    task_Id,
    security_Id,
    dateTime,
    title,
    body,
    security_men,
    type,
}: updateSecurityTaskProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تعديل المهمة بنجاح`,
    };

    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 1500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////

    try {
        const response = await AqsaAPI.put(`/security/tasks/${task_Id}`, {
            security_Id,
            dateTime,
            title,
            body,
            security_men,
            type,
        });

        return {
            status: "200",
            message: `تم تعديل المهمة بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تعديل المهمة";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};
