"use server";

import { DisplacedsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedResponse } from "@/content/actor/displaced/fake-displaced";
import { AqsaAPI } from "@/services";
import { displacedsFilterValues } from "@/validation/actor/general/displaceds/displaceds-filter-form";

export interface getDisplacedsProps {
    page?: number;
    limit?: number;
    search?: string;
    filters?: displacedsFilterValues;
};

export const getDisplaceds = async ({ page = 1, limit = 7, search = '', filters }: getDisplacedsProps): Promise<DisplacedsResponse> => {

    const fakeResponse = fakeDisplacedResponse({ page, limit, search, filters })
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DisplacedsResponse>("/displaced", {
            params: {
                page, limit, filters
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