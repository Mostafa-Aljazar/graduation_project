"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { TASKS_TABS } from "@/content/actor/security/tasks";
import { AqsaAPI } from "@/services";


export interface addSecurityTaskProps {
    security_Id: number;
    dateTime: Date;
    title: string;
    body: string;
    security_men: number[]
    type: TASKS_TABS;
}

export const addSecurityTask = async ({
    security_Id,
    dateTime,
    title,
    body,
    security_men,
    type,
}: addSecurityTaskProps): Promise<modalActionResponse> => {



    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم اضافة المهمة بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////

    try {
        const response = await AqsaAPI.post('/security/tasks', {
            security_Id,
            dateTime,
            title,
            body,
            security_men,
            type,
        });

        return {
            status: "200",
            message: `تم اضافة المهمة بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء اضافة المهمة";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};