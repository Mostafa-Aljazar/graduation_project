import { BellRing, Newspaper, Speech, Handshake, User, Users, FileChartLine } from 'lucide-react';
import { DELEGATE_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from "../../../constants/routes";


//what appear to delegate 
export const delegateNavLinks = (delegate_Id: number | string) => {

    const delegateRoutes = DELEGATE_ROUTES_fUNC(delegate_Id as number);

    return [
        { label: 'الملف الشخصي', href: delegateRoutes.PROFILE, icon: User },
        {
            label: 'الإشعارات',
            href: GENERAL_ACTOR_ROUTES.NOTIFICATIONS,
            icon: BellRing,
        },
        {
            label: 'بيانات النازحين',
            href: GENERAL_ACTOR_ROUTES.DISPLACEDS,
            icon: Users,
        },
        {
            label: 'إدارة المساعدات',
            href: delegateRoutes.AIDS_MANAGEMENT,
            icon: Handshake,
        },
        { label: 'التقارير', href: delegateRoutes.REPORTS, icon: FileChartLine },
        { label: 'الإعلانات', href: GENERAL_ACTOR_ROUTES.ADS, icon: Newspaper },
        { label: 'الشكاوي', href: delegateRoutes.COMPLAINTS, icon: Speech },
    ] as const;
};

//what appear when manger or security open Delegate pages
export const guestDelegateNavLinks = (delegate_Id: number | string) => {
    const delegateRoutes = DELEGATE_ROUTES_fUNC(delegate_Id as number);

    return [
        { label: 'الملف الشخصي', href: delegateRoutes.PROFILE, icon: User },

        {
            label: 'بيانات النازحين',
            href: `${GENERAL_ACTOR_ROUTES.DISPLACEDS}?delegate_Id=${delegate_Id}`,
            icon: Users,
        },
        {
            label: 'إدارة المساعدات',
            href: delegateRoutes.AIDS_MANAGEMENT,
            icon: Handshake,
        },
        { label: 'التقارير', href: delegateRoutes.REPORTS, icon: FileChartLine },
        { label: 'الشكاوي', href: delegateRoutes.COMPLAINTS, icon: Speech },
    ] as const;
};

