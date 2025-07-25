"use server";

import { SecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { USER_RANK, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";
import { SecurityProfileSchemaType } from "@/validation/actor/security/profile/security-profile-schema";

export interface AddNewSecurityProps {
    payload: SecurityProfileSchemaType;
}

export const addNewSecurity = async ({
    payload,
}: AddNewSecurityProps): Promise<SecurityProfileResponse> => {

    // Fake implementation for demonstration. Replace with real API call.
    const fakeData: SecurityProfileResponse = {
        status: 201,
        message: "تم إضافة الامن الجديد بنجاح",
        user: {
            // id: 0, // backend should assign real ID
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
        const response = await AqsaAPI.post("/securities/add", apiPayload);

        if (response.data?.user) {
            return {
                status: 201,
                message: "تم إضافة الامن الجديد بنجاح",
                user: response.data.user,
            };
        }

        throw new Error("فشل في إضافة الامن الجديد");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة الامن الجديد";
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