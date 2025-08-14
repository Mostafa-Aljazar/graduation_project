"use server";

import { modalActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface changeDelegateProps {
    displaced_Ids: number[];
    delegateId: number;
}

export const changeDelegate = async ({
    displaced_Ids,
    delegateId,
}: changeDelegateProps): Promise<modalActionResponse> => {
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم تغيبر المندوب لـ ${displaced_Ids.length} نازح بنجاح`,

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
        const response = await AqsaAPI.post<modalActionResponse>("/displaceds/change-delegate", {
            displaced_Ids,
            delegateId,
        });

        return {
            status: 200,
            message: `تم تغيبر المندوب لـ ${displaced_Ids.length} نازح بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إنشاء الاستدعاء";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};