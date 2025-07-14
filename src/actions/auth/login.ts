"use server";
import { AqsaGuestAPI } from "@/services";
import { USER_RANK, UserType } from "@/constants/userTypes";
import { loginResponse } from "@/@types/auth/loginResponse.type";


export interface loginProps {
    userType: UserType;
    password: string;
    email: string
}

export const login = async ({ email, password, userType }: loginProps): Promise<loginResponse> => {

    //FIXME: remove this => just as  an example
    const FakeData: loginResponse = {
        status: 200,
        message: 'تم تسجيل الدخول بنجاح',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
            id: 1,
            name: 'John Doe',
            email,
            identity: "408656429",
            phone_number: '+1234567890',
            created_at: new Date(),
            role: userType,
            rank: USER_RANK[userType],
            image: null,
        },
    };


    return await new Promise((resolve) => {
        // Return fake data after 1 seconds => Simulate API delay
        setTimeout(() => {
            resolve(FakeData);
        }, 1000);
    });


    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaGuestAPI.post("/auth/login", { email, password, userType });

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
            user: {
                id: 0,
                name: "",
                email: "",
                identity: "0",
                phone_number: "",
                created_at: new Date(),
                role: "" as UserType,
                image: null,
            },
            error: error.response?.data?.error || "حدث خطأ في تسجيل الدخول",
        };
    }

}
