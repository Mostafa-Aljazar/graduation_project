import { DISPLACED_RECEIVED_AIDS_TABS, TYPE_AIDS } from "@/@types/actors/common-types/index.type";
import { DisplacedReceivedAid, DisplacedReceivedAidsResponse } from "@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type";
import { GetDisplacedReceivedAidsProps } from "@/actions/actors/displaced/received-aids/getDisplacedReceivedAids";

export const fakeDisplacedReceivedAids: DisplacedReceivedAid[] = [
    {
        id: 1,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "طرد غذائي شهري",
        aid_type: TYPE_AIDS.FOOD_AID,
        aid_content: "أرز، سكر، زيت، طحين",
        delivery_location: "مخيم النصيرات",
        delivery_date: new Date("2025-06-01"),
        receipt_date: new Date("2025-06-02"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 2,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "مساعدة مالية للأسر المحتاجة",
        aid_type: TYPE_AIDS.FINANCIAL_AID,
        aid_content: "400 شيكل",
        delivery_location: "خان يونس - مكتب الشؤون",
        delivery_date: new Date("2025-06-03"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 3,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "أدوية مزمنة",
        aid_type: TYPE_AIDS.MEDICAL_AID,
        aid_content: "دواء ضغط وسكر",
        delivery_location: "مستشفى الشفاء",
        delivery_date: new Date("2025-06-04"),
        receipt_date: new Date("2025-06-04"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 4,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "مواد تنظيف عامة",
        aid_type: TYPE_AIDS.CLEANING_AID,
        aid_content: "صابون، كلور، معقم",
        delivery_location: "جباليا - مركز التوزيع",
        delivery_date: new Date("2025-06-05"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 5,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "ملابس صيفية للأطفال",
        aid_type: TYPE_AIDS.CLOTHING_AIDS,
        aid_content: "قمصان، سراويل، أحذية",
        delivery_location: "مخيم البريج",
        delivery_date: new Date("2025-06-06"),
        receipt_date: new Date("2025-06-07"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 6,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "حقائب مدرسية",
        aid_type: TYPE_AIDS.EDUCATIONAL_AID,
        aid_content: "حقيبة، دفاتر، أقلام",
        delivery_location: "مدرسة العودة",
        delivery_date: new Date("2025-06-08"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 7,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "مساعدة نقدية",
        aid_type: TYPE_AIDS.FINANCIAL_AID,
        aid_content: "350 شيكل",
        delivery_location: "رفح - البلدية",
        delivery_date: new Date("2025-06-09"),
        receipt_date: new Date("2025-06-10"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 8,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "بطانيات ووسائد",
        aid_type: TYPE_AIDS.OTHER_AID,
        aid_content: "بطانيتان، وسادتان",
        delivery_location: "النصيرات - جمعية الرحمة",
        delivery_date: new Date("2025-06-11"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 9,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "ملابس شتوية",
        aid_type: TYPE_AIDS.CLOTHING_AIDS,
        aid_content: "جاكيت، كنزة، حذاء",
        delivery_location: "الشمال - السوق المركزي",
        delivery_date: new Date("2025-06-12"),
        receipt_date: new Date("2025-06-13"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 10,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "أجهزة لوحية للطلاب",
        aid_type: TYPE_AIDS.EDUCATIONAL_AID,
        aid_content: "جهاز لوحي مع اتصال إنترنت",
        delivery_location: "جامعة غزة",
        delivery_date: new Date("2025-06-14"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 11,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "سلة طعام رمضانية",
        aid_type: TYPE_AIDS.FOOD_AID,
        aid_content: "أرز، معكرونة، تمر",
        delivery_location: "مركز الإحسان",
        delivery_date: new Date("2025-06-15"),
        receipt_date: new Date("2025-06-16"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 12,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "منحة دراسية",
        aid_type: TYPE_AIDS.EDUCATIONAL_AID,
        aid_content: "دفع رسوم الترم الأول",
        delivery_location: "جامعة الأزهر",
        delivery_date: new Date("2025-06-17"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 13,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "منظفات منزلية",
        aid_type: TYPE_AIDS.CLEANING_AID,
        aid_content: "مسحوق غسيل، معقم، كلور",
        delivery_location: "مخيم الشاطئ",
        delivery_date: new Date("2025-06-18"),
        receipt_date: new Date("2025-06-19"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 14,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "خيام للمُهجرين",
        aid_type: TYPE_AIDS.OTHER_AID,
        aid_content: "خيمة، بطانية، فرشة",
        delivery_location: "خزاعة",
        delivery_date: new Date("2025-06-20"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 15,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "مساعدة غذائية طارئة",
        aid_type: TYPE_AIDS.FOOD_AID,
        aid_content: "علب فول، بسكويت، ماء",
        delivery_location: "رفح - الهلال الأحمر",
        delivery_date: new Date("2025-06-21"),
        receipt_date: new Date("2025-06-21"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 16,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "توفير أدوية نادرة",
        aid_type: TYPE_AIDS.MEDICAL_AID,
        aid_content: "دواء كيماوي",
        delivery_location: "مستشفى الأوروبي",
        delivery_date: new Date("2025-06-22"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
    {
        id: 17,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "ملابس رياضية",
        aid_type: TYPE_AIDS.CLOTHING_AIDS,
        aid_content: "تيشيرت، شورت، حذاء رياضي",
        delivery_location: "مركز شباب الرمال",
        delivery_date: new Date("2025-06-23"),
        receipt_date: new Date("2025-06-24"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 18,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "تمويل مشروع صغير",
        aid_type: TYPE_AIDS.FINANCIAL_AID,
        aid_content: "1000 شيكل",
        delivery_location: "غزة - بنك فلسطين",
        delivery_date: new Date("2025-06-25"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 19,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS,
        aid_name: "حقيبة مستلزمات مدرسية",
        aid_type: TYPE_AIDS.EDUCATIONAL_AID,
        aid_content: "حقيبة، دفاتر، أقلام",
        delivery_location: "مدرسة الكرامة",
        delivery_date: new Date("2025-06-26"),
        receipt_date: new Date("2025-06-26"),
        aid_giver: { giver_id: 1, name: "mostafa aljzar", role: "DELEGATE" },
    },
    {
        id: 20,
        tab_type: DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS,
        aid_name: "مساعدات منزلية",
        aid_type: TYPE_AIDS.OTHER_AID,
        aid_content: "ثلاجة، غاز صغير",
        delivery_location: "الزوايدة",
        delivery_date: new Date("2025-06-27"),
        aid_giver: { giver_id: 1, name: "مصطفى يوسف", role: "MANAGER" },
    },
];

export const fakeDisplacedReceivedAidsResponse = ({
    displaced_Id,
    page = 1,
    limit = 10,
    tab_type,
}: GetDisplacedReceivedAidsProps): DisplacedReceivedAidsResponse => {

    const displacedReceivedAids = fakeDisplacedReceivedAids

    if (!displacedReceivedAids) {
        return {
            status: 500,
            message: 'حدث خطأ أثناء جلب المساعدات',
            error: 'حدث خطأ أثناء جلب المساعدات',
            received_aids: [],
            pagination: { page: 1, limit: 0, total_items: 0, total_pages: 0 },
        };
    }

    const filtered = tab_type
        ? displacedReceivedAids.filter((aid) => aid.tab_type === tab_type)
        : displacedReceivedAids;

    const total_items = filtered.length;
    const total_pages = Math.ceil(total_items / limit);

    const paginatedAids = filtered.slice((page - 1) * limit, page * limit);

    const fakeResponse: DisplacedReceivedAidsResponse = {
        status: 200,
        received_aids: paginatedAids,
        pagination: { page, limit, total_items, total_pages },
    };


    return fakeResponse
};
