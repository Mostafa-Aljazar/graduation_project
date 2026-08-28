
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_RANK, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface replyCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: Exclude<UserRank, typeof USER_RANK.SECURITY | typeof USER_RANK.DISPLACED>;
    reply: string;
}

export const replyCommonComplaint = async ({
    complaint_Id,
    actor_Id,
    role,
    reply,
}: replyCommonComplaintProps): Promise<commonActionResponse> => {

    try {
        const response = await AqsaAPI.post(`/complaints/${complaint_Id}/reply`, { reply });

        if (response.data) {
            return { status: response.status, message: "تم ارسال الرد بنجاح" };
        }

        throw new Error("حدث خطأ أثناء ارسال الرد");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال الرد";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};