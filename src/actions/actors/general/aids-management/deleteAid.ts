"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteAidProps {
    aid_Id: number;
    manager_Id: number;
}

export const deleteAid = async ({
    aid_Id,
    manager_Id
}: deleteAidProps): Promise<modalActionResponse> => {
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم حذف المساعدة بنجاح`,

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
        const response = await AqsaAPI.delete<modalActionResponse>(`/aids`, {
            params: {
                aid_Id, manager_Id
            }
        });

        return {
            status: 200,
            message: `تم حذف المساعدة بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المساعدة";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };

    }
};