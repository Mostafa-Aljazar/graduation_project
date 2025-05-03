import { BellRing, Newspaper, Speech, Handshake, User, Users, FileChartLine } from 'lucide-react';
import { DELEGATE_ROUTES } from "../../../constants/routes";


export const delegateNavLinks = [
    { label: 'الملف الشخصي', href: DELEGATE_ROUTES.PROFILE, icon: User },
    { label: 'الإشعارات', href: DELEGATE_ROUTES.NOTIFICATIONS, icon: BellRing },
    { label: 'بيانات النازحين', href: DELEGATE_ROUTES.ALL_DISPLACED, icon: Users },
    {
        label: 'إدارة المساعدات',
        href: DELEGATE_ROUTES.AIDS_MANAGEMENT,
        icon: Handshake,
    },
    { label: 'التقارير', href: DELEGATE_ROUTES.REPORTS, icon: FileChartLine },
    { label: 'الإعلانات', href: DELEGATE_ROUTES.ADS, icon: Newspaper },
    { label: 'الشكاوي', href: DELEGATE_ROUTES.COMPLAINTS, icon: Speech },
];

//what appear when manger or security open displaced pages
// export const guestDelegateNavLinks = [
//     { label: 'الملف الشخصي', href: DELEGATE_ROUTES.PROFILE, icon: User },
//     { label: 'الإشعارات', href: DELEGATE_ROUTES.NOTIFICATIONS, icon: BellRing },
//     { label: 'بيانات النازحين', href: DELEGATE_ROUTES.ALL_DISPLACED, icon: Users },
//     {
//         label: 'إدارة المساعدات',
//         href: DELEGATE_ROUTES.AIDS_MANAGEMENT,
//         icon: Handshake,
//     },
//     { label: 'التقارير', href: DELEGATE_ROUTES.REPORTS, icon: FileChartLine },
//     { label: 'الإعلانات', href: DELEGATE_ROUTES.ADS, icon: Newspaper },
//     { label: 'الشكاوي', href: DELEGATE_ROUTES.COMPLAINTS, icon: Speech },

// ];

