import {
    DollarSign,
    Utensils,
    HeartPulse,
    SprayCan,
    Shirt,
    BookOpen,
    Package,
    History,
    Activity,
    CalendarCheck,
} from 'lucide-react';
import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';

// Aid Management Tabs
export const GET_AIDS_MANAGEMENT_TABS = {
    PREVIOUS_AIDS: { label: 'السابقة', icon: History },
    ONGOING_AIDS: { label: 'الجارية', icon: Activity },
    COMING_AIDS: { label: 'القادمة', icon: CalendarCheck },
} as const;

// Aid Types

export enum TYPE_AIDS {
    FINANCIAL_AID = "FINANCIAL_AID",
    FOOD_AID = "FOOD_AID",
    MEDICAL_AID = "MEDICAL_AID",
    CLEANING_AID = "CLEANING_AID",
    CLOTHING_AIDS = "CLOTHING_AIDS",
    EDUCATIONAL_AID = "EDUCATIONAL_AID",
    OTHER_AID = "OTHER_AID",
}

export const TYPE_AIDS_LABELS: Record<TYPE_AIDS, string> = {
    [TYPE_AIDS.FINANCIAL_AID]: 'مساعدة ماليّة',
    [TYPE_AIDS.FOOD_AID]: 'مساعدة غذائية',
    [TYPE_AIDS.MEDICAL_AID]: 'مساعدة صحية',
    [TYPE_AIDS.CLEANING_AID]: 'مساعدة تنظيفة',
    [TYPE_AIDS.CLOTHING_AIDS]: 'مساعدة ملابس',
    [TYPE_AIDS.EDUCATIONAL_AID]: 'مساعدة تعليمية',
    [TYPE_AIDS.OTHER_AID]: 'مساعدات أخرى',
};

// Aid Type Icons
export const GET_AIDS_TYPE_ICONS = {
    [TYPE_AIDS.FINANCIAL_AID]: DollarSign,
    [TYPE_AIDS.FOOD_AID]: Utensils,
    [TYPE_AIDS.MEDICAL_AID]: HeartPulse,
    [TYPE_AIDS.CLEANING_AID]: SprayCan,
    [TYPE_AIDS.CLOTHING_AIDS]: Shirt,
    [TYPE_AIDS.EDUCATIONAL_AID]: BookOpen,
    [TYPE_AIDS.OTHER_AID]: Package,
} as const;

// Group Aid Types
export enum TYPE_GROUP_AIDS {
    PREVIOUS_AIDS = 'PREVIOUS_AIDS',
    ONGOING_AIDS = 'ONGOING_AIDS',
    COMING_AIDS = 'COMING_AIDS',
}

// Default Categories
export const DEFAULT_CATEGORIES: CategoryRangeType[] = [
    {
        id: '1-3 أفراد',
        label: '1-3 أفراد',
        min: 1,
        max: 3,
        is_default: true,
        portion: 1,
    },
    {
        id: '4-6 أفراد',
        label: '4-6 أفراد',
        min: 4,
        max: 6,
        is_default: true,
        portion: 2,
    },
    {
        id: '7-9 أفراد',
        label: '7-9 أفراد',
        min: 7,
        max: 9,
        is_default: true,
        portion: 3,
    },
    {
        id: 'أكثر من 10 أفراد',
        label: 'أكثر من 10 أفراد',
        min: 10,
        max: null,
        is_default: true,
        portion: 4,
    },
];



// DISTRIBUTION_MECHANISM
export enum DISTRIBUTION_MECHANISM {
    delegates_lists = "delegates_lists",
    displaced_families = "displaced_families"
}


// delegatesPortions
export enum DELEGATE_PORTIONS {
    equal = 'equal',
    manual = 'manual'
}


export enum QUANTITY_AVAILABILITY {
    limited = 'limited',
    unlimited = 'unlimited'
}

export enum DISTRIBUTION_METHOD {
    equal = 'equal',
    family_number = 'family_number'
}
