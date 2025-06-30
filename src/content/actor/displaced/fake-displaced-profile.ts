import { DisplacedProfile, DisplacedProfileResponse } from "@/@types/actors/displaced/profile/displacedProfileResponse.type";
import { ACCOMMODATION_TYPE, AGES, CASE_TYPE } from "./filter";
import { GENDER, MATERIAL_STATUS } from "../delegate/profile-form";


export const fakeDisplacedProfile: DisplacedProfile = {
    id: 1,
    name: 'سعيد يوسف',
    gender: GENDER.MALE,
    profileImage: 'https://example.com/image.jpg',
    nationalId: '123456789',
    nationality: 'فلسطيني',
    originalAddress: 'غزة - الشجاعية',

    wives: [
        {
            name: 'هبة سعيد',
            nationalId: '987654321',
            nationality: 'فلسطيني',
            isPregnant: true,
            isWetNurse: false,
        },
        {
            name: 'رنا يوسف',
            nationalId: '456789123',
            nationality: 'فلسطيني',
            isPregnant: false,
            isWetNurse: true,
        },
    ],

    socialStatus: {
        status: MATERIAL_STATUS.MARRIED,
        numberOfWives: 2,
        numberOfMales: 4,
        numberOfFemales: 3,
        totalFamilyMembers: 9,
        ageGroups: {
            [AGES.less_than_6_month]: 1,
            [AGES.from_6_month_to_2_years]: 1,
            [AGES.from_2_years_to_6_years]: 2,
            [AGES.from_6_years_to_12_years]: 1,
            [AGES.from_12_years_to_18_years]: 2,
            [AGES.more_than_18]: 2,
        },
    },

    displacement: {
        tentNumber: 'خيمة-113',
        tentType: ACCOMMODATION_TYPE.indoor_tent,
        CaseType: CASE_TYPE.difficult,
        displacementDate: '2023-10-01',
        delegateName: 'خالد عبد الله',
        delegatePhone: '0599999999',
        campManager: 'محمود ناصر',
        campManagerPhone: '0598888888',
    },

    warInjuries: [
        {
            name: 'سعيد يوسف',
            injury: 'إصابة في اليد اليسرى',
        },
    ],

    martyrs: [
        {
            name: 'ياسر يوسف',
        },
    ],

    medicalConditions: [
        {
            name: 'هبة سعيد',
            condition: 'ضغط الدم',
        },
        {
            name: 'رنا يوسف',
            condition: 'سكري',
        },
    ],

    additionalNotes: 'العائلة بحاجة إلى حليب أطفال وأدوية مزمنة.',
}






export const fakeDisplacedProfileResponse = ({ displaced_ID }: { displaced_ID: number }): DisplacedProfileResponse => {

    const displacedProfile = fakeDisplacedProfile

    if (!displacedProfile) {
        return {
            status: '404',
            message: 'النازح غير موجود',
            user: {} as DisplacedProfile,
            error: 'Delegate not found',
        };
    }

    return {
        status: '200',
        message: 'تم جلب بيانات الملف الشخصي بنجاح',
        user: displacedProfile,
        error: undefined,
    };
};