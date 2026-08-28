"use server";

import { SecuritiesResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesResponse } from "@/content/actor/security/fake-data/fake-securities";
import { AqsaAPI } from "@/services";

export interface getSecurityDataProps {
    page?: number;
    limit?: number;
}

export const getSecurityData = async ({
    page = 1,
    limit = 15,
}: getSecurityDataProps): Promise<SecuritiesResponse> => {
    const fakeResponse = fakeSecuritiesResponse({ page, limit });
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<SecuritiesResponse>("/securities", {
            params: {
                page, limit
            }
        });


        if (response.data?.securities) {
            return response.data
        }

        throw new Error("بيانات أفراد الأمن غير متوفرة");


    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء جلب بيانات أفراد الأمن";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            securities: [],
            pagination: {
                page: 1,
                limit: 0,
                total_items: 0,
                total_pages: 0,
            },
            error: errorMessage,
        };

    }
};
