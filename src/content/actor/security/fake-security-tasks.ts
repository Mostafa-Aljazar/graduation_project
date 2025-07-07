import { Task, TasksResponse } from "@/@types/actors/security/tasks/TasksResponse.type";
import { TASKS_TABS } from "./tasks";


export const FAKE_TASKS: Task[] = [
    {
        id: 1,
        dateTime: new Date("2025-07-01T08:00:00"),
        title: "جولة صباحية في المخيم",
        body: "تفقد النقاط الأمنية الرئيسية.",
        security_men: [101, 102],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 2,
        dateTime: new Date("2025-07-02T10:30:00"),
        title: "تأمين زيارة وفد خارجي",
        body: "مرافقة الوفد إلى مركز التدريب.",
        security_men: [103, 104],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 3,
        dateTime: new Date("2025-07-03T14:00:00"),
        title: "تثبيت كاميرا مراقبة",
        body: "تركيب كاميرا جديدة في الجهة الشرقية.",
        security_men: [105],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 4,
        dateTime: new Date("2025-07-04T16:00:00"),
        title: "مرافقة حافلة طلاب",
        body: "مرافقة أمنية لنقل الطلاب إلى خارج المخيم.",
        security_men: [106, 107],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 5,
        dateTime: new Date("2025-07-05T18:00:00"),
        title: "تأمين اجتماع لجنة الطوارئ",
        body: "التواجد أمام مركز الخدمات الصحية.",
        security_men: [108],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 6,
        dateTime: new Date("2025-07-06T20:30:00"),
        title: "مراقبة النشاط الليلي",
        body: "مراقبة التحركات في المنطقة الجنوبية.",
        security_men: [109],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 7,
        dateTime: new Date("2025-07-07T07:45:00"),
        title: "تحقق من الإنذارات",
        body: "مراجعة الإنذارات الأمنية في نقطة المراقبة رقم 3.",
        security_men: [110],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 8,
        dateTime: new Date("2025-07-08T09:15:00"),
        title: "صيانة نظام الإنذار",
        body: "إغلاق النظام مؤقتًا لإجراء الصيانة.",
        security_men: [111, 112],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 9,
        dateTime: new Date("2025-07-09T13:30:00"),
        title: "تنظيم دخول المساعدات",
        body: "التأكد من مطابقة القوائم والتفتيش.",
        security_men: [113],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 10,
        dateTime: new Date("2025-07-10T15:00:00"),
        title: "مرافقة حالات طبية",
        body: "نقل 3 حالات طبية إلى النقطة الطبية.",
        security_men: [114, 115],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 11,
        dateTime: new Date("2025-06-30T11:00:00"),
        title: "استجابة لشكوى ضوضاء",
        body: "التحقق من تجمع غير مصرح به.",
        security_men: [116],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 12,
        dateTime: new Date("2025-06-29T17:00:00"),
        title: "نقل مواد تموينية",
        body: "مرافقة شاحنة تموين من البوابة إلى المخزن.",
        security_men: [117],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 13,
        dateTime: new Date("2025-06-28T19:00:00"),
        title: "إغلاق مداخل ثانوية",
        body: "إغلاق البوابة الشرقية مؤقتًا لأعمال الصيانة.",
        security_men: [118],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 14,
        dateTime: new Date("2025-07-11T12:30:00"),
        title: "تأمين فعالية داخلية",
        body: "تأمين منطقة الفعالية في المركز الثقافي.",
        security_men: [119],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 15,
        dateTime: new Date("2025-07-12T21:00:00"),
        title: "دورية ليلية",
        body: "تفقد الجهة الشمالية للمخيم.",
        security_men: [120],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 16,
        dateTime: new Date("2025-07-13T10:00:00"),
        title: "مراجعة كاميرات المراقبة",
        body: "تحليل تسجيلات الليلة السابقة.",
        security_men: [121],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 17,
        dateTime: new Date("2025-07-14T18:45:00"),
        title: "تنظيم خروج السكان",
        body: "تنسيق الخروج بسبب أعمال صيانة عامة.",
        security_men: [122, 123],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 18,
        dateTime: new Date("2025-07-15T22:00:00"),
        title: "استعداد طارئ",
        body: "تجهيز أفراد الأمن لحالة طارئة محتملة.",
        security_men: [124],
        type: TASKS_TABS.UPCOMING_TASKS,
    },
    {
        id: 19,
        dateTime: new Date("2025-06-27T09:00:00"),
        title: "مراقبة بوابة المخيم",
        body: "تمت المراقبة بنجاح دون مخالفات.",
        security_men: [125],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
    {
        id: 20,
        dateTime: new Date("2025-06-26T08:30:00"),
        title: "نقل مستندات حساسة",
        body: "مرافقة أمنية لنقل مستندات إلى الإدارة.",
        security_men: [126, 127],
        type: TASKS_TABS.COMPLETED_TASKS,
    },
];


export const getFakeTasksResponse = ({
    page = 1,
    limit = 10,
}: {
    page?: number;
    limit?: number;
}): TasksResponse => {
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedTasks = FAKE_TASKS.slice(start, end);
    const totalItems = FAKE_TASKS.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        status: "200",
        message: "تم جلب المهام الأمنية بنجاح",
        tasks: paginatedTasks,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages,
        },
    };
};