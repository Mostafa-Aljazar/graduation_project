
import { ListTodo, User, Users, ShieldUser, Database, BellRing, Speech, Newspaper } from "lucide-react";
import { SECURITY_ROUTES } from "../../../constants/routes";


export const securityNavLinks = [
    { label: 'الملف الشخصي', href: SECURITY_ROUTES.PROFILE, icon: User },
    { label: 'الإشعارات', href: SECURITY_ROUTES.NOTIFICATIONS, icon: BellRing },
    {
        label: 'بيانات الأمن',
        href: SECURITY_ROUTES.SECURITY_DATA,
        icon: ShieldUser,
    },
    { label: 'المهام', href: SECURITY_ROUTES.PROFILE, icon: ListTodo },
    {
        label: 'بيانات النازحين',
        href: SECURITY_ROUTES.ALL_DISPLACED,
        icon: Users,
    },
    {
        label: 'بيانات المناديب',
        href: SECURITY_ROUTES.ALL_DELEGATE,
        icon: Database,
    },
    { label: 'الشكاوي', href: SECURITY_ROUTES.COMPLAINTS, icon: Speech },
    { label: 'الإعلانات', href: SECURITY_ROUTES.ADS, icon: Newspaper },
];

