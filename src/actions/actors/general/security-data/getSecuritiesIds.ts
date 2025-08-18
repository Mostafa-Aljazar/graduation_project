'use server';

import { SecurityIDsResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesIDsResponse } from "@/content/actor/security/fake-securities";
import { AqsaAPI } from "@/services";


export const getSecuritiesIds = async (): Promise<SecurityIDsResponse> => {
    const fakeResponse: SecurityIDsResponse = fakeSecuritiesIDsResponse()
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<SecurityIDsResponse>("/securities/ids");

        if (response.data?.security_Ids) {
            return response.data
        }

        throw new Error('بيانات أفراد الأمن غير متوفرة');

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات أفراد الأمن";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            security_Ids: [],
            error: errorMessage,
        };
    }
};
