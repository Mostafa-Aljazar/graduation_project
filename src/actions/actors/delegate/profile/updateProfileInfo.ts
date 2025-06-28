// src/actions/actors/delegate/profile/updateProfileInfo.ts
"use server";

import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/profileResponse.type";
import { AqsaAPI } from "@/services";
import { delegateUpdatePayload } from "@/validation/actor/delegate/profileSchema"; // Import the new payload type

export const updateDelegateProfile = async (payload: delegateUpdatePayload): Promise<DelegateProfileResponse> => {
    try {

        // FIXME: remove this => just as an example
        const fakeData: DelegateProfileResponse = {
            status: "200",
            message: "تم تحديث الملف الشخصي بنجاح",
            user: {
                // ...currentProfile, // Keep existing read-only fields
                name: payload.name,
                idNumber: payload.idNumber,
                gender: payload.gender,
                maritalStatus: payload.maritalStatus,
                nationality: payload.nationality,
                email: payload.email,
                age: payload.age,
                education: payload.education,
                mobileNumber: payload.mobileNumber as string,
                alternativeNumber: payload.alternativeNumber as string,
                avatar: payload.avatar as string,
                numberOfFamilies: 0,
                numberOfResponsibleCamps: 0
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
        // const apiPayload = {
        //   name: payload.name,
        //   idNumber: Number(payload.idNumber),
        //   gender: payload.gender,
        //   maritalStatus: payload.maritalStatus,
        //   nationality: payload.nationality,
        //   email: payload.email,
        //   age: Number(payload.age),
        //   education: payload.education,
        //   mobileNumber: payload.mobileNumber,
        //   alternativeNumber: payload.alternativeNumber || undefined,
        //   avatar: payload.avatar || undefined,
        //   // numberOfResponsibleCamps and numberOfFamilies are not sent in the update
        //   // as they are read-only from the backend's perspective.
        // };

        // Update profile via API
        // const response = await AqsaAPI.put("/delegate/profile", apiPayload);

        // if (response.data?.user) {
        //   return {
        //     status: "200",
        //     message: "تم تحديث الملف الشخصي بنجاح",
        //     user: response.data.user,
        //   };
        // }

        // throw new Error("فشل في تحديث الملف الشخصي");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "bbbbحدث خطأ أثناء تحديث الملف الشخصي";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: { // Return a partial or default user object on error
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
                // These are not part of the payload, so we'll set defaults or null
                numberOfResponsibleCamps: 0,
                numberOfFamilies: 0,
            },
            error: errorMessage,
        };
    }
};