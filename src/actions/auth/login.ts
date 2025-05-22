"use server";
import { loginResponse } from "@/@types/auth/loginResponse.type";
import AqsaAPI from "@/services";
import { LOCALSTORAGE_SESSION_KEY } from "@/constants/sessionKey";


export const login = async (formData: FormData): Promise<loginResponse> => {

    // Get form data values
    const email = formData.get("email");
    const password = formData.get("password");
    const userType = formData.get("userType");

    //FIXME: remove this => just as  an example
    const FakeData: loginResponse = {
        status: "200",
        message: "تم تسجيل الدخول بنجاح",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
            id: 1,
            name: "John Doe",
            email: formData.get("email") as string,
            idNumber: 408656429,
            phone_number: "+1234567890",
            created_at: new Date("2024-01-20T12:00:00.000Z"),
            role: userType as "DISPLACED" | "DELEGATE" | "MANAGER" | "SECURITY" | "SECURITY_OFFICER",
            image: null
        },
        error: "Error message in Arabic"
    }
    return await new Promise((resolve) => {
        // Return fake data after 3 seconds => Simulate API delay
        setTimeout(() => {
            resolve(FakeData);
        }, 3000);
    });


    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        // Get form data values
        const email = formData.get("email");
        const password = formData.get("password");
        const userType = formData.get("userType");

        if (!email || !password || !userType) {
            return {
                status: "400",
                message: "جميع الحقول مطلوبة",
                token: "",
                user: {
                    id: 0,
                    name: "",
                    email: "",
                    idNumber: 0,
                    phone_number: "",
                    created_at: new Date(),
                    role: "MANAGER",
                    image: null

                },
                error: "جميع الحقول مطلوبة"
            };
        }

        const response = await AqsaAPI.post("/auth/login", {
            email,
            password,
            userType
        });

        if (response.data) {
            return {
                status: "200",
                message: "تم تسجيل الدخول بنجاح",
                token: response.data.token,
                user: response.data.user
            };
        }

        return {
            status: "500",
            message: "حدث خطأ في تسجيل الدخول",
            token: "",
            user: {
                id: 0,
                name: "",
                email: "",
                idNumber: 0,
                phone_number: "",
                created_at: new Date(),
                role: "DISPLACED",
                image: null
            },
            error: "حدث خطأ في تسجيل الدخول"
        };

    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "حدث خطأ في تسجيل الدخول",
            token: "",
            user: {
                id: 0,
                name: "",
                email: "",
                idNumber: 0,
                phone_number: "",
                created_at: new Date(),
                role: "DISPLACED",
                image: null
            },
            error: error.response?.data?.error || "حدث خطأ في تسجيل الدخول"
        };
    }
}
