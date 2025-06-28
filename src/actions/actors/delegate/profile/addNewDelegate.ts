// src/actions/actors/manager/delegate/addNewDelegate.ts
"use server";

import { DelegateProfileResponse, DelegateProfile } from "@/@types/actors/delegate/profile/profileResponse.type";
import { AqsaAPI } from "@/services";
import { delegateUpdatePayload } from "@/validation/actor/delegate/profileSchema"; // Reuse the payload type

export const addNewDelegate = async (payload: delegateUpdatePayload): Promise<DelegateProfileResponse> => {
    try {
        // FIXME: THIS IS A FAKE IMPLEMENTATION FOR DEMONSTRATION. REPLACE WITH REAL API CALL.
        // In a real scenario, the backend would assign a new ID, set default read-only values, etc.
        const fakeData: DelegateProfileResponse = {
            status: "201", // 201 Created
            message: "تم إضافة المندوب الجديد بنجاح",
            user: {
                ...payload, // New delegate data
                idNumber: payload.idNumber, // Assuming ID is part of payload for new, or backend generates
                mobileNumber: payload.mobileNumber as string, // Ensure string type
                alternativeNumber: payload.alternativeNumber as string || "", // Ensure string type
                avatar: payload.avatar as string || null, // Ensure string or null
                numberOfResponsibleCamps: 0, // Default for new delegate
                numberOfFamilies: 0, // Default for new delegate
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

        // const response = await AqsaAPI.post("/manager/delegates", payload); // Assuming a manager endpoint for adding delegates

        // if (response.data?.user) {
        //   return {
        //     status: "201", // 201 Created
        //     message: "تم إضافة المندوب الجديد بنجاح",
        //     user: response.data.user,
        //   };
        // }

        // throw new Error("فشل في إضافة المندوب الجديد");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة المندوب الجديد";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: { // Return default user object on error for consistency
                name: payload.name || "",
                idNumber: payload.idNumber || 0,
                gender: payload.gender || "male",
                maritalStatus: payload.maritalStatus || "single",
                nationality: payload.nationality || "",
                email: payload.email || "",
                age: payload.age || 0,
                education: payload.education || "",
                mobileNumber: payload.mobileNumber || "",
                alternativeNumber: payload.alternativeNumber || "",
                avatar: payload.avatar || null,
                numberOfResponsibleCamps: 0,
                numberOfFamilies: 0,
            },
            error: errorMessage,
        };
    }
};