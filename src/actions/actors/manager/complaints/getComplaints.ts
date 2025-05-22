'use server';

import AqsaAPI from '@/services';
import { UserType } from '@/constants/userTypes';
import { ComplaintsResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';

type Props = {
    page?: number;
    limit?: number;
    status?: string | null;
    sender_type?: UserType | null;
    delegate_id?: string | null;
    date_range?: Date[] | null;
    search: string;
};

export const getComplaints = async ({
    page = 1,
    limit = 5,
    status = 'all',
    sender_type = null,
    delegate_id = null,
    date_range = null,
    search = ""
}: Props): Promise<ComplaintsResponse> => {

    //FIXME: remove this => just as  an example
    // Fake data for development
    const fakeData: ComplaintsResponse = {
        status: '200',
        message: 'تم جلب الشكاوى بنجاح',
        complaints: [
            {
                id: 1,
                date: '20/10/2024',
                time: '10:45 am',
                from: 'توقيع السيد',
                sender_type: 'DISPLACED',
                title: 'مشكلة الفاتورة',
                body: 'واجهت مشكلة عند استلام الفاتورة الشهرية، حيث كانت القيمة المطلوبة غير صحيحة وتحتوي على رسوم إضافية غير مبررة. أرجو التحقق من هذا الأمر وتصحيح الفاتورة في أقرب وقت ممكن.',
                status: 'read',
            },
            {
                id: 2,
                date: '20/10/2024',
                time: '10:30 am',
                from: 'فيصل الرميس',
                sender_type: 'DELEGATE',
                delegate_id: 'del_001',
                title: 'تعديل الضمان',
                body: 'أطلب تعديل شروط الضمان للخدمة المقدمة بسبب تغييرات في متطلبات العميل. الشروط الحالية غير كافية لتغطية الاحتياجات الجديدة، وأرجو مناقشة هذا الأمر مع الإدارة.',
                status: 'read',
            },
            {
                id: 3,
                date: '20/10/2024',
                time: '10:20 am',
                from: 'توقيع السيد',
                sender_type: 'SECURITY',
                title: 'مشكلة الفاتورة',
                body: 'تم استلام فاتورة تحتوي على أخطاء في الحسابات، مما تسبب في ارتباك أثناء التسوية. نرجو مراجعة الفاتورة وإرسال نسخة محدثة مع التوضيحات اللازمة.',
                status: 'pending',
            },
            {
                id: 4,
                date: '20/10/2024',
                time: '10:00 am',
                from: 'فيصل الرميس',
                sender_type: 'DISPLACED',
                title: 'تعديل الضمان',
                body: 'أرغب في تعديل شروط الضمان الخاص بالخدمة التي تلقيتها، حيث إن الضمان الحالي لا يغطي بعض الحالات الطارئة التي قد تحدث. أرجو التواصل لمناقشة التفاصيل.',
                status: 'pending',
            },
            {
                id: 5,
                date: '20/10/2024',
                time: '10:00 am',
                from: 'توقيع السيد',
                sender_type: 'DELEGATE',
                delegate_id: 'del_002',
                title: 'مشكلة الفاتورة',
                body: 'لاحظت وجود خطأ في الفاتورة الأخيرة، حيث تم إدراج عناصر لم يتم طلبها. أرجو تصحيح الفاتورة وإعادة إرسالها مع تأكيد التعديلات.',
                status: 'pending',
            },
            {
                id: 6,
                date: '20/10/2024',
                time: '10:00 am',
                from: 'فيصل الرميس',
                sender_type: 'SECURITY_OFFICER',
                title: 'تعديل الضمان',
                body: 'أطلب مراجعة وتعديل سياسة الضمان الحالية لتتوافق مع المتطلبات الأمنية الجديدة. السياسة الحالية تحتاج إلى تحديث لضمان الأداء الأمثل.',
                status: 'pending',
            },
            {
                id: 7,
                date: '20/10/2024',
                time: '10:00 am',
                from: 'توقيع السيد',
                sender_type: 'DISPLACED',
                title: 'مشكلة الفاتورة',
                body: 'هناك مشكلة في الفاتورة المستلمة، حيث تم فرض رسوم إضافية دون إشعار مسبق. أرجو التحقق من هذا الأمر وتقديم توضيح أو تصحيح الفاتورة.',
                status: 'read',
            },
        ],
        pagination: {
            page: 1,
            limit: 5,
            totalItems: 7,
            totalPages: 2,
        },
    };

    // Apply filters
    let filteredComplaints = fakeData.complaints;

    // Apply pagination
    const totalItems = filteredComplaints.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedComplaints = filteredComplaints.slice(
        (page - 1) * limit,
        page * limit
    );

    const fakeResponse: ComplaintsResponse = {
        ...fakeData,
        complaints: paginatedComplaints,
        pagination: { page, limit, totalItems, totalPages },
    };

    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 2000);
    });


    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    // Real implementation
    try {
        const params: Record<string, any> = { page, limit };
        if (status && status !== 'all') params.status = status;
        if (sender_type) params.sender_type = sender_type;
        if (delegate_id) params.delegate_id = delegate_id;
        // FIXME: unComment
        // if (date && date.length > 0) {
        //     params.date = date.map((d) => d.toISOString().split('T')[0]).join(',');
        // }

        const response = await AqsaAPI.get('/manager/complaints', { params });
        if (response.data?.complaints) {
            return {
                status: '200',
                message: 'تم جلب الشكاوى بنجاح',
                complaints: response.data.complaints,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    totalItems: response.data.complaints.length,
                    totalPages: Math.ceil(response.data.complaints.length / limit),
                },
            };
        }
        throw new Error('بيانات الشكاوى غير متوفرة');
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب الشكاوى';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            complaints: [],
            pagination: {
                page: 1,
                limit: 0,
                totalItems: 0,
                totalPages: 0,
            },
            error: errorMessage,
        };
    }
};