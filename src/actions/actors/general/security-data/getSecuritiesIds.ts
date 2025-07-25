'use server';

import { SecurityIDsResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesIDsResponse } from "@/content/actor/security/fake-securities";
import { AqsaAPI } from "@/services";

export interface getSecuritiesIDsProps {
    search?: string;
}

export const getSecuritiesIds = async ({
    search,
}: getSecuritiesIDsProps): Promise<SecurityIDsResponse> => {
    // FIXME: remove this fake logic in production
    const fakeData: SecurityIDsResponse = fakeSecuritiesIDsResponse();

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 1000);
    });

    // Real implementation
    try {
        const params = {
            ...(search && { search }),
        };

        const response = await AqsaAPI.get('/securities/ids', { params });


        if (response.data?.security_Ids) {
            return {
                status: '200',
                message: 'تم جلب معرفات أفراد الأمن بنجاح',
                security_Ids: response.data.security_Ids,
            };
        }

        throw new Error('معرفات أفراد الأمن غير متوفرة');
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء جلب معرفات أفراد الأمن';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            security_Ids: [],
            error: errorMessage,
        };
    }
};
