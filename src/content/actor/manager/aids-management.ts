import { CalendarCheck, Activity, History, Shirt, BookOpen } from 'lucide-react';
import { DollarSign, Utensils, HeartPulse, SprayCan, Package } from 'lucide-react';

export const GET_AIDS_MANAGEMENT_TABS = {
    PREVIOUS_AIDS: { label: 'السابقة', icon: History },
    ONGOING_AIDS: { label: 'الجارية', icon: Activity },
    COMING_AIDS: { label: 'القادمة', icon: CalendarCheck },
} as const;

export enum TYPE_AIDS {
    ALL_AIDS = 'كل المساعدات',
    FINANCIAL_AID = 'مساعدة ماليّة',
    FOOD_AID = 'مساعدة غذائية',
    MEDICAL_AID = 'مساعدة صحية',
    CLEANING_AID = 'مساعدة تنظيفة ',
    CLOTHING_AIDS = 'مساعدة ملابس ',
    EDUCATIONAL_AID = 'مساعدة تعليمية ',
    OTHER_AID = 'مساعدات أخرى ',
}

export const GET_AIDS_TYPE_ICONS = {
    [TYPE_AIDS.ALL_AIDS]: Package, // Added for completeness
    [TYPE_AIDS.FINANCIAL_AID]: DollarSign,
    [TYPE_AIDS.FOOD_AID]: Utensils,
    [TYPE_AIDS.MEDICAL_AID]: HeartPulse,
    [TYPE_AIDS.CLEANING_AID]: SprayCan,
    [TYPE_AIDS.CLOTHING_AIDS]: Shirt, // Added for clothing aids
    [TYPE_AIDS.EDUCATIONAL_AID]: BookOpen, // Added for educational aids
    [TYPE_AIDS.OTHER_AID]: Package,
} as const;

export enum TYPE_GROUP_AIDS {
    PREVIOUS_AIDS = 'PREVIOUS_AIDS',
    ONGOING_AIDS = 'ONGOING_AIDS',
    COMING_AIDS = 'COMING_AIDS',
}