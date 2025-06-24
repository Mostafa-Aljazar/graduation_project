"use server";

import { DelegatesResponse } from "@/@types/actors/general/delegates/delegatesResponse.type";
import { DisplacedsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDelegatesByIdsResponse } from "@/content/actor/general/fake-delegates";
import { AqsaAPI } from "@/services";

type Options = {
    ids: number[];
    page?: number;
    limit?: number;
};

export const getDelegatesByIds = async ({
    ids,
    page = 1,
    limit = 7,
}: Options): Promise<DelegatesResponse> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeDelegatesByIdsResponse({ ids, page, limit }));
        }, 1000);
    });

    try {
        const params = { page, limit };
        const response = await AqsaAPI.post("/delegates/by-ids", { ids }, { params });
        const delegates = response.data.delegates || [];

        return {
            status: "200",
            message: "تم جلب بيانات المناديب بنجاح",
            delegates,
            pagination: {
                page,
                limit,
                totalItems: delegates.length,
                totalPages: Math.ceil(delegates.length / limit),
            },
        };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات المناديب";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            delegates: [],
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