"use server";

import { DelegatesResponse } from "@/@types/actors/general/delegates/delegatesResponse.type";
import { fakeDelegatesResponse } from "@/content/actor/general/fake-delegates";
import { AqsaAPI } from "@/services";

export interface getDelegatesProps {
    page?: number;
    limit?: number;
    search?: string;
    filters?: {
        displaceds_number: number[];
        tents_number: number[];
    };
};

export const getDelegates = async ({ page = 1, limit = 15, search, filters }: getDelegatesProps): Promise<DelegatesResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: DelegatesResponse = fakeDelegatesResponse({ page, limit });

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters
    try {
        // Construct query parameters including filters
        const params: Record<string, any> = { page, limit };

        // Add filters to query params if they exist
        if (filters) {
            if (filters?.displaceds_number?.length as number > 0) params.displaceds_number = filters?.displaceds_number?.join(",");
            if (filters?.tents_number && filters?.tents_number?.length as number > 0) params.tents_number = filters?.tents_number?.join(",");
        }

        const response = await AqsaAPI.get("/delegates", {
            params, // Pass pagination and filter parameters as query params
        });

        if (response.data?.delegates) {
            return {
                status: "200",
                message: "تم جلب بيانات المناديب بنجاح",
                delegates: response.data.delegates,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    totalItems: response.data.displaceds.length,
                    totalPages: Math.ceil(response.data.displaceds.length / limit),
                },
            };
        }

        throw new Error("بيانات المناديب غير متوفرة");
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