"use server";

import { DisplacedsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedByIdsResponse } from "@/content/actor/general/fake-displaced";
import { AqsaAPI } from "@/services";

type Options = {
    ids: number[];
    page?: number;
    limit?: number;
};

export const getDisplacedByIds = async ({
    ids,
    page = 1,
    limit = 7,
}: Options): Promise<DisplacedsResponse> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeDisplacedByIdsResponse({ ids, page, limit }));
        }, 1000);
    });

    try {
        const params = { page, limit };
        const response = await AqsaAPI.post("/displaced/by-ids", { ids }, { params });
        const displaceds = response.data.displaceds || [];

        return {
            status: "200",
            message: "تم جلب بيانات النازحين بنجاح",
            displaceds,
            pagination: {
                page,
                limit,
                totalItems: displaceds.length,
                totalPages: Math.ceil(displaceds.length / limit),
            },
        };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات النازحين";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            displaceds: [],
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