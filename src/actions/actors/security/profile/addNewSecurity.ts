"use server";

import { SecurityProfile, SecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { USER_RANK, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";
import { SecurityProfileSchemaType } from "@/validation/actor/security/profile/security-profile-schema";

export interface AddNewSecurityProps {
    payload: SecurityProfileSchemaType;
}

export const addNewSecurity = async ({
    payload,
}: AddNewSecurityProps): Promise<SecurityProfileResponse> => {

    const fakeResponse: SecurityProfileResponse = {
        status: 201,
        message: "تم إضافة الامن الجديد بنجاح",
        user: {
            ...payload,
            profile_image: payload.profile_image || "",
            alternative_phone_number: payload.alternative_phone_number || "",
            role: USER_RANK.SECURITY,
            rank: payload.rank as Exclude<
                UserRank,
                typeof USER_RANK.DISPLACED | typeof USER_RANK.DELEGATE | typeof USER_RANK.MANAGER>,
            additional_notes: payload.additional_notes || "",
        },
    };

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.post<SecurityProfileResponse>("/securities/add", payload);

        if (response.data?.user) {
            return response.data
        }

        throw new Error("فشل في إضافة الامن الجديد");

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة الامن الجديد";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as SecurityProfile,
            error: errorMessage,
        };

    }
};