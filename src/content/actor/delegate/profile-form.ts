export enum MATERIAL_STATUS {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    DIVORCED = 'DIVORCED',
    WIDOWED = 'WIDOWED'
}

export const MATERIAL_STATUS_LABELS: Record<MATERIAL_STATUS, string> = {
    [MATERIAL_STATUS.SINGLE]: 'أعزب / عزباء',
    [MATERIAL_STATUS.MARRIED]: 'متزوج / متزوجة',
    [MATERIAL_STATUS.DIVORCED]: 'مطلق / مطلقة',
    [MATERIAL_STATUS.WIDOWED]: 'أرمل / أرملة',
};

export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export const GENDER_LABELS: Record<GENDER, string> = {
    [GENDER.MALE]: 'ذكر',
    [GENDER.FEMALE]: 'أنثى'
};