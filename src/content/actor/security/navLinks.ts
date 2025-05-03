import { ListTodo, User, Users, ShieldUser, Database, BellRing, Speech, Newspaper } from "lucide-react";
import { GENERAL_ACTOR_ROUTES, SECURITY_ROUTES_fUNC } from "../../../constants/routes";

//what appear to security 
export const securityNavLinks = (security_Id: number | string) => {

    const securityRoutes = SECURITY_ROUTES_fUNC(security_Id as number);

    return [
        { label: 'الملف الشخصي', href: securityRoutes.PROFILE, icon: User },
        { label: 'الإشعارات', href: GENERAL_ACTOR_ROUTES.NOTIFICATIONS, icon: BellRing },
        {
            label: 'بيانات الأمن',
            href: GENERAL_ACTOR_ROUTES.SECURITIES,
            icon: ShieldUser,
        },
        { label: 'المهام', href: securityRoutes.PROFILE, icon: ListTodo },
        {
            label: 'بيانات النازحين',
            href: GENERAL_ACTOR_ROUTES.DISPLACEDS,
            icon: Users,
        },
        {
            label: 'بيانات المناديب',
            href: GENERAL_ACTOR_ROUTES.DELEGATES,
            icon: Database,
        },
        { label: 'الشكاوي', href: securityRoutes.COMPLAINTS, icon: Speech },
        { label: 'الإعلانات', href: GENERAL_ACTOR_ROUTES.ADS, icon: Newspaper },
    ] as const;
};

//what appear when manger or security officer open security page
export const guestSecurityNavLinks = (security_Id: number | string) => {
    const securityRoutes = SECURITY_ROUTES_fUNC(security_Id as number);

    return [
        { label: 'الملف الشخصي', href: securityRoutes.PROFILE, icon: User }
    ] as const;
};

