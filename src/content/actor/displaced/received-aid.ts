import { Gift, HandHeart } from "lucide-react";

export enum DISPLACED_RECEIVED_AIDS_TABS {
    RECEIVED_AIDS = 'RECEIVED_AIDS',
    PROVIDED_AIDS = 'PROVIDED_AIDS',
}

export const GET_DISPLACED_RECEIVED_AIDS_TABS = {
    [DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS]: {
        label: 'المساعدات المستلمة',
        icon: Gift, // ترمز لهدية أو شيء تم استلامه
    },
    [DISPLACED_RECEIVED_AIDS_TABS.PROVIDED_AIDS]: {
        label: 'المساعدات المقدّمة',
        icon: HandHeart, // ترمز لفعل العطاء أو التقديم
    },
} as const;
