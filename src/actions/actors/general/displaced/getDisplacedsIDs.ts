"use server";

import { DisplacedsIDsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedIDsResponse } from "@/content/actor/general/fake-displaced";
import { AqsaAPI } from "@/services";
import { displacedFilterValues } from "@/validation/actor/general/displaced-filter-form";


export interface getDisplacedsIDsProps {
    page?: number;
    limit?: number;
    search?: string;
    filters: displacedFilterValues
};


export const getDisplacedsIDs = async ({ search, filters }: getDisplacedsIDsProps): Promise<DisplacedsIDsResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: DisplacedsIDsResponse = fakeDisplacedIDsResponse()

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    try {
        // Construct query parameters including filters
        const params: Record<string, any> = {};

        // Add filters to query params if they exist
        if (filters) {
            if (filters.wife_status) params.wife_status = filters.wife_status;
            if (filters.family_number !== undefined) params.family_number = filters.family_number;
            if (filters?.ages?.length as number > 0) params.ages = filters.ages?.join(",");
            if (filters.chronic_disease) params.chronic_disease = filters.chronic_disease;
            if (filters.accommodation_type) params.accommodation_type = filters.accommodation_type;
            if (filters.case_type) params.case_type = filters.case_type;
            if (filters.delegate && filters.delegate?.length as number > 0) params.delegate = filters.delegate?.join(",");
        }

        const response = await AqsaAPI.get("/displaced/ids", {
            params,
        });

        if (response.data?.displaceds) {
            return {
                status: "success",
                message: "تم جلب بيانات النازحين بنجاح",
                displacedsIDs: response.data.displaceds,

            };
        }

        throw new Error("بيانات النازحين غير متوفرة");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات النازحين";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            displacedsIDs: [],
            error: errorMessage,
        };
    }

}