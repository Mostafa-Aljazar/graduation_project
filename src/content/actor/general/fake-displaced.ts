import { Displaced, DisplacedsIDsResponse, DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';


// Fake Displaced Data (22 Displaced)
export const fakeDisplaced: Displaced[] = [
    { id: 1, name: 'أحمد سمير', identity: 'DISP001', tent: 'TENT-A1', family_number: 5, mobile_number: '0599111001', delegate: { id: 101, name: 'محمد أحمد' } },
    { id: 2, name: 'نورا جمال', identity: 'DISP002', tent: 'TENT-A2', family_number: 3, mobile_number: '0599111002', delegate: { id: 101, name: 'محمد أحمد' } },
    { id: 3, name: 'ياسر عبدالله', identity: 'DISP003', tent: 'TENT-B1', family_number: 7, mobile_number: '0599111003', delegate: { id: 102, name: 'علي خالد' } },
    { id: 4, name: 'ليلى سعيد', identity: 'DISP004', tent: 'TENT-B2', family_number: 4, mobile_number: '0599111004', delegate: { id: 102, name: 'علي خالد' } },
    { id: 5, name: 'خديجة عمر', identity: 'DISP005', tent: 'TENT-C1', family_number: 6, mobile_number: '0599111005', delegate: { id: 103, name: 'فاطمة محمود' } },
    { id: 6, name: 'زيد مالك', identity: 'DISP006', tent: 'TENT-C2', family_number: 5, mobile_number: '0599111006', delegate: { id: 103, name: 'فاطمة محمود' } },
    { id: 7, name: 'ماجد حسين', identity: 'DISP007', tent: 'TENT-D1', family_number: 4, mobile_number: '0599111007', delegate: { id: 104, name: 'خالد يوسف' } },
    { id: 8, name: 'هناء فؤاد', identity: 'DISP008', tent: 'TENT-D2', family_number: 3, mobile_number: '0599111008', delegate: { id: 104, name: 'خالد يوسف' } },
    { id: 9, name: 'سميرة عادل', identity: 'DISP009', tent: 'TENT-E1', family_number: 6, mobile_number: '0599111009', delegate: { id: 105, name: 'سارة حسن' } },
    { id: 10, name: 'طارق رامي', identity: 'DISP010', tent: 'TENT-E2', family_number: 5, mobile_number: '0599111010', delegate: { id: 105, name: 'سارة حسن' } },
    { id: 11, name: 'منى خالد', identity: 'DISP011', tent: 'TENT-F1', family_number: 4, mobile_number: '0599111011', delegate: { id: 106, name: 'عمر زياد' } },
    { id: 12, name: 'رامي صبري', identity: 'DISP012', tent: 'TENT-F2', family_number: 6, mobile_number: '0599111012', delegate: { id: 106, name: 'عمر زياد' } },
    { id: 13, name: 'سلمى حمد', identity: 'DISP013', tent: 'TENT-G1', family_number: 5, mobile_number: '0599111013', delegate: { id: 107, name: 'ليلى صالح' } },
    { id: 14, name: 'عبدالله رائد', identity: 'DISP014', tent: 'TENT-G2', family_number: 3, mobile_number: '0599111014', delegate: { id: 107, name: 'ليلى صالح' } },
    { id: 15, name: 'نور حسام', identity: 'DISP015', tent: 'TENT-H1', family_number: 4, mobile_number: '0599111015', delegate: { id: 108, name: 'ياسر ناصر' } },
    { id: 16, name: 'مصطفى أمين', identity: 'DISP016', tent: 'TENT-H2', family_number: 5, mobile_number: '0599111016', delegate: { id: 108, name: 'ياسر ناصر' } },
    { id: 17, name: 'هدى سالم', identity: 'DISP017', tent: 'TENT-I1', family_number: 6, mobile_number: '0599111017', delegate: { id: 101, name: 'محمد أحمد' } },
    { id: 18, name: 'إبراهيم فادي', identity: 'DISP018', tent: 'TENT-I2', family_number: 4, mobile_number: '0599111018', delegate: { id: 102, name: 'علي خالد' } },
    { id: 19, name: 'آية طارق', identity: 'DISP019', tent: 'TENT-J1', family_number: 5, mobile_number: '0599111019', delegate: { id: 103, name: 'فاطمة محمود' } },
    { id: 20, name: 'عبدالرحمن زين', identity: 'DISP020', tent: 'TENT-J2', family_number: 3, mobile_number: '0599111020', delegate: { id: 104, name: 'خالد يوسف' } },
    { id: 21, name: 'مروة علي', identity: 'DISP021', tent: 'TENT-K1', family_number: 4, mobile_number: '0599111021', delegate: { id: 105, name: 'سارة حسن' } },
    { id: 22, name: 'خالد مراد', identity: 'DISP022', tent: 'TENT-K2', family_number: 6, mobile_number: '0599111022', delegate: { id: 106, name: 'عمر زياد' } },
]


interface fakeDisplacedProps {
    page?: number;
    limit?: number;
};

// Fake Delegates Data (9 Delegates)
export const fakeDisplacedResponse = ({ page = 1, limit = 10 }: fakeDisplacedProps): DisplacedsResponse => {
    return {
        status: '200',
        message: 'تم جلب بيانات النازحين بنجاح',
        displaceds: fakeDisplaced.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            totalItems: fakeDisplaced.length,
            totalPages: Math.ceil(fakeDisplaced.length / limit),
        }
    }
};


export const fakeDisplacedIDsResponse = (): DisplacedsIDsResponse => {
    return {
        status: '200',
        message: 'تم جلب بيانات النازحين بنجاح',
        displacedsIDs: fakeDisplaced.map(displaced => displaced.id),
        error: undefined,
    }
};