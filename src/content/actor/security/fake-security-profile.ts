import { ISecurityResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { GENDER, MATERIAL_STATUS } from "../delegate/profile-form";

import { ISecurityProfile, ISecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";

export const fakeSecurityProfiles: ISecurityProfile[] = [
    {
        id: 1,
        name: "محمد عادل",
        profileImage: "/images/security/1.jpg",
        gender: GENDER.MALE,
        identity: "405100001",
        nationality: "فلسطيني",
        education: "ثانوية عامة",
        mobileNumber: "0599000001",
        alternativeMobileNumber: "0569000001",
        originalAddress: "غزة - الرمال",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 2,
        name: "آية رامي",
        profileImage: "/images/security/2.jpg",
        gender: GENDER.FEMALE,
        identity: "405100002",
        nationality: "فلسطينية",
        education: "بكالوريوس تربية",
        mobileNumber: "0599000002",
        alternativeMobileNumber: "0569000002",
        originalAddress: "خان يونس - الشرقية",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 3,
        name: "أحمد نبيل",
        profileImage: "/images/security/3.jpg",
        gender: GENDER.MALE,
        identity: "405100003",
        nationality: "فلسطيني",
        education: "دبلوم حاسوب",
        mobileNumber: "0599000003",
        alternativeMobileNumber: "0569000003",
        originalAddress: "رفح - تل السلطان",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 4,
        name: "سارة عيسى",
        profileImage: "/images/security/4.jpg",
        gender: GENDER.FEMALE,
        identity: "405100004",
        nationality: "فلسطينية",
        education: "ثانوية عامة",
        mobileNumber: "0599000004",
        alternativeMobileNumber: "0569000004",
        originalAddress: "غزة - الشاطئ",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 5,
        name: "جهاد عماد",
        profileImage: "/images/security/5.jpg",
        gender: GENDER.MALE,
        identity: "405100005",
        nationality: "فلسطيني",
        education: "بكالوريوس حقوق",
        mobileNumber: "0599000005",
        alternativeMobileNumber: "0569000005",
        originalAddress: "جباليا - البلد",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 6,
        name: "رهف حسين",
        profileImage: "/images/security/6.jpg",
        gender: GENDER.FEMALE,
        identity: "405100006",
        nationality: "فلسطينية",
        education: "دبلوم تمريض",
        mobileNumber: "0599000006",
        alternativeMobileNumber: "0569000006",
        originalAddress: "دير البلح - الوسطى",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 7,
        name: "باسل وائل",
        profileImage: "/images/security/7.jpg",
        gender: GENDER.MALE,
        identity: "405100007",
        nationality: "فلسطيني",
        education: "بكالوريوس إدارة",
        mobileNumber: "0599000007",
        alternativeMobileNumber: "0569000007",
        originalAddress: "النصيرات - السوق",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 8,
        name: "هناء فايز",
        profileImage: "/images/security/8.jpg",
        gender: GENDER.FEMALE,
        identity: "405100008",
        nationality: "فلسطينية",
        education: "ماجستير علم نفس",
        mobileNumber: "0599000008",
        alternativeMobileNumber: "0569000008",
        originalAddress: "غزة - الزيتون",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 9,
        name: "رامي يوسف",
        profileImage: "/images/security/9.jpg",
        gender: GENDER.MALE,
        identity: "405100009",
        nationality: "فلسطيني",
        education: "دبلوم كهرباء",
        mobileNumber: "0599000009",
        alternativeMobileNumber: "0569000009",
        originalAddress: "بيت حانون - الصفطاوي",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 10,
        name: "إيمان سامي",
        profileImage: "/images/security/10.jpg",
        gender: GENDER.FEMALE,
        identity: "405100010",
        nationality: "فلسطينية",
        education: "ثانوية عامة",
        mobileNumber: "0599000010",
        alternativeMobileNumber: "0569000010",
        originalAddress: "خانيونس - المعسكر",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 11,
        name: "عبدالله صالح",
        profileImage: "/images/security/11.jpg",
        gender: GENDER.MALE,
        identity: "405100011",
        nationality: "فلسطيني",
        education: "بكالوريوس شريعة",
        mobileNumber: "0599000011",
        alternativeMobileNumber: "0569000011",
        originalAddress: "الزوايدة - المخيم",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 12,
        name: "منار خالد",
        profileImage: "/images/security/12.jpg",
        gender: GENDER.FEMALE,
        identity: "405100012",
        nationality: "فلسطينية",
        education: "بكالوريوس لغة عربية",
        mobileNumber: "0599000012",
        alternativeMobileNumber: "0569000012",
        originalAddress: "دير البلح - البركة",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 13,
        name: "علي نضال",
        profileImage: "/images/security/13.jpg",
        gender: GENDER.MALE,
        identity: "405100013",
        nationality: "فلسطيني",
        education: "ماجستير قانون",
        mobileNumber: "0599000013",
        alternativeMobileNumber: "0569000013",
        originalAddress: "رفح - الشابورة",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 14,
        name: "نوران علاء",
        profileImage: "/images/security/14.jpg",
        gender: GENDER.FEMALE,
        identity: "405100014",
        nationality: "فلسطينية",
        education: "بكالوريوس هندسة",
        mobileNumber: "0599000014",
        alternativeMobileNumber: "0569000014",
        originalAddress: "جباليا - المشروع",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 15,
        name: "خالد منصور",
        profileImage: "/images/security/15.jpg",
        gender: GENDER.MALE,
        identity: "405100015",
        nationality: "فلسطيني",
        education: "ثانوية عامة",
        mobileNumber: "0599000015",
        alternativeMobileNumber: "0569000015",
        originalAddress: "غزة - التفاح",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 16,
        name: "نرمين وديع",
        profileImage: "/images/security/16.jpg",
        gender: GENDER.FEMALE,
        identity: "405100016",
        nationality: "فلسطينية",
        education: "ماجستير إعلام",
        mobileNumber: "0599000016",
        alternativeMobileNumber: "0569000016",
        originalAddress: "بيت لاهيا - المزرعة",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 17,
        name: "سليم عمر",
        profileImage: "/images/security/17.jpg",
        gender: GENDER.MALE,
        identity: "405100017",
        nationality: "فلسطيني",
        education: "دبلوم محاسبة",
        mobileNumber: "0599000017",
        alternativeMobileNumber: "0569000017",
        originalAddress: "غزة - الصبرة",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 18,
        name: "أمل عدنان",
        profileImage: "/images/security/18.jpg",
        gender: GENDER.FEMALE,
        identity: "405100018",
        nationality: "فلسطينية",
        education: "بكالوريوس اقتصاد",
        mobileNumber: "0599000018",
        alternativeMobileNumber: "0569000018",
        originalAddress: "خانيونس - البلد",
        socialStatus: MATERIAL_STATUS.SINGLE,
        rank: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 19,
        name: "حسام زيد",
        profileImage: "/images/security/19.jpg",
        gender: GENDER.MALE,
        identity: "405100019",
        nationality: "فلسطيني",
        education: "ثانوية عامة",
        mobileNumber: "0599000019",
        alternativeMobileNumber: "0569000019",
        originalAddress: "النصيرات - وسط المخيم",
        socialStatus: MATERIAL_STATUS.MARRIED,
        rank: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 20,
        name: "دعاء حسين",
        profileImage: "/images/security/20.jpg",
        gender: GENDER.FEMALE,
        identity: "405100020",
        nationality: "فلسطينية",
        education: "بكالوريوس إعلام",
        mobileNumber: "0599000020",
        alternativeMobileNumber: "0569000020",
        originalAddress: "دير البلح - الشارع العام",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        rank: "SECURITY",
        role: "SECURITY"
    }
];

export const fakeSecurityProfileResponse = ({
    security_Id,
}: {
    security_Id: number;
}): ISecurityProfileResponse => {
    const securityProfile = fakeSecurityProfiles.find((user) => user.id === security_Id);

    if (!securityProfile) {
        return {
            status: "404",
            message: "فرد الأمن غير موجود",
            user: {} as ISecurityProfile,
            error: "Security member not found",
        };
    }

    return {
        status: "200",
        message: "تم جلب بيانات فرد الأمن بنجاح",
        user: securityProfile,
    };
};


// export const fakeSecuritiesResponse = ({
//     page = 1,
//     limit = 10,
// }: {
//     page?: number;
//     limit?: number;
// }): ISecuritiesResponse => {
//     const start = (page - 1) * limit;
//     const end = start + limit;

//     const paginatedSecurities = fakeSecurities.slice(start, end);
//     const totalItems = fakeSecurities.length;
//     const totalPages = Math.ceil(totalItems / limit);

//     return {
//         status: "200",
//         message: "تم جلب بيانات أفراد الأمن بنجاح",
//         securities: paginatedSecurities,
//         pagination: {
//             page,
//             limit,
//             totalItems,
//             totalPages,
//         },
//     };
// };

