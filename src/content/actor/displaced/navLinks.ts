import { DISPLACED_ROUTES_fUNC, GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { BellRing, Newspaper, Handshake, User, MessageCircleWarning } from 'lucide-react';

//what appear to displaced 
export const displaced_NavLinks = (displaced_Id: number) => {

    const displacedRoutes = DISPLACED_ROUTES_fUNC(displaced_Id as number);

    return [
        { label: 'الملف الشخصي', href: displacedRoutes.PROFILE, icon: User },
        { label: 'الإشعارات', href: GENERAL_ACTOR_ROUTES.NOTIFICATIONS, icon: BellRing },
        { label: 'الإعلانات', href: GENERAL_ACTOR_ROUTES.ADS, icon: Newspaper },
        { label: 'المساعدات المستلمة', href: displacedRoutes.RECEIVED_AIDS, icon: Handshake },
        { label: 'الشكاوي', href: displacedRoutes.COMPLAINTS, icon: MessageCircleWarning },
    ] as const;
};

//what appear when manger or delegate or security open displaced pages
export const guest_Displaced_NavLinks = (displaced_Id: number) => {

    const displacedRoutes = DISPLACED_ROUTES_fUNC(displaced_Id);

    return [
        { label: 'الملف الشخصي', href: displacedRoutes.PROFILE, icon: User },
        { label: 'الإعانات المستلمة', href: displacedRoutes.RECEIVED_AIDS, icon: Handshake },
        { label: 'الشكاوي', href: displacedRoutes.COMPLAINTS, icon: MessageCircleWarning },
    ] as const;
};