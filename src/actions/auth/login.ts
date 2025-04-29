"use server";
import { loginResponse } from "@/@types/auth/loginResponse.type";
import AqsaAPI from "@/services";
import { LOCALSTORAGE_SESSION_KEY } from "@/constants/sessionKey";


export const login = async (formData: FormData): Promise<loginResponse> => {

    //FIXME: remove this => just as  an example
    const FakeData: loginResponse = {
        status: "200",
        message: "تم تسجيل الدخول بنجاح",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
            id: 1,
            name: "John Doe",
            email: formData.get("email") as string,
            phone_number: "+1234567890",
            created_at: new Date("2024-01-20T12:00:00.000Z"),
            role: "DISPLACED",
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
                    phone_number: "",
                    created_at: new Date(),
                    role: "MANAGER"
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
            // Store the session in localStorage
            // localStorage.setItem(LOCALSTORAGE_SESSION_KEY, JSON.stringify({
            //     token: response.data.token,
            //     // TODO: fix this => common type for user
            //     user: {
            //         id: response.data.user.id,
            //         name: response.data.user.name,
            //         email: response.data.user.email,
            //         phone_number: response.data.user.phone_number,
            //         created_at: response.data.user.created_at,
            //         role: response.data.user.role
            //     }
            // }));

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
                phone_number: "",
                created_at: new Date(),
                role: "DISPLACED"
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
                phone_number: "",
                created_at: new Date(),
                role: "DISPLACED"
            },
            error: error.response?.data?.error || "حدث خطأ في تسجيل الدخول"
        };
    }
}
