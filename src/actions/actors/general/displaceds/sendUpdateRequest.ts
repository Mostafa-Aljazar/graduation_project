"use server";

import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendUpdateRequestProps {
    displaced_Ids: number[];
}

export const sendUpdateRequest = async ({
    displaced_Ids
}: sendUpdateRequestProps): Promise<modalActionResponse> => {
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم ارسال طلب تحديث لـ ${displaced_Ids.length} نازح بنجاح`,

    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.post<modalActionResponse>("/displaceds/update", {
            displaced_Ids
        });

        return {
            status: 200,
            message: `تم ارسال طلب تحديث لـ ${displaced_Ids.length} نازح بنجاح`,
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