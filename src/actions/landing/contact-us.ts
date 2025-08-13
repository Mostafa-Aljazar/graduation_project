import { AQSA_CAMP_EMAIL } from "@/constants/services";
import { sendEmail } from "@/utils/send-mail";

export interface sendEmailProps {
    name: string;
    email: string;
    phone_number: string;
    message: string;
}

export const sendEmailFun = async ({
    name, email, phone_number, message
}: sendEmailProps) => {

    const htmlContent = `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone_number}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    return await sendEmail({
        to: AQSA_CAMP_EMAIL,
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone_number}\nMessage: ${message}`,
        html: htmlContent,
    });
};