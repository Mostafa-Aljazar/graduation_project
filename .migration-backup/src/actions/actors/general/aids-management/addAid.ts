"use server";

import { Aid } from "@/@types/actors/manager/aid-management/add-aid-management.types";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";


export const addAid = async (payload: Aid): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: "تم إضافة المساعدة بنجاح",
    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.post<commonActionResponse>('/aids/add', payload);

        if (response.data) {
            return {
                status: 200,
                message: "تم إضافة المساعدة بنجاح",
            };
        }

        return {
            status: 500,
            message: "حدث خطأ أثناء إضافة المساعدة",
            error: "حدث خطأ أثناء إضافة المساعدة",
        };

    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error || "حدث خطأ أثناء إضافة المساعدة",
            error: error.response?.data?.error || "حدث خطأ أثناء إضافة المساعدة",
        };
    }
};