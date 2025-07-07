"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteSecurityTaskProps {
    task_Id: number;
    security_Id: number;

}

export const deleteSecurityTask = async ({
    task_Id,
    security_Id,
}: deleteSecurityTaskProps): Promise<modalActionResponse> => {


    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم حذف المهمة بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.delete("/security/tasks", {
            params: {
                task_Id,
                security_Id,
            },
        });

        return {
            status: "200",
            message: `تم حذف المهمة بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المهمة";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};