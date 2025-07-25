"use server";

import { DisplacedProfileResponse } from "@/@types/actors/displaced/profile/displacedProfileResponse.type";
import { AqsaAPI } from "@/services";
import { DisplacedProfileType } from "@/validation/actor/displaceds/profile/displaced-profile-schema";

export interface UpdateDisplacedProfileProps {
    displaced_Id: number;
    payload: DisplacedProfileType;
}

export const updateDisplacedProfile = async ({
    displaced_Id,
    payload,
}: UpdateDisplacedProfileProps): Promise<DisplacedProfileResponse> => {
    try {
        // Fake implementation for demo, replace with real API call
        const fakeData: DisplacedProfileResponse = {
            status: 200,
            message: "تم تحديث الملف الشخصي للنازح بنجاح",
            user: {
                id: displaced_Id,
                profile_image: payload.profile_image || "",
                name: payload.name,
                email: payload.email,
                identity: payload.identity,
                gender: payload.gender,
                nationality: payload.nationality,
                original_address: payload.original_address,
                phone_number: payload.phone_number as string,
                alternative_phone_number: payload.alternative_phone_number || "",
                wives: payload.wives || [],
                social_status: {
                    ...payload.social_status,
                    age_groups: Object.fromEntries(
                        Object.values([
                            'LESS_THAN_6_MONTHS',
                            'FROM_6_MONTHS_TO_2_YEARS',
                            'FROM_2_TO_5_YEARS',
                            'FROM_5_TO_18_YEARS',
                            'FROM_18_TO_60_YEARS',
                            'MORE_THAN_60_YEARS',
                        ]).map((age) => [
                            age,
                            payload.social_status.age_groups?.[age as keyof typeof payload.social_status.age_groups] ?? 0,
                        ])
                    ) as Record<string, number>,
                },
                displacement: payload.displacement,
                war_injuries: payload.war_injuries || [],
                martyrs: payload.martyrs || [],
                medical_conditions: payload.medical_conditions || [],
                additional_notes: payload.additional_notes || "",
            },
        };

        // Simulate API delay
        return await new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000));

        /////////////////////////////////////////////////////////////
        // Real API call example:
        /////////////////////////////////////////////////////////////
        const apiPayload = {
            profile_image: payload.profile_image,
            name: payload.name,
            email: payload.email,
            identity: payload.identity,
            gender: payload.gender,
            nationality: payload.nationality,
            original_address: payload.original_address,
            phone_number: payload.phone_number,
            alternative_phone_number: payload.alternative_phone_number,
            wives: payload.wives,
            social_status: payload.social_status,
            displacement: payload.displacement,
            war_injuries: payload.war_injuries,
            martyrs: payload.martyrs,
            medical_conditions: payload.medical_conditions,
            additional_notes: payload.additional_notes,
        };
        //
        const response = await AqsaAPI.put(`/ displaced / ${displaced_Id}/profile`, apiPayload);

        if (response.data?.user) {
            return {
                status: 200,
                message: "تم تحديث الملف الشخصي للنازح بنجاح",
                user: response.data.user,
            };
        }

        throw new Error("فشل في تحديث الملف الشخصي");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تحديث الملف الشخصي للنازح";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {
                id: 0,
                profile_image: payload.profile_image || "",
                name: payload.name || "",
                email: payload.email || "",
                identity: payload.identity || "",
                gender: payload.gender || "male",
                nationality: payload.nationality || "",
                original_address: payload.original_address || "",
                phone_number: payload.phone_number || "",
                alternative_phone_number: payload.alternative_phone_number || "",
                wives: payload.wives || [],
                social_status: {
                    ...payload.social_status,
                    age_groups: Object.fromEntries(
                        Object.values([
                            'LESS_THAN_6_MONTHS',
                            'FROM_6_MONTHS_TO_2_YEARS',
                            'FROM_2_TO_5_YEARS',
                            'FROM_5_TO_18_YEARS',
                            'FROM_18_TO_60_YEARS',
                            'MORE_THAN_60_YEARS',
                        ]).map((age) => [
                            age,
                            payload.social_status.age_groups?.[age as keyof typeof payload.social_status.age_groups] ?? 0,
                        ])
                    ) as Record<string, number>,
                },
                displacement: payload.displacement,
                war_injuries: payload.war_injuries || [],
                martyrs: payload.martyrs || [],
                medical_conditions: payload.medical_conditions || [],
                additional_notes: payload.additional_notes || "",
            },
            error: errorMessage,
        };
    }
};
