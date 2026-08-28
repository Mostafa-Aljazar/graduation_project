
import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";
import { DelegateProfileSchemaType } from "@/validation/actor/delegate/delegate-profile-schema"; // Reuse the payload type


export interface addNewDelegateProps {
    payload: DelegateProfileSchemaType;
}


export const addNewDelegate = async ({ payload }: addNewDelegateProps): Promise<DelegateProfileResponse> => {
    try {
        const response = await AqsaAPI.post("/delegates", {
            name: payload.name,
            email: payload.email,
            phone: payload.phone_number,
        });
        const delegate = response.data;
        if (delegate?.id !== undefined) {
            return {
                status: response.status,
                message: "تم إضافة المندوب الجديد بنجاح",
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

        throw new Error("فشل في إضافة المندوب الجديد");

    } catch (error: any) {

        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة المندوب الجديد";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DelegateProfile,
            error: errorMessage,
        };

    }
};