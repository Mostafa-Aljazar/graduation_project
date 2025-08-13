"use server";

import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteDelegatesProps {
    delegate_Ids: Number[];
}

export const deleteDelegates = async ({
    delegate_Ids,
}: deleteDelegatesProps): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم حذف ${delegate_Ids.length} مندوب بنجاح`,

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

        const response = await AqsaAPI.delete<modalActionResponse>("/delegates/delete", {
            params: {
                delegate_Ids
            },
        });

        return {
            status: 200,
            message: `تم حذف ${delegate_Ids.length} مندوب بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المناديب";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};