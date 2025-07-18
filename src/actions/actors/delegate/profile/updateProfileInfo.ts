// src/actions/actors/delegate/profile/updateProfileInfo.ts
"use server";

import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";
import { delegateProfileType } from "@/validation/actor/delegate/delegate-profile-schema"; // Import the new payload type


export interface UpdateDelegateProfileProps {
    delegate_Id: number;
    payload: delegateProfileType;
}
export const updateDelegateProfile = async ({ delegate_Id, payload }: UpdateDelegateProfileProps): Promise<DelegateProfileResponse> => {
    try {

        // FIXME: remove this => just as an example
        const fakeData: DelegateProfileResponse = {
            status: 200,
            message: "تم تحديث الملف الشخصي بنجاح",
            user: {
                id: 0,//FIXME:
                // ...currentProfile, // Keep existing read-only fields
                name: payload.name,
                identity: payload.identity,
                gender: payload.gender,
                social_status: payload.social_status,
                nationality: payload.nationality,
                email: payload.email,
                age: payload.age,
                education: payload.education,
                phone_number: payload.phone_number as string,
                alternative_phone_number: payload.alternative_phone_number as string,
                profile_image: payload.profile_image as string,

            },
        };
        // Simulate API delay
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(fakeData);
            }, 1000);
        });

        /////////////////////////////////////////////////////////////
        // FIXME: THIS IS THE REAL IMPLEMENTATION
        /////////////////////////////////////////////////////////////

        // Prepare API payload (no formData, directly use the object)
        const apiPayload = {
            name: payload.name,
            identity: payload.identity,
            gender: payload.gender,
            social_status: payload.social_status,
            nationality: payload.nationality,
            email: payload.email,
            age: payload.age,
            education: payload.education,
            phone_number: payload.phone_number,
            alternative_phone_number: payload.alternative_phone_number,
            profile_image: payload.profile_image,
        };


        // Update profile via API

        const response = await AqsaAPI.put(`/delegates/${delegate_Id}/profile`, apiPayload);

        if (response.data?.user) {
            return {
                status: 200,
                message: "تم تحديث الملف الشخصي بنجاح",
                user: response.data.user,
            };
        }

        throw new Error("فشل في تحديث الملف الشخصي");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "bbbbحدث خطأ أثناء تحديث الملف الشخصي";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: { // Return a partial or default user object on error
                id: 0,//FIXME:
                name: payload.name || "",
                identity: payload.identity || "",
                gender: payload.gender || "male",
                social_status: payload.social_status || "single",
                nationality: payload.nationality || "",
                email: payload.email || "",
                age: payload.age || 0,
                education: payload.education || "",
                phone_number: payload.phone_number || "",
                alternative_phone_number: payload.alternative_phone_number || "",
                profile_image: payload.profile_image || null,
                // These are not part of the payload, so we'll set defaults or null
                number_of_responsible_camps: 0,
                number_of_families: 0,
            },
            error: errorMessage,
        };
    }
};