import { ShieldUser, Database, Newspaper, Speech, Handshake, User, Users, FileChartLine } from 'lucide-react';

import { GENERAL_ACTOR_ROUTES, MANAGER_ROUTES_fUNC } from "../../../constants/routes";


//what appear to manager 
export const managerNavLinks = () => {

    const managerRoutes = MANAGER_ROUTES_fUNC();

    return [
        { label: 'الملف الشخصي', href: managerRoutes.PROFILE, icon: User },
        { label: 'بيانات النازحين', href: GENERAL_ACTOR_ROUTES.DISPLACEDS, icon: Users },
        {
            label: 'بيانات المناديب',
            href: GENERAL_ACTOR_ROUTES.DELEGATES,
            icon: Database,
        },
        {
            label: 'بيانات الأمن',
            href: GENERAL_ACTOR_ROUTES.SECURITIES,
            icon: ShieldUser,
        },
        {
            label: 'إدارة المساعدات',
            href: managerRoutes.AIDS_MANAGEMENT,
            icon: Handshake,
        },
        { label: 'الشكاوي', href: managerRoutes.COMPLAINTS, icon: Speech },
        { label: 'التقارير', href: managerRoutes.REPORTS, icon: FileChartLine },
        { label: 'الإعلانات و المدونات', href: managerRoutes.ADS_BLOGS, icon: Newspaper },
    ] as const;
};
