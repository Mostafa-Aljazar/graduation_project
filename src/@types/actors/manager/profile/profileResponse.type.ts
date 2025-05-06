// @/@types/manager/profileResponse.type.ts
import { StaticImageData } from "next/image";

export interface ProfileResponse {
    status: string;
    message?: string;
    user: ManagerProfile;
    error?: string;
}

export interface ManagerProfile {
    name: string;
    idNumber: number;
    gender: "male" | "female";
    maritalStatus: "single" | "married" | "divorced" | "widowed";
    nationality: string;
    email: string;
    birthDate: Date;
    mobileNumber: string;
    alternativeNumber?: string;
    avatar?: null | string | StaticImageData;
}