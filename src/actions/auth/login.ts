"use server";
import { AqsaGuestAPI } from "@/services";
import { USER_RANK, UserType } from "@/constants/userTypes";
import { loginResponse, User } from "@/@types/auth/loginResponse.type";

export interface loginProps {
    userType: UserType;
    password: string;
    email: string
}

export const login = async ({ email, password, userType }: loginProps): Promise<loginResponse> => {

    // const fakeData: loginResponse = {
    //     status: 200,
    //     message: 'تم تسجيل الدخول بنجاح',
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    //     user: {
    //         id: 1,
    //         name: 'John Doe',
    //         email,
    //         identity: "408656429",
    //         phone_number: '+1234567890',
    //         created_at: new Date(),
    //         role: userType,
    //         rank: USER_RANK[userType],
    //         profile_image: "",

    //     },
    // };

    // return await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(fakeData);
    //     }, 500);
    // });

    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaGuestAPI.post("/login", { email, password, role: userType });

        if (response.data) {
            return {
                status: 200,
                message: "تم تسجيل الدخول بنجاح",
                token: response.data.token,
                user: response.data.user,
            };
        }

        throw new Error("حدث خطأ في تسجيل الدخول");
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error || "حدث خطأ في تسجيل الدخول",
            token: "",
            user: {} as User,
            error: error.response?.data?.error || "حدث خطأ في تسجيل الدخول",
        };
    }

}
