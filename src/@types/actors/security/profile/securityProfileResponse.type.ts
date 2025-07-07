import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form"

export interface ISecurityProfileResponse {
    status: string;
    message?: string;
    user: ISecurityProfile;
    error?: string;
}

export interface ISecurityProfile {
    id: number;
    name: string;
    profileImage: string
    gender: GENDER
    identity: string;
    nationality: string
    education: string
    mobileNumber: string
    alternativeMobileNumber: string
    originalAddress: string
    socialStatus: MATERIAL_STATUS
    rank: "SECURITY" | "SECURITY_OFFICER"
    role: "SECURITY"
}