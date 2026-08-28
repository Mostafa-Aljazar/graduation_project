
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_RANK, USER_TYPE, UserRank, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface addAidDisplacedsProps {
    aid_Id: number;
    displaceds_Ids: number[];
    actor_Id: number;
    role: Exclude<
        (typeof USER_RANK)[UserRank],
        typeof USER_RANK.SECURITY_OFFICER | typeof USER_TYPE.SECURITY | typeof USER_TYPE.DISPLACED
    >;
}

export const addAidDisplaceds = async ({
    aid_Id,
    displaceds_Ids,
    actor_Id,
    role,
}: addAidDisplacedsProps): Promise<commonActionResponse> => {

    try {
        const response = await AqsaAPI.post(`/aids/${aid_Id}/recipients`, { displacedPersonIds: displaceds_Ids });

        if (response.data) {
            return {
                status: response.status,
                message: 'تم إضافة النازحين للمساعدة بنجاح',
            };
        }

        return {
            status: 500,
            message: "حدث خطأ أثناء إضافة النازحين للمساعدة",
            error: "حدث خطأ أثناء إضافة النازحين للمساعدة",
        };

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة النازحين للمساعدة";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};