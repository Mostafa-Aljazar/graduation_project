import { ISecuritiesResponse, ISecurityData, ISecurityResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { GENDER, MATERIAL_STATUS } from "../delegate/profile-form";

export const fakeSecurities: ISecurityData[] = [
    {
        id: 1,
        name: "محمد عادل",
        gender: GENDER.MALE,
        profileImage: "/images/security/1.jpg",
        nationalId: "405100001",
        nationality: "فلسطيني",
        education: "ثانوية عامة",
        mobileNumber: "0599000001",
        alternativeMobileNumber: "0569000001",
        originalAddress: "غزة - الرمال",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 2,
        name: "آية رامي",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/2.jpg",
        nationalId: "405100002",
        nationality: "فلسطينية",
        education: "بكالوريوس تربية",
        mobileNumber: "0599000002",
        alternativeMobileNumber: "0569000002",
        originalAddress: "خان يونس - الشرقية",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY_OFFICER"
    },
    {
        id: 3,
        name: "أحمد نبيل",
        gender: GENDER.MALE,
        profileImage: "/images/security/3.jpg",
        nationalId: "405100003",
        nationality: "فلسطيني",
        education: "دبلوم حاسوب",
        mobileNumber: "0599000003",
        alternativeMobileNumber: "0569000003",
        originalAddress: "رفح - تل السلطان",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 4,
        name: "سارة عيسى",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/4.jpg",
        nationalId: "405100004",
        nationality: "فلسطينية",
        education: "ثانوية عامة",
        mobileNumber: "0599000004",
        alternativeMobileNumber: "0569000004",
        originalAddress: "غزة - الشاطئ",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 5,
        name: "جهاد عماد",
        gender: GENDER.MALE,
        profileImage: "/images/security/5.jpg",
        nationalId: "405100005",
        nationality: "فلسطيني",
        education: "بكالوريوس حقوق",
        mobileNumber: "0599000005",
        alternativeMobileNumber: "0569000005",
        originalAddress: "جباليا - البلد",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY_OFFICER"
    },
    {
        id: 6,
        name: "رهف حسين",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/6.jpg",
        nationalId: "405100006",
        nationality: "فلسطينية",
        education: "دبلوم تمريض",
        mobileNumber: "0599000006",
        alternativeMobileNumber: "0569000006",
        originalAddress: "دير البلح - الوسطى",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 7,
        name: "باسل وائل",
        gender: GENDER.MALE,
        profileImage: "/images/security/7.jpg",
        nationalId: "405100007",
        nationality: "فلسطيني",
        education: "بكالوريوس إدارة",
        mobileNumber: "0599000007",
        alternativeMobileNumber: "0569000007",
        originalAddress: "النصيرات - السوق",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 8,
        name: "هناء فايز",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/8.jpg",
        nationalId: "405100008",
        nationality: "فلسطينية",
        education: "ماجستير علم نفس",
        mobileNumber: "0599000008",
        alternativeMobileNumber: "0569000008",
        originalAddress: "غزة - الزيتون",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY_OFFICER"
    },
    {
        id: 9,
        name: "رامي يوسف",
        gender: GENDER.MALE,
        profileImage: "/images/security/9.jpg",
        nationalId: "405100009",
        nationality: "فلسطيني",
        education: "دبلوم كهرباء",
        mobileNumber: "0599000009",
        alternativeMobileNumber: "0569000009",
        originalAddress: "بيت حانون - الصفطاوي",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 10,
        name: "إيمان سامي",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/10.jpg",
        nationalId: "405100010",
        nationality: "فلسطينية",
        education: "ثانوية عامة",
        mobileNumber: "0599000010",
        alternativeMobileNumber: "0569000010",
        originalAddress: "خانيونس - المعسكر",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 11,
        name: "عبدالله صالح",
        gender: GENDER.MALE,
        profileImage: "/images/security/11.jpg",
        nationalId: "405100011",
        nationality: "فلسطيني",
        education: "بكالوريوس شريعة",
        mobileNumber: "0599000011",
        alternativeMobileNumber: "0569000011",
        originalAddress: "الزوايدة - المخيم",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 12,
        name: "منار خالد",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/12.jpg",
        nationalId: "405100012",
        nationality: "فلسطينية",
        education: "بكالوريوس لغة عربية",
        mobileNumber: "0599000012",
        alternativeMobileNumber: "0569000012",
        originalAddress: "دير البلح - البركة",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY_OFFICER"
    },
    {
        id: 13,
        name: "علي نضال",
        gender: GENDER.MALE,
        profileImage: "/images/security/13.jpg",
        nationalId: "405100013",
        nationality: "فلسطيني",
        education: "ماجستير قانون",
        mobileNumber: "0599000013",
        alternativeMobileNumber: "0569000013",
        originalAddress: "رفح - الشابورة",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 14,
        name: "نوران علاء",
        gender: GENDER.FEMALE,
        profileImage: "/images/security/14.jpg",
        nationalId: "405100014",
        nationality: "فلسطينية",
        education: "بكالوريوس هندسة",
        mobileNumber: "0599000014",
        alternativeMobileNumber: "0569000014",
        originalAddress: "جباليا - المشروع",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 15,
        name: "خالد منصور",
        gender: GENDER.MALE,
        profileImage: "/images/security/15.jpg",
        nationalId: "405100015",
        nationality: "فلسطيني",
        education: "ثانوية عامة",
        mobileNumber: "0599000015",
        alternativeMobileNumber: "0569000015",
        originalAddress: "غزة - التفاح",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY_OFFICER"
    },
];


export const fakeSecurityResponse = ({ security_Id }: { security_Id: number }): ISecurityResponse => {

    const securityProfile = fakeSecurities.find((user) => user.id == security_Id)

    if (!securityProfile) {
        return {
            status: '404',
            message: 'الامن غير موجود',
            user: {} as ISecurityData,
            error: 'Delegate not found',
        };
    }

    return {
        status: '200',
        message: 'تم جلب بيانات الملف الشخصي بنجاح',
        user: securityProfile,
        error: undefined,
    };
};


export const fakeSecuritiesResponse = (): ISecuritiesResponse => {

    return {
        status: '200',
        message: 'تم جلب بيانات افراد الامن بنجاح',
        users: fakeSecurities,
        error: undefined,
    };
};