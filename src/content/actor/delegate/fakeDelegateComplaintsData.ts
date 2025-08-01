import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import { DelegateComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';

export const fakeDelegateComplaintsData: DelegateComplaintResponse = {
    status: '200',
    message: 'تم جلب الشكاوى بنجاح',
    complaints: [
        {
            id: 1,
            date: '2024-10-20',
            time: '10:45 am',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'واجهت مشكلة عند استلام الفاتورة الشهرية، حيث كانت القيمة المطلوبة غير صحيحة.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 2,
            date: '2024-10-20',
            time: '10:30 am',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'تعديل الضمان',
            body: 'أطلب تعديل شروط الضمان للخدمة المقدمة بسبب تغييرات في متطلبات العميل.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 3,
            date: '2024-10-20',
            time: '10:20 am',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'تم استلام فاتورة تحتوي على أخطاء في الحسابات، مما تسبب في ارتباك أثناء التسوية.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 4,
            date: '2024-10-19',
            time: '10:00 am',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'تعديل الضمان',
            body: 'أرغب في تعديل شروط الضمان الخاص بالخدمة التي تلقيتها.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 5,
            date: '2024-10-19',
            time: '09:45 am',
            from: { id: 1003, name: 'سارة علي', image: 'https://example.com/images/sara.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'لاحظت وجود خطأ في الفاتورة الأخيرة، حيث تم إدراج عناصر لم يتم طلبها.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 6,
            date: '2024-10-19',
            time: '09:30 am',
            from: { id: 1004, name: 'محمود حسن', image: 'https://example.com/images/mahmoud.jpg' },
            title: 'تعديل الضمان',
            body: 'أطلب مراجعة وتعديل سياسة الضمان الحالية لتتوافق مع المتطلبات الجديدة.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 7,
            date: '2024-10-18',
            time: '03:15 pm',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'هناك مشكلة في الفاتورة المستلمة، حيث تم فرض رسوم إضافية دون إشعار مسبق.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 8,
            date: '2024-10-18',
            time: '02:30 pm',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'مشكلة في الخدمة',
            body: 'الخدمة المقدمة تحتوي على عيوب تؤثر على الأداء العام.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 9,
            date: '2024-10-18',
            time: '01:45 pm',
            from: { id: 1003, name: 'سارة علي', image: 'https://example.com/images/sara.jpg' },
            title: 'تأخير في التسليم',
            body: 'تم تأخير تسليم الخدمة المطلوبة لمدة أسبوع دون إشعار مسبق.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 10,
            date: '2024-10-17',
            time: '12:00 pm',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'مشكلة تقنية',
            body: 'هناك خلل تقني في النظام يؤثر على عملياتنا اليومية.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 11,
            date: '2024-10-17',
            time: '11:30 am',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'طلب استرداد',
            body: 'أطلب استرداد المبلغ المدفوع بسبب عدم مطابقة الخدمة.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 12,
            date: '2024-10-17',
            time: '10:45 am',
            from: { id: 1005, name: 'فاطمة زهراء', image: 'https://example.com/images/fatima.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'الفاتورة تحتوي على رسوم غير مبررة.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 13,
            date: '2024-10-16',
            time: '04:20 pm',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'طلب تحديث',
            body: 'أطلب تحديث الأنظمة لتتماشى مع المعايير الجديدة.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 14,
            date: '2024-10-16',
            time: '03:00 pm',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'مشكلة في العقد',
            body: 'هناك بند في العقد يحتاج إلى مراجعة بسبب عدم وضوحه.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 15,
            date: '2024-10-16',
            time: '02:15 pm',
            from: { id: 1003, name: 'سارة علي', image: 'https://example.com/images/sara.jpg' },
            title: 'تأخير في الخدمة',
            body: 'الخدمة المطلوبة تأخرت لمدة تزيد عن المتفق عليها.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 16,
            date: '2024-10-15',
            time: '01:00 pm',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'مشكلة تقنية',
            body: 'واجهت مشكلة تقنية في النظام تتطلب تدخلًا عاجلاً.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 17,
            date: '2024-10-15',
            time: '10:00 am',
            from: { id: 1002, name: 'خالد عبدالله', image: 'https://example.com/images/khaled.jpg' },
            title: 'طلب تعديل',
            body: 'أطلب تعديل بعض الشروط في الاتفاقية.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 18,
            date: '2024-10-15',
            time: '09:30 am',
            from: { id: 1004, name: 'محمود حسن', image: 'https://example.com/images/mahmoud.jpg' },
            title: 'مشكلة الفاتورة',
            body: 'الفاتورة تحتوي على أخطاء في التسعير.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 19,
            date: '2024-10-14',
            time: '09:00 am',
            from: { id: 1001, name: 'أحمد محمد', image: 'https://example.com/images/ahmed.jpg' },
            title: 'طلب صيانة',
            body: 'أطلب إرسال فريق صيانة لإصلاح عطل في المعدات.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 20,
            date: '2024-10-14',
            time: '08:45 am',
            from: { id: 1005, name: 'فاطمة زهراء', image: 'https://example.com/images/fatima.jpg' },
            title: 'مشكلة في الخدمة',
            body: 'الخدمة المقدمة لا تتوافق مع المواصفات المتفق عليها.',
            status: COMPLAINTS_STATUS.READ,
        },
    ],
    pagination: {
        page: 1,
        limit: 5,
        totalItems: 20,
        totalPages: 4,
    },
};
