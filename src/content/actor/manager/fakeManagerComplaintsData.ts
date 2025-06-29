import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import { ManagerComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { USER_TYPE } from '@/constants/userTypes';

export const fakeManagerComplaintsData: ManagerComplaintResponse = {
    status: '200',
    message: 'تم جلب الشكاوى بنجاح',
    complaints: [
        {
            id: 1,
            date: '2024-10-20',
            time: '10:45 am',
            from: { id: 1001, name: 'توقيع السيد', image: 'https://example.com/images/touq.jpg' },
            sender_type: USER_TYPE.DISPLACED,
            title: 'مشكلة الفاتورة',
            body: 'واجهت مشكلة عند استلام الفاتورة الشهرية، حيث كانت القيمة المطلوبة غير صحيحة وتحتوي على رسوم إضافية غير مبررة. أرجو التحقق من هذا الأمر وتصحيح الفاتورة في أقرب وقت ممكن.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 2,
            date: '2024-10-20',
            time: '10:30 am',
            from: { id: 1002, name: 'فيصل الرميس', image: 'https://example.com/images/faisal.jpg' },
            sender_type: USER_TYPE.DELEGATE,
            delegate_id: 1, // Changed to number
            title: 'تعديل الضمان',
            body: 'أطلب تعديل شروط الضمان للخدمة المقدمة بسبب تغييرات في متطلبات العميل. الشروط الحالية غير كافية لتغطية الاحتياجات الجديدة، وأرجو مناقشة هذا الأمر مع الإدارة.',
            status: COMPLAINTS_STATUS.READ,
        },
        {
            id: 3,
            date: '2024-10-20',
            time: '10:20 am',
            from: { id: 1003, name: 'توقيع السيد', image: 'https://example.com/images/touq.jpg' },
            sender_type: USER_TYPE.SECURITY,
            title: 'مشكلة الفاتورة',
            body: 'تم استلام فاتورة تحتوي على أخطاء في الحسابات، مما تسبب في ارتباك أثناء التسوية. نرجو مراجعة الفاتورة وإرسال نسخة محدثة مع التوضيحات اللازمة.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 4,
            date: '2024-10-20',
            time: '10:00 am',
            from: { id: 1002, name: 'فيصل الرميس', image: 'https://example.com/images/faisal.jpg' },
            sender_type: USER_TYPE.DISPLACED,
            title: 'تعديل الضمان',
            body: 'أرغب في تعديل شروط الضمان الخاص بالخدمة التي تلقيتها، حيث إن الضمان الحالي لا يغطي بعض الحالات الطارئة التي قد تحدث. أرجو التواصل لمناقشة التفاصيل.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 5,
            date: '2024-10-20',
            time: '10:00 am',
            from: { id: 1004, name: 'توقيع السيد', image: 'https://example.com/images/touq.jpg' },
            sender_type: USER_TYPE.DELEGATE,
            delegate_id: 2, // Changed to number
            title: 'مشكلة الفاتورة',
            body: 'لاحظت وجود خطأ في الفاتورة الأخيرة، حيث تم إدراج عناصر لم يتم طلبها. أرجو تصحيح الفاتورة وإعادة إرسالها مع تأكيد التعديلات.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 6,
            date: '2024-10-20',
            time: '10:00 am',
            from: { id: 1005, name: 'فيصل الرميس', image: 'https://example.com/images/faisal.jpg' },
            sender_type: USER_TYPE.SECURITY_OFFICER,
            title: 'تعديل الضمان',
            body: 'أطلب مراجعة وتعديل سياسة الضمان الحالية لتتوافق مع المتطلبات الأمنية الجديدة. السياسة الحالية تحتاج إلى تحديث لضمان الأداء الأمثل.',
            status: COMPLAINTS_STATUS.PENDING,
        },
        {
            id: 7,
            date: '2024-10-20',
            time: '10:00 am',
            from: { id: 1001, name: 'توقيع السيد', image: 'https://example.com/images/touq.jpg' },
            sender_type: USER_TYPE.DISPLACED,
            title: 'مشكلة الفاتورة',
            body: 'هناك مشكلة في الفاتورة المستلمة، حيث تم فرض رسوم إضافية دون إشعار مسبق. أرجو التحقق من هذا الأمر وتقديم توضيح أو تصحيح الفاتورة.',
            status: COMPLAINTS_STATUS.READ,
        },
    ],
    pagination: {
        page: 1,
        limit: 5,
        totalItems: 7,
        totalPages: 2,
    },
};
