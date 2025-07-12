
export enum WIFE_STATUS {
    pregnant = 'pregnant',
    wet_nurse = 'wet_nurse'
}

export const WIFE_STATUS_LABELS: Record<WIFE_STATUS, string> = {
    [WIFE_STATUS.pregnant]: 'حامل',
    [WIFE_STATUS.wet_nurse]: 'مرضعة',
};

export enum AGES {
    less_than_6_month = 'less_than_6_month',
    from_6_month_to_2_years = 'from_6_month_to_2_years',
    from_2_years_to_6_years = 'from_2_years_to_6_years',
    from_6_years_to_12_years = 'from_6_years_to_12_years',
    from_12_years_to_18_years = 'from_12_years_to_18_years',
    more_than_18 = 'more_than_18'
}

export const AGES_LABELS: Record<AGES, string> = {
    [AGES.less_than_6_month]: 'أقل من 6 أشهر',
    [AGES.from_6_month_to_2_years]: 'من 6 أشهر إلى سنتين',
    [AGES.from_2_years_to_6_years]: 'من سنتين إلى 6 سنوات',
    [AGES.from_6_years_to_12_years]: 'من 6 سنوات إلى 12 سنة',
    [AGES.from_12_years_to_18_years]: 'من 12 سنة إلى 18 سنة',
    [AGES.more_than_18]: 'أكثر من 18 سنة',
};

export enum ACCOMMODATION_TYPE {
    indoor_tent = 'indoor_tent',
    indoor_building = 'indoor_building',
    outdoor = 'outdoor',
}

export const ACCOMMODATION_TYPE_LABELS: Record<ACCOMMODATION_TYPE, string> = {
    [ACCOMMODATION_TYPE.indoor_tent]: 'خيمة داخلية',
    [ACCOMMODATION_TYPE.indoor_building]: 'مبنى داخلي',
    [ACCOMMODATION_TYPE.outdoor]: 'خارجي',
};

export enum CASE_TYPE {
    normal = 'normal',
    difficult = 'difficult',
    critical = 'critical',
}



export const CASE_TYPE_LABELS: Record<CASE_TYPE, string> = {
    [CASE_TYPE.normal]: 'عادي',
    [CASE_TYPE.difficult]: 'صعب',
    [CASE_TYPE.critical]: 'حرج',
};

export enum CHRONIC_DISEASE {
    false = 'false',
    true = 'true',
}

export const CHRONIC_DISEASE_LABELS: Record<CHRONIC_DISEASE, string> = {
    [CHRONIC_DISEASE.false]: 'لا يوجد',
    [CHRONIC_DISEASE.true]: 'يوجد',
};


export enum DESTINATION_DISPLACED {
    DISPLACEDS = 'DISPLACEDS',
    DISPLAY_AIDS = 'DISPLAY_AIDS',
    EDIT_AIDS = 'EDIT_AIDS',
    ADD_AIDS = 'ADD_AIDS',
}
