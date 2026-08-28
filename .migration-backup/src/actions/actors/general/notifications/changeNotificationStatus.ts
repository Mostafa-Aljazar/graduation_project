"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
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
}: changeNotificationStatusProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: "تم تغيير حالة الاشعار بنجاح"
    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.post<commonActionResponse>("/notifications/change-status", {
            actor_Id,
            role,
            notification_Id,
        });

        if (response.data) {
            return {
                status: 200,
                message: "تم تغيير حالة الاشعار بنجاح"
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