import { TYPE_AIDS } from "@/@types/actors/common-types/index.type";
import {
    NotificationItem,
    NotificationsResponse,
    NotificationStatus
} from "@/@types/actors/general/notification/notificationResponse.type";
import { getNotificationsProps } from "@/actions/actors/general/notifications/getNotifications";
import { USER_TYPE } from "@/constants/userTypes";

export const fakeNotifications: NotificationItem[] = [
    {
        id: 1,
        dateTime: new Date(),
        title: "تم تسليم مساعدات غذائية",
        body: "تم تسليم مساعدات غذائية إلى العائلة رقم 5",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "add-aid", aid_type: TYPE_AIDS.FOOD_AID },
        from: { id: 101, name: "محمد صالح", role: "DELEGATE" }
    },
    {
        id: 2,
        dateTime: new Date("2025-08-14T10:30"),
        title: "تم تعديل بيانات المندوب",
        body: "قام المدير بتعديل بيانات المندوب رقم 101",
        status: NotificationStatus.READ,
        notification_type: { action: "edit" },
        from: { id: 201, name: "أحمد علي", role: "MANAGER" }
    },
    {
        id: 3,
        dateTime: new Date("2025-08-13T11:00"),
        title: "تم حذف شكوى",
        body: "تم حذف شكوى من المندوب",
        status: NotificationStatus.READ,
        notification_type: { action: "delete" },
        from: { id: 202, name: "سارة حسن", role: "MANAGER" }
    },
    {
        id: 4,
        dateTime: new Date("2025-08-02T10:45"),
        title: "تم تحديث موعد اجتماع",
        body: "تم تحديث موعد اجتماع فريق الدعم إلى 5 يوليو 2025",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "meeting" },
        from: { id: 301, name: "ليلى كمال", role: USER_TYPE.SECURITY }
    },
    {
        id: 5,
        dateTime: new Date("2025-08-02T13:20"),
        title: "تم إضافة مساعدات طبية",
        body: "تم تسليم مساعدات طبية للعائلة رقم 8",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "add-aid", aid_type: TYPE_AIDS.MEDICAL_AID },
        from: { id: 105, name: "رامي زيد", role: "DELEGATE" }
    },
    {
        id: 6,
        dateTime: new Date("2025-07-30T09:00"),
        title: "تم استدعاءك من الإدارة",
        body: "يرجى الحضور إلى مقر الإدارة الساعة 10 صباحًا",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "call" },
        from: { id: 206, name: "نور الدين", role: "MANAGER" }
    },
    {
        id: 7,
        dateTime: new Date("2025-07-03T11:45"),
        title: "تم تعديل بيانات المساعدة",
        body: "تم تعديل بيانات المساعدة للعائلة رقم 12",
        status: NotificationStatus.READ,
        notification_type: { action: "update" },
        from: { id: 103, name: "رنا يوسف", role: "DELEGATE" }
    },
    {
        id: 8,
        dateTime: new Date("2025-07-04T16:00"),
        title: "إشعار جديد من مسؤول الأمن",
        body: "يرجى مراجعة إشعار الأمان الخاص بمكان الإقامة",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "another-notification" },
        from: { id: 302, name: "فادي عمر", role: USER_TYPE.SECURITY }
    },
    {
        id: 9,
        dateTime: new Date("2025-07-04T18:30"),
        title: "تم إضافة مساعدات مالية",
        body: "تم تسليم مبلغ مالي لعائلة رقم 9",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "add-aid", aid_type: TYPE_AIDS.FINANCIAL_AID },
        from: { id: 104, name: "منى إبراهيم", role: "DELEGATE" }
    },
    {
        id: 10,
        dateTime: new Date("2025-07-05T08:15"),
        title: "تغيير المندوب المسؤول",
        body: "تم تغيير المندوب المسؤول عن العائلة رقم 7",
        status: NotificationStatus.READ,
        notification_type: { action: "change_delegate" },
        from: { id: 203, name: "عماد جابر", role: "MANAGER" }
    },
    {
        id: 11,
        dateTime: new Date("2025-07-05T09:30"),
        title: "إشعار جديد بخصوص الحالة الصحية",
        body: "يرجى التواصل مع الطبيب المشرف لتحديث البيانات",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "call" },
        from: { id: 303, name: "خالد سالم", role: USER_TYPE.SECURITY }
    },
    {
        id: 12,
        dateTime: new Date("2025-07-05T10:00"),
        title: "تم تعديل بيانات العائلة",
        body: "تم تعديل عدد أفراد العائلة رقم 11",
        status: NotificationStatus.READ,
        notification_type: { action: "edit" },
        from: { id: 102, name: "هند جمال", role: "DELEGATE" }
    },
    {
        id: 13,
        dateTime: new Date("2025-07-06T12:20"),
        title: "إشعار بحضور اجتماع أمني",
        body: "يرجى الحضور في تمام الساعة 2 مساءً",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "meeting" },
        from: { id: 304, name: "ياسر عبد", role: USER_TYPE.SECURITY }
    },
    {
        id: 14,
        dateTime: new Date("2025-07-06T13:45"),
        title: "تم حذف المساعدة المالية",
        body: "تم إلغاء مساعدة مالية لعائلة رقم 6",
        status: NotificationStatus.READ,
        notification_type: { action: "delete" },
        from: { id: 205, name: "ميساء نبيل", role: "MANAGER" }
    },
    {
        id: 15,
        dateTime: new Date("2025-07-06T15:30"),
        title: "تم تسليم مساعدات ملابس",
        body: "تم تسليم ملابس شتوية للعائلة رقم 10",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "add-aid", aid_type: TYPE_AIDS.CLOTHING_AIDS },
        from: { id: 106, name: "جهاد طارق", role: "DELEGATE" }
    },
    {
        id: 16,
        dateTime: new Date("2025-07-07T09:00"),
        title: "تم تحديث بيانات الهوية",
        body: "تم تحديث رقم الهوية للفرد رقم 15",
        status: NotificationStatus.READ,
        notification_type: { action: "update" },
        from: { id: 204, name: "لبنى فهد", role: "MANAGER" }
    },
    {
        id: 17,
        dateTime: new Date("2025-07-07T10:30"),
        title: "محادثة مطلوبة من الإدارة",
        body: "يرجى التواصل مع الإدارة بخصوص حالة العائلة",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "call" },
        from: { id: 207, name: "عادل نمر", role: "MANAGER" }
    },
    {
        id: 18,
        dateTime: new Date("2025-07-07T12:15"),
        title: "تم تعديل مساعدات غذائية",
        body: "تم تعديل الكمية المسلمة للعائلة رقم 2",
        status: NotificationStatus.READ,
        notification_type: { action: "edit" },
        from: { id: 107, name: "ربى علاء", role: "DELEGATE" }
    },
    {
        id: 19,
        dateTime: new Date("2025-07-08T11:00"),
        title: "إشعار من الأمن بخصوص الإخلاء",
        body: "يرجى مراجعة تفاصيل الإخلاء الفوري",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "another-notification" },
        from: { id: 305, name: "مروان صالح", role: USER_TYPE.SECURITY }
    },
    {
        id: 20,
        dateTime: new Date("2025-07-08T13:30"),
        title: "تم تسليم مساعدات نظافة",
        body: "تم تسليم مواد نظافة للعائلة رقم 14",
        status: NotificationStatus.UNREAD,
        notification_type: { action: "add-aid", aid_type: TYPE_AIDS.CLEANING_AID },
        from: { id: 108, name: "سهى ناصر", role: "DELEGATE" }
    }
];

export const fakeNotificationsResponse = ({
    page = 1,
    limit = 10
}: getNotificationsProps): NotificationsResponse => {
    const start = (page - 1) * limit;
    const end = page * limit;

    return {
        status: 200,
        message: "تم جلب الاشعارات بنجاح",
        notifications: fakeNotifications.slice(start, end),
        error: undefined,
        pagination: {
            page,
            limit,
            total_items: fakeNotifications.length,
            total_pages: Math.ceil(fakeNotifications.length / limit)
        }
    };
};
