"use server";

import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendSecurityUpdateRequestProps {
    security_Ids: number[];
}

export const sendSecurityUpdateRequest = async ({
    security_Ids,
}: sendSecurityUpdateRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم ارسال طلب تحديث لـ ${security_Ids.length} عنصر أمني بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation
    try {
        const response = await AqsaAPI.post("/securities/update", {
            security_Ids,
        });

        return {
            status: 200,
            message: `تم ارسال طلب تحديث لـ ${security_Ids.length} عنصر أمني بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء ارسال طلب تحديث البيانات";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
