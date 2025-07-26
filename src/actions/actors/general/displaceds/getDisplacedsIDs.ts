"use server";

import { DisplacedsIDsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedIDsResponse } from "@/content/actor/displaced/fake-displaced";
import { AqsaAPI } from "@/services";
import { displacedsFilterValues } from "@/validation/actor/general/displaceds-filter-form";

export interface getDisplacedsIDsProps {
    filters: displacedsFilterValues;
};

export const getDisplacedsIDs = async ({ filters }: getDisplacedsIDsProps): Promise<DisplacedsIDsResponse> => {

    const fakeResponse = fakeDisplacedIDsResponse()
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DisplacedsIDsResponse>("/displaced/ids", {
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