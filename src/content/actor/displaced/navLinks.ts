import { BellRing, Newspaper, Speech, Handshake, User } from 'lucide-react';
import { DISPLACED_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from "../../../constants/routes";

//what appear to displaced 
export const displacedNavLinks = (displaced_Id: number | string) => {

    const displacedRoutes = DISPLACED_ROUTES_fUNC(displaced_Id as number);

    return [
        { label: 'الملف الشخصي', href: displacedRoutes.PROFILE, icon: User },
        { label: 'الإشعارات', href: GENERAL_ACTOR_ROUTES.NOTIFICATIONS, icon: BellRing },
        { label: 'الإعلانات', href: GENERAL_ACTOR_ROUTES.ADS, icon: Newspaper },
        { label: 'الإعانات المستلمة', href: displacedRoutes.RECEIVED_AIDS, icon: Handshake },
        { label: 'الشكاوي', href: displacedRoutes.COMPLAINTS, icon: Speech },
    ] as const;
};

//what appear when manger or delegate or security open displaced pages
export const guestDisplacedNavLinks = (displaced_Id: number | string) => {

    const displacedRoutes = DISPLACED_ROUTES_fUNC(displaced_Id as number);

    return [
        { label: 'الملف الشخصي', href: displacedRoutes.PROFILE, icon: User },
        { label: 'الإعانات المستلمة', href: displacedRoutes.RECEIVED_AIDS, icon: Handshake },
        { label: 'الشكاوي', href: displacedRoutes.COMPLAINTS, icon: Speech },
    ] as const;
};