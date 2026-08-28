
import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";
import { DelegateProfileSchemaType } from "@/validation/actor/delegate/delegate-profile-schema"; // Import the new payload type

export interface UpdateDelegateProfileProps {
    delegate_Id: number;
    payload: DelegateProfileSchemaType;
}

export const updateDelegateProfile = async ({ delegate_Id, payload }: UpdateDelegateProfileProps): Promise<DelegateProfileResponse> => {
    try {
        const response = await AqsaAPI.patch(`/delegates/${delegate_Id}`, {
            name: payload.name,
            email: payload.email,
            phone: payload.phone_number,
        });
        const delegate = response.data;
        if (delegate?.id !== undefined) {
            return {
                status: response.status,
                message: "تم تحديث الملف الشخصي بنجاح",
                user: {
                    ...payload,
                    id: delegate.id,
                    name: delegate.name,
                    email: delegate.email,
                    phone_number: delegate.phone,
                    profile_image: payload.profile_image ?? null,
                    alternative_phone_number: payload.alternative_phone_number ?? undefined,
                },
            };
        }

        throw new Error("فشل في تحديث الملف الشخصي");

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "bbbbحدث خطأ أثناء تحديث الملف الشخصي";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DelegateProfile,
            error: errorMessage,
        };

    }
};