"use server";

import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface changeNotificationStatusProps {
    actor_Id: number
    role: UserType
    notification_Id: number
}

export const changeNotificationStatus = async ({
    actor_Id,
    role,
    notification_Id,
}: changeNotificationStatusProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: 200,
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

        const response = await AqsaAPI.post("/notifications/changeStatus", {
            actor_Id,
            role,
            notification_Id,
        });

        return {
            status: 200,
            message: `تم تغيير حالة الاشعار بنجاح`,
        };

        if (response.data.status == 200) {
            return {
                status: 200,
                message: `تم تغيير حالة الاشعار بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء تغيير حالة الاشعار");


    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الاشعار";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};