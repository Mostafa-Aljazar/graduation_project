"use server";

import { DelegatesIDsResponse } from "@/@types/actors/general/delegates/delegatesResponse.type";
import { fakeDelegatesIDsResponse } from "@/content/actor/general/fake-delegates";
import { AqsaAPI } from "@/services";

export const getDelegatesIDs = async (): Promise<DelegatesIDsResponse> => {
    const fakeData: DelegatesIDsResponse = fakeDelegatesIDsResponse()
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DelegatesIDsResponse>("/delegates/ids");

        if (response.data?.delegates_Ids) {
            return response.data
        }

        throw new Error("بيانات المناديب غير متوفرة");

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات المناديب";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            delegates_Ids: [],
            error: errorMessage,
        };
    }
};