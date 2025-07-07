
import { ISecuritiesResponse, ISecurity, ISecurityIDsResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form";


export const fakeSecurities: ISecurity[] = [
    {
        id: 1,
        name: "محمد عادل",
        gender: GENDER.MALE,
        identity: "405100001",
        mobileNumber: "0599000001",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 2,
        name: "آية رامي",
        gender: GENDER.FEMALE,
        identity: "405100002",
        mobileNumber: "0599000002",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 3,
        name: "أحمد نبيل",
        gender: GENDER.MALE,
        identity: "405100003",
        mobileNumber: "0599000003",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 4,
        name: "سارة عيسى",
        gender: GENDER.FEMALE,
        identity: "405100004",
        mobileNumber: "0599000004",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 5,
        name: "جهاد عماد",
        gender: GENDER.MALE,
        identity: "405100005",
        mobileNumber: "0599000005",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 6,
        name: "رهف حسين",
        gender: GENDER.FEMALE,
        identity: "405100006",
        mobileNumber: "0599000006",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 7,
        name: "باسل وائل",
        gender: GENDER.MALE,
        identity: "405100007",
        mobileNumber: "0599000007",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 8,
        name: "هناء فايز",
        gender: GENDER.FEMALE,
        identity: "405100008",
        mobileNumber: "0599000008",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 9,
        name: "رامي يوسف",
        gender: GENDER.MALE,
        identity: "405100009",
        mobileNumber: "0599000009",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 10,
        name: "إيمان سامي",
        gender: GENDER.FEMALE,
        identity: "405100010",
        mobileNumber: "0599000010",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 11,
        name: "عبدالله صالح",
        gender: GENDER.MALE,
        identity: "405100011",
        mobileNumber: "0599000011",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 12,
        name: "منار خالد",
        gender: GENDER.FEMALE,
        identity: "405100012",
        mobileNumber: "0599000012",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 13,
        name: "علي نضال",
        gender: GENDER.MALE,
        identity: "405100013",
        mobileNumber: "0599000013",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 14,
        name: "نوران علاء",
        gender: GENDER.FEMALE,
        identity: "405100014",
        mobileNumber: "0599000014",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 15,
        name: "خالد منصور",
        gender: GENDER.MALE,
        identity: "405100015",
        mobileNumber: "0599000015",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 16,
        name: "ليلى أحمد",
        gender: GENDER.FEMALE,
        identity: "405100016",
        mobileNumber: "0599000016",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 17,
        name: "عصام فؤاد",
        gender: GENDER.MALE,
        identity: "405100017",
        mobileNumber: "0599000017",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 18,
        name: "ياسمين خالد",
        gender: GENDER.FEMALE,
        identity: "405100018",
        mobileNumber: "0599000018",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 19,
        name: "محمود سامي",
        gender: GENDER.MALE,
        identity: "405100019",
        mobileNumber: "0599000019",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 20,
        name: "دعاء ناصر",
        gender: GENDER.FEMALE,
        identity: "405100020",
        mobileNumber: "0599000020",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 21,
        name: "وائل نادر",
        gender: GENDER.MALE,
        identity: "405100021",
        mobileNumber: "0599000021",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 22,
        name: "نورا حسن",
        gender: GENDER.FEMALE,
        identity: "405100022",
        mobileNumber: "0599000022",
        socialStatus: MATERIAL_STATUS.WIDOWED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 23,
        name: "سامي عدنان",
        gender: GENDER.MALE,
        identity: "405100023",
        mobileNumber: "0599000023",
        socialStatus: MATERIAL_STATUS.MARRIED,
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 24,
        name: "أروى خليل",
        gender: GENDER.FEMALE,
        identity: "405100024",
        mobileNumber: "0599000024",
        socialStatus: MATERIAL_STATUS.SINGLE,
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 25,
        name: "زياد حسين",
        gender: GENDER.MALE,
        identity: "405100025",
        mobileNumber: "0599000025",
        socialStatus: MATERIAL_STATUS.DIVORCED,
        job: "SECURITY",
        role: "SECURITY"
    },
];



interface fakeSecuritiesProps {
    page?: number;
    limit?: number;
}

export const fakeSecuritiesResponse = ({ page = 1, limit = 10 }: fakeSecuritiesProps): ISecuritiesResponse => {
    return {
        status: "200",
        message: "تم جلب بيانات أفراد الأمن بنجاح",
        securities: fakeSecurities.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            totalItems: fakeSecurities.length,
            totalPages: Math.ceil(fakeSecurities.length / limit),
        },
    };
};

export const fakeSecuritiesIDsResponse = (): ISecurityIDsResponse => {
    return {
        status: "200",
        message: "تم جلب معرفات أفراد الأمن بنجاح",
        securityIds: fakeSecurities.map((s) => s.id),
        error: undefined,
    };
};

export const fakeSecuritiesByIdsResponse = ({ ids = [], page = 1, limit = 7 }: { ids: number[]; page?: number; limit?: number }): ISecuritiesResponse => {
    const filtered = fakeSecurities.filter((s) => ids.includes(s.id));
    return {
        status: "200",
        message: "تم جلب بيانات أفراد الأمن بنجاح",
        securities: filtered.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            totalItems: filtered.length,
            totalPages: Math.ceil(filtered.length / limit),
        },
    };
};
