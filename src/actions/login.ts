"use server";
import loginResponse from "@/@types/loginResponse";


// RETURN FAKE DATA
export const login = async (formData: FormData): Promise<loginResponse> => {
    console.log("🚀 ~ login ~ formData:", formData)
    // {
    //     email: 'example@gmail.com',
    //     password: '123456asd',
    //     userType: 'DISPLACED'
    // }
    return await {
        userId: "123",
        username: "alasmar",
        status: "200",
        // error: "Failed to login"
    };
}




