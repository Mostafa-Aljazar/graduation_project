"use server";

import { DelegatesIDsResponse } from "@/@types/actors/general/delegates/delegatesResponse.type";
import { fakeDelegatesIDsResponse } from "@/content/actor/general/fake-delegates";
import { AqsaAPI } from "@/services";

export interface getDelegatesIDsProps {
    search?: string;
    filters?: {
        displaceds_number: number[];
        tents_number: number[];
    };
};

export const getDelegatesIDs = async ({ search, filters }: getDelegatesIDsProps): Promise<DelegatesIDsResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: DelegatesIDsResponse = fakeDelegatesIDsResponse()

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters
    try {
        // Construct query parameters including filters
        const params: Record<string, any> = {};

        // Add filters to query params if they exist
        if (filters) {
            if (filters?.displaceds_number?.length as number > 0) params.displaceds_number = filters?.displaceds_number?.join(",");
            if (filters?.tents_number && filters?.tents_number?.length as number > 0) params.tents_number = filters?.tents_number?.join(",");
        }

        const response = await AqsaAPI.get("/delegates/ids", {
            params, // Pass pagination and filter parameters as query params
        });

        if (response.data?.delegates) {
            return {
                status: "200",
                message: "تم جلب بيانات المناديب بنجاح",
                delegatesIDs: response.data.delegates,

            };
        }

        throw new Error("بيانات المناديب غير متوفرة");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات المناديب";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            delegatesIDs: [],
            error: errorMessage,
        };
    }
};