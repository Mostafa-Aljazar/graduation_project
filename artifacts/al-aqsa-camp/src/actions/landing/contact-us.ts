import { AqsaGuestAPI } from "@/services";

export interface sendEmailProps {
    name: string;
    email: string;
    phone_number: string;
    message: string;
}

export const sendEmailFun = async ({
    name, email, phone_number, message
}: sendEmailProps) => {
    return AqsaGuestAPI.post("/contact-requests", {
        name,
        email,
        phone: phone_number || undefined,
        message,
    });
};