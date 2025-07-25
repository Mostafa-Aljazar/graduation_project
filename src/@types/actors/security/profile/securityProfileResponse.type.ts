import { USER_RANK, USER_TYPE, UserRank, UserType } from '@/constants/userTypes';
import { GENDER, SOCIAL_STATUS } from "../../common-types/index.type";

export interface SecurityProfileResponse {
    status: number;
    message?: string;
    user: SecurityProfile;
    error?: string;
}

export interface SecurityProfile {
    id?: number; //HINT: optional in create security
    name: string;
    email: string
    profile_image: string
    gender: GENDER
    identity: string;
    nationality: string
    phone_number: string
    alternative_phone_number?: string
    social_status: SOCIAL_STATUS
    role: Exclude<
        UserType,
        typeof USER_TYPE.DISPLACED | typeof USER_TYPE.DELEGATE | typeof USER_TYPE.MANAGER>;
    rank: Exclude<
        UserRank,
        typeof USER_RANK.DISPLACED | typeof USER_TYPE.DELEGATE | typeof USER_TYPE.MANAGER>;
    additional_notes?: string
}

