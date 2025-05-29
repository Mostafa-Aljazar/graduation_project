"use server";

import { AqsaAPI } from "@/services";
import { ProfileResponse } from "@/@types/actors/manager/profile/profileResponse.type";

export const getProfile = async (): Promise<ProfileResponse> => {

    //FIXME: remove this => just as  an example
    const fakeData: ProfileResponse = {
        status: '200',
        message: 'تم جلب بيانات الملف الشخصي بنجاح',
        user: {
            name: 'مصطفى',
            idNumber: 960128100,
            gender: 'male',
            maritalStatus: 'widowed',
            nationality: 'فلسطيني',
            email: 'mostafa@gmail.com',
            birthDate: new Date('1990-01-01'),
            mobileNumber: '+970595796456',
            alternativeNumber: '+970595796456',
            avatar: null,
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
    try {
        const response = await AqsaAPI.get("/manager/profile");

        if (response.data?.user) {
            return {
                status: "200",
                message: "تم جلب بيانات الملف الشخصي بنجاح",
                user: response.data.user,
            };
        }

        throw new Error("بيانات الملف الشخصي غير متوفرة");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء جلب بيانات الملف الشخصي";
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