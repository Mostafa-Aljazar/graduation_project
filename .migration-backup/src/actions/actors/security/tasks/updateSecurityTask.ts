'use server';

import { TASKS_TABS } from "@/@types/actors/common-types/index.type";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
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
}: updateSecurityTaskProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم تعديل المهمة بنجاح`,
    };

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.put<commonActionResponse>(`/securities/tasks/${task_Id}`, {
            security_Id,
            dateTime,
            title,
            body,
            security_men,
            type,
        });

        if (response.data.status == 200) {
            return {
                status: 200,
                message: `تم تعديل المهمة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء تعديل المهمة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تعديل المهمة";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
