"use server";

import { AqsaAPI } from "@/services";
import { ProfileResponse } from "@/@types/actors/manager/profile/profileResponse.type";

export const updateProfile = async (formData: FormData): Promise<ProfileResponse> => {
    try {
        // Extract and validate form data
        const fields = {
            name: formData.get("name") as string,
            idNumber: formData.get("idNumber") as string,
            gender: formData.get("gender") as "male" | "female",
            maritalStatus: formData.get("maritalStatus") as "single" | "married" | "divorced" | "widowed",
            nationality: formData.get("nationality") as string,
            email: formData.get("email") as string,
            birthDate: formData.get("birthDate") as string,
            mobileNumber: formData.get("mobileNumber") as string,
            alternativeNumber: formData.get("alternativeNumber") as string,
            avatar: formData.get("avatar") as string | null,
        };

        //FIXME: remove this => just as  an example

        const fakeData: ProfileResponse = {
            status: "200",
            message: "تم تحديث الملف الشخصي بنجاح",
            user: {
                name: fields.name,
                idNumber: Number(fields.idNumber),
                gender: fields.gender,
                maritalStatus: fields.maritalStatus,
                nationality: fields.nationality,
                email: fields.email,
                birthDate: new Date(fields.birthDate),
                mobileNumber: fields.mobileNumber,
                alternativeNumber: fields.alternativeNumber,
                avatar: fields.avatar,
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



        // Prepare API payload
        const payload = {
            name: fields.name,
            idNumber: Number(fields.idNumber),
            gender: fields.gender,
            maritalStatus: fields.maritalStatus,
            nationality: fields.nationality,
            email: fields.email,
            birthDate: new Date(fields.birthDate),
            mobileNumber: fields.mobileNumber,
            alternativeNumber: fields.alternativeNumber || undefined,
            avatar: fields.avatar || undefined,
        };

        // Update profile via API
        const response = await AqsaAPI.put("/manager/profile", payload);

        if (response.data?.user) {

            return {
                status: "200",
                message: "تم تحديث الملف الشخصي بنجاح",
                user: response.data.user,
            };
        }

        throw new Error("فشل في تحديث الملف الشخصي");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحديث الملف الشخصي";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: {
                name: "",
                idNumber: 0,
                gender: "male",
                maritalStatus: "single",
                nationality: "",
                email: "",
                birthDate: new Date(),
                mobileNumber: "",
                alternativeNumber: "",
                avatar: null,
            },
            error: errorMessage,
        };
    }
};