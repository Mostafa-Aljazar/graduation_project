"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface changeNotificationStatusProps {
    actor_Id: number
    notification_Id: number
}

export const changeNotificationStatus = async ({
    actor_Id,
    notification_Id,
}: changeNotificationStatusProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تغيير حالة الاشعار بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });


    // Real implementation with filters

    try {

        const response = await AqsaAPI.delete("/notifications/changeStatus", {
            params: {
                actor_Id,
                notification_Id,
            },
        });

        return {
            status: "200",
            message: `تم تغيير حالة الاشعار بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الاشعار";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};