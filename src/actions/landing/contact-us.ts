import { AQSA_CAMP_EMAIL } from "@/constants/services";
import { sendEmail } from "@/utils/send-mail";

// export const sendEmailFun = async () => {
//     const send = await sendEmail({
//         to: '233651@ppu.edu.ps',
//         subject: 'Hello',
//         text: 'Hello from my app!',
//         html: '<h1>Hello from my app!</h1>',
//     });
//     console.log('🚀 ~ sendEmailFun ~ send:', send);
// };


export type sendEmailProps = {
    message: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
}

export const sendEmailFun = async ({
    firstName, lastName, email, address, message
}: sendEmailProps) => {

    const htmlContent = `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    return await sendEmail({
        to: AQSA_CAMP_EMAIL,
        subject: `New Message from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nAddress: ${address}\nMessage: ${message}`,
        html: htmlContent,
    });
};