import { img_1, img_2, img_3 } from "@/assets/home";
import { Hospital, Smile, Tent, Users } from "lucide-react";


export const HERO_TITLE = 'رسالتُنا :';
export const HERO_DESCRIPTION = `نسعى لخلق الحياة لأناسٍ سُلبت منهم الحياة ، \n طفولة بريئة و عيون تبحث عن الأمل `;
export const HERO_IMAGES = [img_1, img_2, img_3];


export const Statistics_TITLE = 'رغم التحديات إلا أننا مستمرون لنصنع فارق';
export const Statistics_MESSAGE = ' اليوم، نعمل على تقديم مساعدات منقذة للحياة لألاف الأشخاص الذين يعيشون على حافة البقاء على قيد الحياة'


export const Statistics_Data = [
    { icon: Tent, value: '+5.2 K', label: 'خيم' },
    { icon: Smile, value: '+5.2 K', label: 'طفل' },
    { icon: Users, value: '+42.3 K', label: 'عائلة' },
    { icon: Hospital, value: '+1.2 K', label: 'مصابين' },
];
