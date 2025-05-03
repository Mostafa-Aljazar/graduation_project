import { FileChartLine } from "lucide-react";
import { Newspaper, Speech } from "lucide-react";
import { Handshake } from "lucide-react";
import { ShieldUser, Database } from "lucide-react";
import { Users } from "lucide-react";
import { User } from "lucide-react";
import { MANAGER_ROUTES } from "../../../constants/routes";


export const managerNavLinks = [
    { label: 'الملف الشخصي', href: MANAGER_ROUTES.PROFILE, icon: User },
    { label: 'بيانات النازحين', href: MANAGER_ROUTES.ALL_DISPLACED, icon: Users },
    {
        label: 'بيانات المناديب',
        href: MANAGER_ROUTES.ALL_DELEGATE,
        icon: Database,
    },
    {
        label: 'بيانات الأمن',
        href: MANAGER_ROUTES.ALL_SECURITY,
        icon: ShieldUser,
    },
    {
        label: 'إدارة المساعدات',
        href: MANAGER_ROUTES.AIDS_MANAGEMENT,
        icon: Handshake,
    },
    { label: 'الشكاوي', href: MANAGER_ROUTES.COMPLAINTS, icon: Speech },
    { label: 'التقارير', href: MANAGER_ROUTES.REPORTS, icon: FileChartLine },
    { label: 'الإعلانات و المدونات', href: MANAGER_ROUTES.ADS_BLOGS, icon: Newspaper },
];

// TODO: Add guest nav links
export const managerGuestDisplacedNavLinks = [
    // { label: 'الملف الشخصي', href: MANAGER_ROUTES.PROFILE, icon: User },
    // { label: 'بيانات النازحين', href: MANAGER_ROUTES.ALL_DISPLACED, icon: Users },
    // {
    //     label: 'بيانات المناديب',
    //     href: MANAGER_ROUTES.ALL_DELEGATE,
    //     icon: Database,
    // },
    // {
    //     label: 'بيانات الأمن',
    //     href: MANAGER_ROUTES.ALL_SECURITY,
    //     icon: ShieldUser,
    // },
    // {
    //     label: 'إدارة المساعدات',
    //     href: MANAGER_ROUTES.AIDS_MANAGEMENT,
    //     icon: Handshake,
    // },
    // { label: 'الشكاوي', href: MANAGER_ROUTES.COMPLAINTS, icon: Speech },
    // { label: 'التقارير', href: MANAGER_ROUTES.REPORTS, icon: FileChartLine },
    // { label: 'الإعلانات و المدونات', href: MANAGER_ROUTES.ADS_BLOGS, icon: Newspaper },
];