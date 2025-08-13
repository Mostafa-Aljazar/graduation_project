"use server";

import { TASKS_TABS } from "@/@types/actors/common-types/index.type";
import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
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

    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم اضافة المهمة بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.post<modalActionResponse>('/securities/tasks/add', {
            security_Id,
            dateTime,
            title,
            body,
            security_men,
            type,
        });

        if (response.data.status == 201) {
            return {
                status: 201,
                message: `تم اضافة المهمة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء اضافة المهمة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء اضافة المهمة";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};