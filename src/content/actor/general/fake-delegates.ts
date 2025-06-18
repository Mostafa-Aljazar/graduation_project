import { Delegate, DelegatesIDsResponse, DelegatesResponse, } from '@/@types/actors/general/delegates/delegatesResponse.type';


const fakeDelegates: Delegate[] = [
    { id: -1, name: "بدون مندوب", identity: 'ID123401', displaced_number: 50, family_number: 20, mobile_number: '0590000000', tents_number: 10 },
    { id: 101, name: 'محمد أحمد', identity: 'ID123401', displaced_number: 50, family_number: 20, mobile_number: '0599123401', tents_number: 10 },
    { id: 102, name: 'علي خالد', identity: 'ID123402', displaced_number: 60, family_number: 25, mobile_number: '0599123402', tents_number: 12 },
    { id: 103, name: 'فاطمة محمود', identity: 'ID123403', displaced_number: 45, family_number: 18, mobile_number: '0599123403', tents_number: 8 },
    { id: 104, name: 'خالد يوسف', identity: 'ID123404', displaced_number: 55, family_number: 22, mobile_number: '0599123404', tents_number: 11 },
    { id: 105, name: 'سارة حسن', identity: 'ID123405', displaced_number: 48, family_number: 19, mobile_number: '0599123405', tents_number: 9 },
    { id: 106, name: 'عمر زياد', identity: 'ID123406', displaced_number: 62, family_number: 26, mobile_number: '0599123406', tents_number: 13 },
    { id: 107, name: 'ليلى صالح', identity: 'ID123407', displaced_number: 53, family_number: 21, mobile_number: '0599123407', tents_number: 10 },
    { id: 108, name: 'ياسر ناصر', identity: 'ID123408', displaced_number: 57, family_number: 23, mobile_number: '0599123408', tents_number: 11 },
]

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

