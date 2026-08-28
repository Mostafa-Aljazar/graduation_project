import { AqsaGuestAPI } from "@/services";
import { USER_RANK, UserType } from "@/constants/userTypes";
import { loginResponse, User } from "@/@types/auth/loginResponse.type";

export interface loginProps {
    userType: UserType;
    password: string;
    email: string
}

export const login = async ({ email, password, userType }: loginProps): Promise<loginResponse> => {
    const roles: Record<UserType, "manager" | "delegate" | "displaced" | "security"> = {
        MANAGER: "manager",
        DELEGATE: "delegate",
        DISPLACED: "displaced",
        SECURITY: "security",
    };
    const role = roles[userType];

    try {
        const response = await AqsaGuestAPI.post("/auth/login", { email, password, role });

        if (response.data) {
            const apiUser = response.data.user;
            return {
                status: 200,
                message: "تم تسجيل الدخول بنجاح",
                token: response.data.token,
                user: {
                    id: apiUser.id,
                    name: apiUser.name,
                    email: apiUser.email,
                    identity: "",
                    phone_number: apiUser.phone || "",
                    created_at: new Date(apiUser.createdAt),
                    role: userType,
                    rank: USER_RANK[userType],
                    profile_image: "",
                },
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
