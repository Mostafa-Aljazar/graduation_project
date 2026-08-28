"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendUpdateDelegatesRequestProps {
    delegate_Ids: Number[];
}

export const sendUpdateDelegatesRequest = async ({
    delegate_Ids
}: sendUpdateDelegatesRequestProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم ارسال طلب تحديث لـ ${delegate_Ids.length} مندوب بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    // /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.post<commonActionResponse>("/delegates/update", {
            delegate_Ids,
        });

        return {
            status: 200,
            message: `تم ارسال طلب تحديث لـ ${delegate_Ids.length} مندوب بنجاح`,
        };
    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال طلب تحديث البيانات";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};