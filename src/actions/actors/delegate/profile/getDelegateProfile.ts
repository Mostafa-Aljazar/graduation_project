'use server';

import { GENDER, SOCIAL_STATUS } from "@/@types/actors/common-types/index.type";
import { DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { fakeDelegateProfileResponse } from "@/content/actor/delegate/fake-delegates-profile";
import { AqsaAPI } from "@/services";

export interface getDelegateProfileProps {
    delegate_Id: number;
}

export const getDelegateProfile = async ({
    delegate_Id,
}: getDelegateProfileProps): Promise<DelegateProfileResponse> => {


    const fakeData = fakeDelegateProfileResponse({ delegate_Id });
    return new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000));

    try {
        const response = await AqsaAPI.get(`/delegates/${delegate_Id}/profile`);

        const user = response.data?.user;
        if (!user) {
            throw new Error("فشل في تحميل بيانات الملف الشخصي");
        }

        return {
            status: 200,
            message: "تم تحميل بيانات الملف الشخصي بنجاح",
            user,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";

        return {
            status: Number(error.response?.status) || 500,
            message: errorMessage,
            user: {
                id: 0,
                name: "",
                identity: "",
                gender: GENDER.MALE,
                social_status: SOCIAL_STATUS.SINGLE,
                nationality: "",
                email: "",
                age: 0,
                education: "",
                phone_number: "",
                alternative_phone_number: "",
                number_of_responsible_camps: 0,
                number_of_families: 0,
                profile_image: null,
            },
            error: errorMessage,
        };
    }
};
