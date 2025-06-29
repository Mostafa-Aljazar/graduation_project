"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface changeStatusDelegateComplaintProps {
    complaint_ID: number;
    delegate_ID: number;
}

export const changeStatusDelegateComplaint = async ({
    complaint_ID, delegate_ID
}: changeStatusDelegateComplaintProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تغيير حالة الشكوى بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });


    // Real implementation with filters

    try {
        const response = await AqsaAPI.delete("/delegate/complaint/changeStatus", {
            params: {
                complaint_ID, delegate_ID
            },
        });

        return {
            status: "200",
            message: `تم تغيير حالة الشكوى بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الشكوى";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};