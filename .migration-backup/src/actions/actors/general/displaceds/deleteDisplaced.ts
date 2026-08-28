"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteDisplacedsProps {
    displaced_Ids: Number[];
}

export const deleteDisplaced = async ({
    displaced_Ids,
}: deleteDisplacedsProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم حذف ${displaced_Ids.length} نازح بنجاح`,
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

        const response = await AqsaAPI.delete<commonActionResponse>("/displaceds/delete", {
            params: {
                displaced_Ids
            },
        });

        return {
            status: 200,
            message: `تم حذف ${displaced_Ids.length} نازح بنجاح`,
        };

    }
    catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف النازحين";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};