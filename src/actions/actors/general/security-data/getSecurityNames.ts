"use server";

import { SecurityNamesResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesNamesResponse } from "@/content/actor/security/fake-securities";
import { AqsaAPI } from "@/services";

interface GetSecurityNamesProps {
    ids?: number[];
}

export const getSecurityNames = async ({ ids }: GetSecurityNamesProps): Promise<SecurityNamesResponse> => {

    const fakeResponse = fakeSecuritiesNamesResponse({ ids });

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<SecurityNamesResponse>("/securities/names", {
            params: {
                ids
            }
        });

        if (response.data?.security_names) {
            return response.data
        }

        throw new Error("بيانات  أسماء أفراد الأمن غير متوفرة");
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء جلب أسماء أفراد الأمن";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            security_names: [],
            error: errorMessage,
        };
    }
};
