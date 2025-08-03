"use server";

import { DisplacedsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedByIdsResponse } from "@/content/actor/displaced/fake-displaced";
import { AqsaAPI } from "@/services";

export interface getDisplacedByIdsProps {
    Ids: number[];
    page?: number;
    limit?: number;
};

export const getDisplacedByIds = async ({
    Ids,
    page = 1,
    limit = 7,
}: getDisplacedByIdsProps): Promise<DisplacedsResponse> => {

    const fakeResponse = fakeDisplacedByIdsResponse({ ids: Ids, page, limit })
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DisplacedsResponse>("/displaced/by-ids",
            {
                params: {
                    page, limit, Ids
                }
            });

        if (response.data?.displaceds) {
            return response.data
        }

        throw new Error("بيانات النازحين غير متوفرة");

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات النازحين";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            displaceds: [],
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