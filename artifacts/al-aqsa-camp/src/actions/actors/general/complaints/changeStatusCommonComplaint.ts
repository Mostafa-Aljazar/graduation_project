
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_RANK, USER_TYPE, UserRank, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface changeStatusCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: Exclude<UserRank, typeof USER_RANK.SECURITY | typeof USER_RANK.DISPLACED>;

}

export const changeStatusCommonComplaint = async ({
    complaint_Id, actor_Id, role
}: changeStatusCommonComplaintProps): Promise<commonActionResponse> => {

    try {
        // This legacy signature has no target state; retain its historical
        // "advance" behavior by moving an open complaint into progress.
        const response = await AqsaAPI.patch(`/complaints/${complaint_Id}/status`, { status: "inProgress" });

        if (response.data) {
            return { status: response.status, message: "تم تغيير حالة الشكوى بنجاح" };
        }

        throw new Error("حدث خطأ أثناء تغيير حالة الشكوى");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الشكوى";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};