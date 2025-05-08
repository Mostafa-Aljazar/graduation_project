import { DELEGATE_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { BellRing, Newspaper, Speech, Handshake, User, Users, FileChartLine } from 'lucide-react';


//what appear to delegate 
export const delegate_NavLinks = (delegate_Id: number | string) => {

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

//what appear when manger or security officer open Delegate pages
export const guest_Delegate_NavLinks = (delegate_Id: number | string) => {
    const delegateRoutes = DELEGATE_ROUTES_fUNC(delegate_Id as number);

    return [
        { label: 'الملف الشخصي', href: delegateRoutes.PROFILE, icon: User },
        {
            label: 'إدارة المساعدات',
            href: delegateRoutes.AIDS_MANAGEMENT,
            icon: Handshake,
        },
        { label: 'التقارير', href: delegateRoutes.REPORTS, icon: FileChartLine },
        { label: 'الشكاوي', href: delegateRoutes.COMPLAINTS, icon: Speech },
    ] as const;
};

//what appear when displaced open Delegate pages
export const displaced_As_Guest_Delegate_NavLinks = (delegate_Id: number | string) => {
    const delegateRoutes = DELEGATE_ROUTES_fUNC(delegate_Id as number);

    return [
        { label: 'الملف الشخصي', href: delegateRoutes.PROFILE, icon: User },
        { label: 'الشكاوي', href: delegateRoutes.COMPLAINTS, icon: Speech },

    ] as const;
};

//what appear when another delegate open Delegate pages as guest
export const security_OR_delegate_As_Guest_Delegate_NavLinks = (delegate_Id: number | string) => {
    const delegateRoutes = DELEGATE_ROUTES_fUNC(delegate_Id as number);

    return [
        { label: 'الملف الشخصي', href: delegateRoutes.PROFILE, icon: User },

    ] as const;
};
