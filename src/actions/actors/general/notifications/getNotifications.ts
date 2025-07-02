"use server";

import { DisplacedsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
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
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeNotificationsResponse({ page, limit, actor_Id, role }));
        }, 1000);
    });

    try {
        const params: Record<string, any> = { page, limit, actor_Id, role };



        const response = await AqsaAPI.get("/notifications", { params });

        if (response.data?.notifications) {
            return {
                status: "200",
                message: "تم جلب الاشعارات بنجاح",
                notifications: response.data.displaceds,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    totalItems: response.data.notifications.length,
                    totalPages: Math.ceil(response.data.notifications.length / limit),
                },
            };
        }

        throw new Error("بيانات الاشعارات غير متوفرة");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب الاشعارات";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            notifications: [],
            pagination: {
                page: 1,
                limit: 0,
                totalItems: 0,
                totalPages: 0,
            },
            error: errorMessage,
        };
    }
};