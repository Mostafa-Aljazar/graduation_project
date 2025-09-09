
"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteSecurityMembersProps {
    security_Ids: number[];
}

export const deleteSecurityMembers = async ({
    security_Ids,
}: deleteSecurityMembersProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم حذف ${security_Ids.length} عنصر أمني بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.delete<commonActionResponse>("/securities/delete",
            {
                data: {
                    security_Ids,
                },
            }
        );

        return {
            status: 200,
            message: `تم حذف ${security_Ids.length} عنصر أمني بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف العناصر";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
