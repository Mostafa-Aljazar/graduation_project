import { Displaced, DisplacedsIDsResponse, DisplacedsNamesResponse, DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';
import { getDisplacedsProps } from '@/actions/actors/general/displaceds/getDisplaceds';

export const fakeDisplaced: Displaced[] = [
    { id: 1, name: 'أحمد سمير بن محمد', identity: '960128163', tent: 'A001', family_number: 5, mobile_number: '0595867464', delegate: { id: 101, name: 'محمد صالح بن عبد' } },
    { id: 2, name: 'نورا جمال بنت عمر', identity: '960128164', tent: 'A002', family_number: 3, mobile_number: '0595867465', delegate: { id: 101, name: 'محمد صالح بن عبد' } },
    { id: 3, name: 'ياسر عبدالله بن خالد', identity: '960128165', tent: 'B107', family_number: 7, mobile_number: '0595867466', delegate: { id: 102, name: 'علي خالد بن عمر' } },
    { id: 4, name: 'ليلى سعيد بنت حسن', identity: '960128166', tent: 'B108', family_number: 4, mobile_number: '0595867467', delegate: { id: 102, name: 'علي خالد بن عمر' } },
    { id: 5, name: 'خديجة عمر بنت أحمد', identity: '960128167', tent: 'C385', family_number: 6, mobile_number: '0595867468', delegate: { id: 103, name: 'فاطمة زيد بنت حسن' } },
    { id: 6, name: 'زيد مالك بن يوسف', identity: '960128168', tent: 'C386', family_number: 5, mobile_number: '0595867469', delegate: { id: 103, name: 'فاطمة زيد بنت حسن' } },
    { id: 7, name: 'ماجد حسين بن سالم', identity: '960128169', tent: 'D001', family_number: 4, mobile_number: '0595867470', delegate: { id: 104, name: 'خالد يوسف بن سالم' } },
    { id: 8, name: 'هناء فؤاد بنت ناصر', identity: '960128170', tent: 'D002', family_number: 3, mobile_number: '0595867471', delegate: { id: 104, name: 'خالد يوسف بن سالم' } },
    { id: 9, name: 'سميرة عادل بنت زياد', identity: '960128171', tent: 'E101', family_number: 6, mobile_number: '0595867472', delegate: { id: 105, name: 'سارة ناصر بنت أحمد' } },
    { id: 10, name: 'طارق رامي بن صالح', identity: '960128172', tent: 'E102', family_number: 5, mobile_number: '0595867473', delegate: { id: 105, name: 'سارة ناصر بنت أحمد' } },
    { id: 11, name: 'منى خالد بنت عبدالله', identity: '960128173', tent: 'F201', family_number: 4, mobile_number: '0595867474', delegate: { id: 106, name: 'عمر زياد بن محمود' } },
    { id: 12, name: 'رامي صبري بن حمد', identity: '960128174', tent: 'F202', family_number: 6, mobile_number: '0595867475', delegate: { id: 106, name: 'عمر زياد بن محمود' } },
    { id: 13, name: 'سلمى حمد بنت ياسر', identity: '960128175', tent: 'G301', family_number: 5, mobile_number: '0595867476', delegate: { id: 107, name: 'ليلى صبري بنت رامي' } },
    { id: 14, name: 'عبدالله رائد بن عمر', identity: '960128176', tent: 'G302', family_number: 3, mobile_number: '0595867477', delegate: { id: 107, name: 'ليلى صبري بنت رامي' } },
    { id: 15, name: 'نور حسام بنت أحمد', identity: '960128177', tent: 'H401', family_number: 4, mobile_number: '0595867478', delegate: { id: 108, name: 'ياسر حمد بن عبدالله' } },
    { id: 16, name: 'مصطفى أمين بن خالد', identity: '960128178', tent: 'H402', family_number: 5, mobile_number: '0595867479', delegate: { id: 108, name: 'ياسر حمد بن عبدالله' } },
    { id: 17, name: 'هدى سالم بنت زيد', identity: '960128179', tent: 'I501', family_number: 6, mobile_number: '0595867480', delegate: { id: 101, name: 'محمد صالح بن عبد' } },
    { id: 18, name: 'إبراهيم فادي بن يوسف', identity: '960128180', tent: 'I502', family_number: 4, mobile_number: '0595867481', delegate: { id: 102, name: 'علي خالد بن عمر' } },
    { id: 19, name: 'آية طارق بنت ناصر', identity: '960128181', tent: 'J601', family_number: 5, mobile_number: '0595867482', delegate: { id: 103, name: 'فاطمة زيد بنت حسن' } },
    { id: 20, name: 'عبدالرحمن زين بن صالح', identity: '960128182', tent: 'J602', family_number: 3, mobile_number: '0595867483', delegate: { id: 104, name: 'خالد يوسف بن سالم' } },
    { id: 21, name: 'مروة علي بنت حمد', identity: '960128183', tent: 'K701', family_number: 4, mobile_number: '0595867484', delegate: { id: 105, name: 'سارة ناصر بنت أحمد' } },
    { id: 22, name: 'خالد مراد بن عبدالله', identity: '960128184', tent: 'K702', family_number: 6, mobile_number: '0595867485', delegate: { id: 106, name: 'عمر زياد بن محمود' } },
];

export const fakeDisplacedResponse = ({
    page = 1,
    limit = 10,
    search = '',
    filters,
}: getDisplacedsProps): DisplacedsResponse => {
    let filteredDisplaceds = fakeDisplaced;

    return {
        status: 200,
        message: 'تم جلب بيانات النازحين بنجاح',
        displaceds: filteredDisplaceds.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            total_items: filteredDisplaceds.length,
            total_pages: Math.ceil(filteredDisplaceds.length / limit),
        },
    };
};

export const fakeDisplacedIDsResponse = (): DisplacedsIDsResponse => {
    return {
        status: 200,
        message: 'تم جلب بيانات النازحين بنجاح',
        displaceds_Ids: fakeDisplaced.map((displaced) => displaced.id),
        error: undefined,
    };
};

export const fakeDisplacedsNamesResponse = ({ ids }: { ids?: number[]; }): DisplacedsNamesResponse => {
    const filtered = ids ? fakeDisplaced.filter((s) => ids.includes(s.id)) : fakeDisplaced;
    return {
        status: 200,
        message: "تم جلب أسماء النازحين بنجاح",
        displaceds_names: filtered.map((s) => ({ id: s.id, name: s.name })),
        error: undefined
    };
};

export const fakeDisplacedByIdsResponse = ({
    ids = [],
    page = 1,
    limit = 7,
}: {
    ids: number[];
    page?: number;
    limit?: number;
}): DisplacedsResponse => {
    const filteredDisplaceds = fakeDisplaced.filter((displaced) =>
        ids.includes(displaced.id)
    );

    return {
        status: 200,
        message: 'تم جلب بيانات النازحين بنجاح',
        displaceds: filteredDisplaceds.slice((page - 1) * limit, page * limit),
        error: undefined,
        pagination: {
            page,
            limit,
            total_items: filteredDisplaceds.length,
            total_pages: Math.ceil(filteredDisplaceds.length / limit),
        },
    };
};
