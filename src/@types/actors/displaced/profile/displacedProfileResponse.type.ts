import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form"
import { ACCOMMODATION_TYPE, AGES, CASE_TYPE } from "@/content/actor/displaced/filter"



export interface DisplacedProfileResponse {
    status: string;
    message?: string;
    user: DisplacedProfile;
    error?: string;
}

export interface DisplacedProfile {
    id: number
    name: string
    gender: GENDER
    profileImage: string
    nationalId: string
    nationality: string
    originalAddress: string

    wives: {
        name: string
        nationalId: string
        nationality: string
        isPregnant: boolean
        isWetNurse: boolean
    }[]

    socialStatus: {
        status: MATERIAL_STATUS
        numberOfWives: number
        numberOfMales: number
        numberOfFemales: number
        totalFamilyMembers: number
        ageGroups: Record<AGES, number>

    }

    displacement: {
        tentNumber: string
        tentType: ACCOMMODATION_TYPE
        CaseType: CASE_TYPE
        displacementDate: string

        delegateName: string
        delegatePhone: string
        campManager: string
        campManagerPhone: string
    }


    warInjuries: {
        name: string
        injury: string
    }[]

    martyrs: {
        name: string
    }[]

    medicalConditions: {
        name: string
        condition: string
    }[]

    additionalNotes: string
}