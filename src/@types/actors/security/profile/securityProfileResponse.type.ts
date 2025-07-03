import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form"

export interface ISecurityResponse {
    status: string;
    message?: string;
    user: ISecurityData;
    error?: string;
}


export interface ISecuritiesResponse {
    status: string;
    message?: string;
    users: ISecurityData[];
    error?: string;
}

export interface ISecurityData {
    id: number
    name: string
    gender: GENDER
    profileImage: string
    nationalId: string
    nationality: string

    education: string
    mobileNumber: string
    alternativeMobileNumber: string
    originalAddress: string

    socialStatus: MATERIAL_STATUS
    job: "SECURITY"
    role: "SECURITY" | "SECURITY_OFFICER"
}