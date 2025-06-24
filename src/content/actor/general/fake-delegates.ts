import { Delegate, DelegatesIDsResponse, DelegatesResponse, } from '@/@types/actors/general/delegates/delegatesResponse.type';


export const fakeDelegates: Delegate[] = [
    { id: -1, name: 'بدون مندوب', identity: '999999999', displaced_number: 0, family_number: 0, mobile_number: '0595000000', tents_number: 0 },
    { id: 101, name: 'محمد صالح بن عبد', identity: '960128155', displaced_number: 50, family_number: 20, mobile_number: '0595867456', tents_number: 10 },
    { id: 102, name: 'علي خالد بن عمر', identity: '960128156', displaced_number: 60, family_number: 25, mobile_number: '0595867457', tents_number: 12 },
    { id: 103, name: 'فاطمة زيد بنت حسن', identity: '960128157', displaced_number: 45, family_number: 18, mobile_number: '0595867458', tents_number: 8 },
    { id: 104, name: 'خالد يوسف بن سالم', identity: '960128158', displaced_number: 55, family_number: 22, mobile_number: '0595867459', tents_number: 11 },
    { id: 105, name: 'سارة ناصر بنت أحمد', identity: '960128159', displaced_number: 48, family_number: 19, mobile_number: '0595867460', tents_number: 9 },
    { id: 106, name: 'عمر زياد بن محمود', identity: '960128160', displaced_number: 62, family_number: 26, mobile_number: '0595867461', tents_number: 13 },
    { id: 107, name: 'ليلى صبري بنت رامي', identity: '960128161', displaced_number: 53, family_number: 21, mobile_number: '0595867462', tents_number: 10 },
    { id: 108, name: 'ياسر حمد بن عبدالله', identity: '960128162', displaced_number: 57, family_number: 23, mobile_number: '0595867463', tents_number: 11 },
];

interface fakeDelegatesProps {
    page?: number;
    limit?: number;
};

// Fake Delegates Data (9 Delegates)
export const fakeDelegatesResponse = ({ page = 1, limit = 10 }: fakeDelegatesProps): DelegatesResponse => {
    return {
        status: '200',
        message: 'تم جلب بيانات المناديب بنجاح',
        delegates: fakeDelegates.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            totalItems: fakeDelegates.length,
            totalPages: Math.ceil(fakeDelegates.length / limit),
        }
    }
};

export const fakeDelegatesIDsResponse = (): DelegatesIDsResponse => {
    return {
        status: '200',
        message: 'تم جلب بيانات المناديب بنجاح',
        delegatesIDs: fakeDelegates.map(delegate => delegate.id),
        error: undefined,
    }
};

export const fakeDelegatesByIdsResponse = ({
    ids = [],
    page = 1,
    limit = 7,
}: {
    ids: number[];
    page?: number;
    limit?: number;
}): DelegatesResponse => {
    const filteredDelegates = fakeDelegates.filter((delegate) =>
        ids.includes(delegate.id)
    );

    return {
        status: '200',
        message: 'تم جلب بيانات المناديب بنجاح',
        delegates: filteredDelegates.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            totalItems: filteredDelegates.length,
            totalPages: Math.ceil(filteredDelegates.length / limit),
        },
    };
};