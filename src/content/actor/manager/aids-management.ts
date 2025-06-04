import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
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

// Aid Management Tabs
export const GET_AIDS_MANAGEMENT_TABS = {
    PREVIOUS_AIDS: { label: 'السابقة', icon: History },
    ONGOING_AIDS: { label: 'الجارية', icon: Activity },
    COMING_AIDS: { label: 'القادمة', icon: CalendarCheck },
} as const;

// Aid Types
export enum TYPE_AIDS {
    FINANCIAL_AID = 'مساعدة ماليّة',
    FOOD_AID = 'مساعدة غذائية',
    MEDICAL_AID = 'مساعدة صحية',
    CLEANING_AID = 'مساعدة تنظيفة',
    CLOTHING_AIDS = 'مساعدة ملابس',
    EDUCATIONAL_AID = 'مساعدة تعليمية',
    OTHER_AID = 'مساعدات أخرى',
}

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
        isDefault: true,
        portion: 1,
    },
    {
        id: '4-6 أفراد',
        label: '4-6 أفراد',
        min: 4,
        max: 6,
        isDefault: true,
        portion: 2,
    },
    {
        id: '7-9 أفراد',
        label: '7-9 أفراد',
        min: 7,
        max: 9,
        isDefault: true,
        portion: 3,
    },
    {
        id: 'أكثر من 10 أفراد',
        label: 'أكثر من 10 أفراد',
        min: 10,
        max: null,
        isDefault: true,
        portion: 4,
    },
];