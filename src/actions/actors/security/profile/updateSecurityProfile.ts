"use server";

import { SecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { USER_RANK, USER_TYPE, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";
import { SecurityProfileSchemaType } from "@/validation/actor/security/profile/security-profile-schema";

export interface UpdateSecurityProfileProps {
    security_Id: number;
    payload: SecurityProfileSchemaType;
}

export const updateSecurityProfile = async ({
    security_Id,
    payload,
}: UpdateSecurityProfileProps): Promise<SecurityProfileResponse> => {

    // Fake implementation for demo, replace with real API call
    const fakeData: SecurityProfileResponse = {
        status: 200,
        message: "تم تحديث الملف الشخصي للامن بنجاح",
        user: {
            id: security_Id,
            profile_image: payload.profile_image || "",
            name: payload.name,
            email: payload.email,
            identity: payload.identity,
            gender: payload.gender,
            nationality: payload.nationality,
            phone_number: payload.phone_number as string,
            alternative_phone_number: payload.alternative_phone_number || "",
            social_status: payload.social_status,
            role: USER_RANK.SECURITY,
            rank: payload.rank as Exclude<
                UserRank,
                typeof USER_RANK.DISPLACED | typeof USER_RANK.DELEGATE | typeof USER_RANK.MANAGER>,
            additional_notes: payload.additional_notes || "",
        },
    };

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });


    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////

    const apiPayload = {
        id: security_Id,
        profile_image: payload.profile_image || "",
        name: payload.name,
        email: payload.email,
        identity: payload.identity,
        gender: payload.gender,
        nationality: payload.nationality,
        phone_number: payload.phone_number as string,
        alternative_phone_number: payload.alternative_phone_number || "",
        social_status: payload.social_status,
        role: USER_RANK.SECURITY,
        rank: payload.rank as Exclude<
            UserRank,
            typeof USER_RANK.DISPLACED | typeof USER_RANK.DELEGATE | typeof USER_RANK.MANAGER>,
        additional_notes: payload.additional_notes || "",
    };

    try {
        const response = await AqsaAPI.put<SecurityProfileResponse>(`/securities/${security_Id}/profile`, apiPayload);

        if (response.data?.user) {
            return response.data
        }

        throw new Error("فشل في تحديث بيانات الملف الشخصي");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تحديث الملف الشخصي للامن";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {
                ...apiPayload,
                id: 0,
            },
            error: errorMessage,
        };
    }
};
