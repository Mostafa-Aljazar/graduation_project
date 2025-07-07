"use server";

import { ISecuritiesResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { fakeSecuritiesResponse } from "@/content/actor/security/fake-securities";
import { AqsaAPI } from "@/services";

export interface getSecurityDataProps {
    page?: number;
    limit?: number;
    search?: string;
}

export const getSecurityData = async ({
    page = 1,
    limit = 15,
    search,
}: getSecurityDataProps): Promise<ISecuritiesResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData = fakeSecuritiesResponse({ page, limit });

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real API logic
    try {
        const params: Record<string, any> = { page, limit };
        if (search) params.search = search;

        const response = await AqsaAPI.get("/securities", { params });

        if (response.data?.securities) {
            return {
                status: "200",
                message: "تم جلب بيانات أفراد الأمن بنجاح",
                securities: response.data.securities,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    totalItems: response.data.securities.length,
                    totalPages: Math.ceil(response.data.securities.length / limit),
                },
            };
        }

        throw new Error("بيانات أفراد الأمن غير متوفرة");
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء جلب بيانات أفراد الأمن";

        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            securities: [],
            pagination: {
                page: 1,
                limit: 0,
                totalItems: 0,
                totalPages: 0,
            },
            error: errorMessage,
        };
    }
};
