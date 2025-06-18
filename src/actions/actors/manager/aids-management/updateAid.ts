"use server";

import { AddAidPayload } from "@/@types/actors/manager/aid-management/add-aid-management.types";
import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";


export const updateAid = async (payload: AddAidPayload): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: "200",
        message: "تم تعديل المساعدة بنجاح",
    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });




    try {
        const response = await AqsaAPI.put(`/manager/aids/update/${payload.id}`, payload);
        if (response.data) {
            return {
                status: "200",
                message: "تم تعديل المساعدة بنجاح",
            };
        }

        return {
            status: "500",
            message: "حدث خطأ أثناء تعديل المساعدة",
            error: "حدث خطأ أثناء تعديل المساعدة",
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "حدث خطأ أثناء تعديل المساعدة",
            error: error.response?.data?.error || "حدث خطأ أثناء تعديل المساعدة",
        };
    }
};