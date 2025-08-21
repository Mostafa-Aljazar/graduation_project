"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteSecurityTaskProps {
    task_Id: number;
    security_Id: number;

}

export const deleteSecurityTask = async ({
    task_Id,
    security_Id,
}: deleteSecurityTaskProps): Promise<commonActionResponse> => {

    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم حذف المهمة بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.delete<commonActionResponse>("/securities/tasks", {
            params: {
                task_Id,
                security_Id,
            },
        });

        if (response.data.status == 200) {
            return {
                status: 200,
                message: `تم حذف المهمة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء حذف المهمة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المهمة";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};