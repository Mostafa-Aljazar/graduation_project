import { SecuritiesResponse, Security, SecurityIDsResponse, SecurityNamesResponse } from "@/@types/actors/general/security-data/securitiesDataResponse.types";
import { getSecurityDataProps } from "@/actions/actors/general/security-data/getSecurityData";

export const fakeSecurities: Security[] = [
    {
        id: 1,
        name: "محمد عادل",
        identity: "405100001",
        mobile_number: "0599000001",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 2,
        name: "آية رامي",
        identity: "405100002",
        mobile_number: "0599000002",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 3,
        name: "أحمد نبيل",
        identity: "405100003",
        mobile_number: "0599000003",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 4,
        name: "سارة عيسى",
        identity: "405100004",
        mobile_number: "0599000004",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 5,
        name: "جهاد عماد",
        identity: "405100005",
        mobile_number: "0599000005",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 6,
        name: "رهف حسين",
        identity: "405100006",
        mobile_number: "0599000006",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 7,
        name: "باسل وائل",
        identity: "405100007",
        mobile_number: "0599000007",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 8,
        name: "هناء فايز",
        identity: "405100008",
        mobile_number: "0599000008",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 9,
        name: "رامي يوسف",
        identity: "405100009",
        mobile_number: "0599000009",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 10,
        name: "إيمان سامي",
        identity: "405100010",
        mobile_number: "0599000010",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 11,
        name: "عبدالله صالح",
        identity: "405100011",
        mobile_number: "0599000011",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 12,
        name: "منار خالد",
        identity: "405100012",
        mobile_number: "0599000012",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 13,
        name: "علي نضال",
        identity: "405100013",
        mobile_number: "0599000013",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 14,
        name: "نوران علاء",
        identity: "405100014",
        mobile_number: "0599000014",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 15,
        name: "خالد منصور",
        identity: "405100015",
        mobile_number: "0599000015",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 16,
        name: "ليلى أحمد",
        identity: "405100016",
        mobile_number: "0599000016",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 17,
        name: "عصام فؤاد",
        identity: "405100017",
        mobile_number: "0599000017",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 18,
        name: "ياسمين خالد",
        identity: "405100018",
        mobile_number: "0599000018",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 19,
        name: "محمود سامي",
        identity: "405100019",
        mobile_number: "0599000019",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 20,
        name: "دعاء ناصر",
        identity: "405100020",
        mobile_number: "0599000020",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 21,
        name: "وائل نادر",
        identity: "405100021",
        mobile_number: "0599000021",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 22,
        name: "نورا حسن",
        identity: "405100022",
        mobile_number: "0599000022",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 23,
        name: "سامي عدنان",
        identity: "405100023",
        mobile_number: "0599000023",
        job: "SECURITY",
        role: "SECURITY"
    },
    {
        id: 24,
        name: "أروى خليل",
        identity: "405100024",
        mobile_number: "0599000024",
        job: "SECURITY_OFFICER",
        role: "SECURITY"
    },
    {
        id: 25,
        name: "زياد حسين",
        identity: "405100025",
        mobile_number: "0599000025",
        job: "SECURITY",
        role: "SECURITY"
    }
];


export const fakeSecuritiesResponse = ({ page = 1, limit = 10 }: getSecurityDataProps): SecuritiesResponse => {
    const paged = fakeSecurities.slice((page - 1) * limit, page * limit);
    return {
        status: 200,
        message: "تم جلب بيانات أفراد الأمن بنجاح",
        securities: paged,
        error: undefined,
        pagination: {
            page,
            limit,
            total_items: fakeSecurities.length,
            total_pages: Math.ceil(fakeSecurities.length / limit)
        }
    };
};

export const fakeSecuritiesIDsResponse = (): SecurityIDsResponse => {
    return {
        status: 200,
        message: "تم جلب معرفات أفراد الأمن بنجاح",
        security_Ids: fakeSecurities.map((s) => s.id),
        error: undefined
    };
};


export const fakeSecuritiesNamesResponse = ({ ids }: { ids?: number[]; }): SecurityNamesResponse => {
    const filtered = ids ? fakeSecurities.filter((s) => ids.includes(s.id)) : fakeSecurities;
    return {
        status: 200,
        message: "تم جلب أسماء أفراد الأمن بنجاح",
        security_names: filtered.map((s) => ({ id: s.id, name: s.name })),
        error: undefined
    };
};

// export const fakeSecuritiesByIdsResponse = ({ ids }: { ids: number[]; }): SecuritiesResponse => {
//     const filtered = fakeSecurities.filter((s) => ids.includes(s.id));
//     return {
//         status: 200,
//         message: "تم جلب بيانات أفراد الأمن بنجاح",
//         securities: filtered,
 
//     };
// };
