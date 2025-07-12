"use server";

import { Aid } from "@/@types/actors/manager/aid-management/add-aid-management.types";
import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";


export const addAid = async (payload: Aid): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إضافة المساعدة بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });




    try {
        const response = await AqsaAPI.post(`/manager/aids/add`, payload);

        if (response.data) {
            return {
                status: "200",
                message: "تم إضافة المساعدة بنجاح",
            };
        }

        return {
            status: "500",
            message: "حدث خطأ أثناء إضافة المساعدة",
            error: "حدث خطأ أثناء إضافة المساعدة",
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "حدث خطأ أثناء إضافة المساعدة",
            error: error.response?.data?.error || "حدث خطأ أثناء إضافة المساعدة",
        };
    }
};