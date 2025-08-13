"use server";

import { Aid } from "@/@types/actors/manager/aid-management/add-aid-management.types";
import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { AqsaAPI } from "@/services";


export const addAid = async (payload: Aid): Promise<modalActionResponse> => {
    const fakeResponse: modalActionResponse = {
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

        const response = await AqsaAPI.post<modalActionResponse>('/aids/add', payload);

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