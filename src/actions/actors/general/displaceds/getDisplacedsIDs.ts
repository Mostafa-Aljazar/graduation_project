"use server";

import { DisplacedsIDsResponse } from "@/@types/actors/general/displaceds/displacesResponse.type";
import { fakeDisplacedIDsResponse } from "@/content/actor/general/fake-displaced";
import { AqsaAPI } from "@/services";
import { displacedFilterValues } from "@/validation/actor/general/displaceds-filter-form";

export interface getDisplacedsIDsProps {
    filters: displacedFilterValues;
};

export const getDisplacedsIDs = async ({ filters }: getDisplacedsIDsProps): Promise<DisplacedsIDsResponse> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeDisplacedIDsResponse({ filters }));
        }, 1000);
    });

    try {
        const params: Record<string, any> = {};

        if (filters) {
            if (filters?.wife_status) params.wife_status = filters?.wife_status;
            if (filters?.family_number !== undefined) params.family_number = filters?.family_number;
            if (filters?.ages?.length) params.ages = filters?.ages?.join(",");
            if (filters?.chronic_disease) params.chronic_disease = filters?.chronic_disease;
            if (filters?.accommodation_type) params.accommodation_type = filters?.accommodation_type;
            if (filters?.case_type) params.case_type = filters?.case_type;
            if (filters?.delegate?.length) params.delegate = filters?.delegate?.join(",");
        }
        const response = await AqsaAPI.get("/displaced/ids", { params });

        if (response.data?.displacedsIDs) {
            return {
                status: "200",
                message: "تم جلب بيانات النازحين بنجاح",
                displacedsIDs: response.data.displacedsIDs,
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
};