import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/profileResponse.type";
import { GENDER, MATERIAL_STATUS } from "./profile-form";

// // Assumed enums for GENDER and MATERIAL_STATUS
// enum GENDER {
//     MALE = 'MALE',
//     FEMALE = 'FEMALE',
//     OTHER = 'OTHER',
// }

// enum MATERIAL_STATUS {
//     SINGLE = 'SINGLE',
//     MARRIED = 'MARRIED',
//     DIVORCED = 'DIVORCED',
//     WIDOWED = 'WIDOWED',
// }

// Fake delegate profiles data, extending fakeDelegates
export const fakeDelegateProfiles: DelegateProfile[] = [
    {
        id: -1,
        name: 'بدون مندوب',
        idNumber: 999999999,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.SINGLE,
        nationality: 'غير محدد',
        email: 'no_delegate@example.com',
        age: 0,
        education: 'غير محدد',
        mobileNumber: '0595000000',
        alternativeNumber: undefined,
        avatar: null,
        numberOfResponsibleCamps: 0,
        numberOfFamilies: 0,
    },
    {
        id: 101,
        name: 'محمد صالح بن عبد',
        idNumber: 960128155,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.MARRIED,
        nationality: 'فلسطيني',
        email: 'mohammed.saleh@example.com',
        age: 35,
        education: 'بكالوريوس إدارة أعمال',
        mobileNumber: '0595867456',
        alternativeNumber: '0591234567',
        avatar: null,
        numberOfResponsibleCamps: 10,
        numberOfFamilies: 20,
    },
    {
        id: 102,
        name: 'علي خالد بن عمر',
        idNumber: 960128156,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.MARRIED,
        nationality: 'فلسطيني',
        email: 'ali.khalid@example.com',
        age: 40,
        education: 'دبلوم هندسة مدنية',
        mobileNumber: '0595867457',
        alternativeNumber: '0591234568',
        avatar: null,
        numberOfResponsibleCamps: 12,
        numberOfFamilies: 25,
    },
    {
        id: 103,
        name: 'فاطمة زيد بنت حسن',
        idNumber: 960128157,
        gender: GENDER.FEMALE,
        maritalStatus: MATERIAL_STATUS.SINGLE,
        nationality: 'فلسطيني',
        email: 'fatima.zeid@example.com',
        age: 28,
        education: 'بكالوريوس تربية',
        mobileNumber: '0595867458',
        alternativeNumber: undefined,
        avatar: null,
        numberOfResponsibleCamps: 8,
        numberOfFamilies: 18,
    },
    {
        id: 104,
        name: 'خالد يوسف بن سالم',
        idNumber: 960128158,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.DIVORCED,
        nationality: 'فلسطيني',
        email: 'khalid.yousuf@example.com',
        age: 45,
        education: 'ماجستير إدارة',
        mobileNumber: '0595867459',
        alternativeNumber: '0591234569',
        avatar: null,
        numberOfResponsibleCamps: 11,
        numberOfFamilies: 22,
    },
    {
        id: 105,
        name: 'سارة ناصر بنت أحمد',
        idNumber: 960128159,
        gender: GENDER.FEMALE,
        maritalStatus: MATERIAL_STATUS.MARRIED,
        nationality: 'فلسطيني',
        email: 'sarah.nasser@example.com',
        age: 32,
        education: 'بكالوريوس علوم',
        mobileNumber: '0595867460',
        alternativeNumber: undefined,
        avatar: null,
        numberOfResponsibleCamps: 9,
        numberOfFamilies: 19,
    },
    {
        id: 106,
        name: 'عمر زياد بن محمود',
        idNumber: 960128160,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.SINGLE,
        nationality: 'فلسطيني',
        email: 'omar.ziyad@example.com',
        age: 29,
        education: 'بكالوريوس تكنولوجيا معلومات',
        mobileNumber: '0595867461',
        alternativeNumber: '0591234570',
        avatar: null,
        numberOfResponsibleCamps: 13,
        numberOfFamilies: 26,
    },
    {
        id: 107,
        name: 'ليلى صبري بنت رامي',
        idNumber: 960128161,
        gender: GENDER.FEMALE,
        maritalStatus: MATERIAL_STATUS.WIDOWED,
        nationality: 'فلسطيني',
        email: 'layla.sabri@example.com',
        age: 38,
        education: 'دبلوم تمريض',
        mobileNumber: '0595867462',
        alternativeNumber: undefined,
        avatar: null,
        numberOfResponsibleCamps: 10,
        numberOfFamilies: 21,
    },
    {
        id: 108,
        name: 'ياسر حمد بن عبدالله',
        idNumber: 960128162,
        gender: GENDER.MALE,
        maritalStatus: MATERIAL_STATUS.MARRIED,
        nationality: 'فلسطيني',
        email: 'yasser.hamad@example.com',
        age: 42,
        education: 'بكالوريوس هندسة',
        mobileNumber: '0595867463',
        alternativeNumber: '0591234571',
        avatar: null,
        numberOfResponsibleCamps: 11,
        numberOfFamilies: 23,
    },
];


// Function to get a single delegate profile by ID
export const fakeDelegateProfileResponse = ({ delegate_ID }: { delegate_ID: number }): DelegateProfileResponse => {
    // console.log("🚀 ~ fakeDelegateProfileResponse ~ delegate_ID:", delegate_ID)
    // Input validation
    // if (!Number.isInteger(delegate_ID)) {
    //     return {
    //         status: '400',
    //         message: 'رقم المندوب غير صالح',
    //         user: {} as DelegateProfile,
    //         error: 'Invalid delegate ID',
    //     };
    // }

    // Find the delegate profile by ID
    const delegateProfile = fakeDelegateProfiles.find((profile) => profile.id == Number(delegate_ID));
    // console.log("🚀 ~ fakeDelegateProfileResponse ~ delegateProfile:", delegateProfile)

    // Handle case where delegate is not found
    if (!delegateProfile) {
        return {
            status: '404',
            message: 'المندوب غير موجود',
            user: {} as DelegateProfile,
            error: 'Delegate not found',
        };
    }

    // Return success response
    return {
        status: '200',
        message: 'تم جلب بيانات الملف الشخصي بنجاح',
        user: delegateProfile,
        error: undefined,
    };
};