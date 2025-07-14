import { ACCOMMODATION_TYPE, AGES, FAMILY_STATUS_TYPE, GENDER, SOCIAL_STATUS, } from "../../common-types/index.type";

export interface DisplacedProfileResponse {
    status: number;
    message?: string;
    user: DisplacedProfile;
    error?: string;
}

export interface DisplacedProfile {
    id: number
    name: string
    gender: GENDER
    profile_image: string
    identity: string
    nationality: string
    original_address: string
    phone_number: string
    alternative_phone_number?: string

    wives: {
        name: string
        identity: string
        nationality: string
        is_pregnant: boolean
        is_wet_nurse: boolean
    }[]

    socialStatus: {
        status: SOCIAL_STATUS
        number_of_wives: number
        number_of_males: number
        number_of_females: number
        total_family_members: number
        age_groups: Record<AGES, number>

    }

    displacement: {
        tent_number: string
        tent_type: ACCOMMODATION_TYPE

        family_status_type: FAMILY_STATUS_TYPE
        displacement_date: string

        delegate_name: string
        delegate_phone: string

        camp_manager: string
        camp_managerPhone: string
    }


    war_injuries: {
        name: string
        injury: string
    }[]

    martyrs: {
        name: string
    }[]

    medical_conditions: {
        name: string
        condition: string
    }[]

    additional_notes: string
}