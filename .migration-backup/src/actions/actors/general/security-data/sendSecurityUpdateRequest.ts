"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendSecurityUpdateRequestProps {
    security_Ids: number[];
}

export const sendSecurityUpdateRequest = async ({
    security_Ids,
}: sendSecurityUpdateRequestProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم ارسال طلب تحديث لـ ${security_Ids.length} عنصر أمني بنجاح`,

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
        const response = await AqsaAPI.post<commonActionResponse>("/securities/update", {
            security_Ids,
        });

        return {
            status: 200,
            message: `تم ارسال طلب تحديث لـ ${security_Ids.length} عنصر أمني بنجاح`,
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