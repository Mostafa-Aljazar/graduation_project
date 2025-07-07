'use server';

import { ISecurityIDsResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesIDsResponse } from "@/content/actor/security/fake-securities";
import { AqsaAPI } from "@/services";
import { delegatesFilterValues } from "@/validation/actor/general/delegates-filter-form";

export interface getSecuritiesIDsProps {
    search?: string;
}

export const getSecuritiesIds = async ({
    search,
}: getSecuritiesIDsProps): Promise<ISecurityIDsResponse> => {
    // FIXME: remove this fake logic in production
    const fakeData: ISecurityIDsResponse = fakeSecuritiesIDsResponse();

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation
    try {
        const params: Record<string, any> = {};


        if (search) params.search = search;

        const response = await AqsaAPI.get('/securities/ids', { params });

        if (response.data?.securityIds) {
            return {
                status: '200',
                message: 'تم جلب معرفات أفراد الأمن بنجاح',
                securityIds: response.data.securityIds,
            };
        }

        throw new Error('معرفات أفراد الأمن غير متوفرة');
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء جلب معرفات أفراد الأمن';

        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            securityIds: [],
            error: errorMessage,
        };
    }
};
