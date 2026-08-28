
import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";

export interface getDelegateProfileProps {
    delegate_Id: number;
}

export const getDelegateProfile = async ({
    delegate_Id,
}: getDelegateProfileProps): Promise<DelegateProfileResponse> => {

    try {
        const response = await AqsaAPI.get(`/delegates/${delegate_Id}`);
        const delegate = response.data;

        if (delegate?.id !== undefined) {
            return {
                status: response.status,
                user: {
                    ...delegate,
                    phone_number: delegate.phone,
                    profile_image: null,
                } as DelegateProfile,
            };
        }

        throw new Error("فشل في تحميل بيانات الملف الشخصي");

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DelegateProfile,
            error: errorMessage,
        };
    }

};
