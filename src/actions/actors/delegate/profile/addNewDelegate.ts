"use server";

import { DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";
import { delegateProfileType } from "@/validation/actor/delegate/delegate-profile-schema"; // Reuse the payload type


export interface addNewDelegateProps {
    payload: delegateProfileType;
}


export const addNewDelegate = async ({ payload }: addNewDelegateProps): Promise<DelegateProfileResponse> => {
    try {
        // FIXME: THIS IS A FAKE IMPLEMENTATION FOR DEMONSTRATION. REPLACE WITH REAL API CALL.
        // In a real scenario, the backend would assign a new ID, set default read-only values, etc.
        const fakeData: DelegateProfileResponse = {
            status: 201, // 201 Created
            message: "تم إضافة المندوب الجديد بنجاح",
            user: {
                ...payload, // New delegate data
                identity: payload.identity, // Assuming ID is part of payload for new, or backend generates
                phone_number: payload.phone_number as string, // Ensure string type
                alternative_phone_number: payload.alternative_phone_number as string || "", // Ensure string type
                profile_image: payload.profile_image as string || null, // Ensure string or null
                number_of_responsible_camps: 0, // Default for new delegate
                number_of_families: 0, // Default for new delegate
            },
        };

        // Simulate API delay
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(fakeData);
            }, 2000);
        });

        /////////////////////////////////////////////////////////////
        // FIXME: THIS IS THE REAL IMPLEMENTATION
        /////////////////////////////////////////////////////////////

        const response = await AqsaAPI.post("/manager/delegates", payload); // Assuming a manager endpoint for adding delegates

        if (response.data?.user) {
            return {
                status: 201, // 201 Created
                message: "تم إضافة المندوب الجديد بنجاح",
                user: response.data.user,
            };
        }

        // throw new Error("فشل في إضافة المندوب الجديد");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة المندوب الجديد";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: { // Return default user object on error for consistency
                name: payload.name || "",
                identity: payload.identity || "0",
                gender: payload.gender || "male",
                social_status: payload.social_status || "single",
                nationality: payload.nationality || "",
                email: payload.email || "",
                age: payload.age || 0,
                education: payload.education || "",
                phone_number: payload.phone_number || "",
                alternative_phone_number: payload.alternative_phone_number || "",
                profile_image: payload.profile_image || null,
                number_of_responsible_camps: 0,
                number_of_families: 0,
            },
            error: errorMessage,
        };
    }
};