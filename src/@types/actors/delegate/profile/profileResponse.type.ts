// src/@types/actors/delegate/profileResponse.type.ts
import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form";
import { StaticImageData } from "next/image";

export interface DelegateProfileResponse {
    status: string;
    message?: string;
    user: DelegateProfile;
    error?: string;
}

export interface DelegateProfile {
    id: number;
    name: string;
    idNumber: number;
    gender: GENDER;
    maritalStatus: MATERIAL_STATUS;
    nationality: string;
    email: string;
    age: number;
    education: string;
    mobileNumber: string;
    alternativeNumber?: string;
    avatar?: null | string | StaticImageData;
    numberOfResponsibleCamps?: number; // Read-only, from backend
    numberOfFamilies?: number; // Read-only, from backend
    // responsibleCampGroup: string; // Removed
}