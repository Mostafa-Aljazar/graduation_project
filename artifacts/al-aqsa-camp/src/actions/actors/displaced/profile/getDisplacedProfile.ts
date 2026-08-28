
import { DisplacedProfile, DisplacedProfileResponse } from "@/@types/actors/displaced/profile/displacedProfileResponse.type";
import { AqsaAPI } from "@/services";

export interface getDisplacedProfileProps {
    displaced_Id: number;
};

export const getDisplacedProfile = async ({ displaced_Id }: getDisplacedProfileProps): Promise<DisplacedProfileResponse> => {

    try {
        const response = await AqsaAPI.get(`/displaced-persons/${displaced_Id}`);

        if (response.data?.id !== undefined) {
            return { status: response.status, user: { ...response.data, phone_number: response.data.phone, identity: response.data.nationalId } as DisplacedProfile };
        }

        throw new Error("فشل في تحميل بيانات الملف الشخصي");

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DisplacedProfile,
            error: errorMessage,
        };
    }
};