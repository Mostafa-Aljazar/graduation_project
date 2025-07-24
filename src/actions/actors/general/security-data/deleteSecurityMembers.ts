
"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteSecurityMembersProps {
    security_Ids: number[];
}

export const deleteSecurityMembers = async ({
    security_Ids,
}: deleteSecurityMembersProps): Promise<modalActionResponse> => {

    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم حذف ${security_Ids.length} عنصر أمني بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters


    try {
        const response = await AqsaAPI.delete("/securities/delete", {
            data: { security_Ids },
        });

        return {
            status: response.status,
            message: `تم حذف ${security_Ids.length} عنصر أمني بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف العناصر الأمنية";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
