
import { Aid } from "@/@types/actors/manager/aid-management/add-aid-management.types";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";


export const addAid = async (payload: Aid): Promise<commonActionResponse> => {
    try {
        const response = await AqsaAPI.post('/aids', {
            title: payload.aid_name,
            type: payload.aid_type,
            description: payload.aid_content,
            quantity: payload.existing_quantity,
            distributionDate: payload.delivery_date?.toISOString(),
        });

        if (response.data) {
            return {
                status: response.status,
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