import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form"

export interface ISecurity {
    id: number;
    name: string;
    gender: GENDER
    identity: string;
    mobileNumber: string
    socialStatus: MATERIAL_STATUS
    job: "SECURITY" | "SECURITY_OFFICER"
    role: "SECURITY"
}

export interface ISecurityResponse {
    status: string;
    message?: string;
    security: ISecurity;
    error?: string;
}

export interface ISecuritiesResponse {
    status: string;
    message?: string;
    securities: ISecurity[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface ISecurityIDsResponse {
    status: string;
    message: string;
    securityIds: number[];
    error?: string;
}

