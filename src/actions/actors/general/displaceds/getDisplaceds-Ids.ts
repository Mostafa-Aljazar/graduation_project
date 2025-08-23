"use server";

import { DisplacedsIdsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedIdsResponse } from "@/content/actor/displaced/fake-data/fake-displaced";
import { AqsaAPI } from "@/services";
import { displacedsFilterValuesType } from "@/validation/actor/general/displaceds/displaceds-filter-form";

export interface getDisplacedsIdsProps {
    filters: displacedsFilterValuesType;
};

export const getDisplacedsIds = async ({ filters }: getDisplacedsIdsProps): Promise<DisplacedsIdsResponse> => {

    const fakeResponse = fakeDisplacedIdsResponse()
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DisplacedsIdsResponse>("/displaced/ids", {
            params: {
                filters
            }
        });

        if (response.data?.displaceds_Ids) {
            return response.data
        }

        throw new Error("بيانات النازحين غير متوفرة");

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات النازحين";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            displaceds_Ids: [],
            error: errorMessage,
        };

    }
};