"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface changeStatusManagerComplaintProps {
    complaint_Id: Number;
}

export const changeStatusManagerComplaint = async ({
    complaint_Id,
}: changeStatusManagerComplaintProps): Promise<modalActionResponse> => {
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
        const response = await AqsaAPI.delete("/manager/complaint/changeStatus", {
            params: {
                complaint_Id,
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