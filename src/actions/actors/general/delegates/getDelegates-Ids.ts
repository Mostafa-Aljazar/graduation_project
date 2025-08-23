"use server";

import { DelegatesIdsResponse } from "@/@types/actors/general/delegates/delegatesResponse.type";
import { fakeDelegatesIdsResponse } from "@/content/actor/delegate/fake-data/fake-delegates";
import { AqsaAPI } from "@/services";

export const getDelegatesIds = async (): Promise<DelegatesIdsResponse> => {
    const fakeResponse: DelegatesIdsResponse = fakeDelegatesIdsResponse()
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<DelegatesIdsResponse>("/delegates/ids");

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