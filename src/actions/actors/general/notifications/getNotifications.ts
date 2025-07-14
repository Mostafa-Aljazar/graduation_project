"use server";

import { NotificationsResponse } from "@/@types/actors/general/notification/notificationResponse.type";
import { UserType } from "@/constants/userTypes";
import { fakeNotificationsResponse } from "@/content/actor/displaced/fake-displaced-notifications";
import { AqsaAPI } from "@/services";

export interface getNotificationsProps {
    actor_Id: number
    role: UserType
    page: number;
    limit: number;
};

export const getNotifications = async ({ page = 1, limit = 7, actor_Id, role }: getNotificationsProps): Promise<NotificationsResponse> => {

    const fakeResponse = fakeNotificationsResponse({ page, limit, actor_Id, role })

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));

    try {

        const response = await AqsaAPI.post('/notifications', { page, limit, actor_Id, role });

        if (response.data?.notifications) {
            return {
                status: 200,
                message: "تم جلب الاشعارات بنجاح",
                notifications: response.data.displaceds,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    total_items: response.data.notifications.length,
                    total_pages: Math.ceil(response.data.notifications.length / limit),
                },
            };
        }

        throw new Error("بيانات الاشعارات غير متوفرة");

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب الاشعارات";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            notifications: [],
            pagination: {
                page: 1,
                limit: 0,
                total_items: 0,
                total_pages: 0,
            },
            error: errorMessage,
        };
    }
};