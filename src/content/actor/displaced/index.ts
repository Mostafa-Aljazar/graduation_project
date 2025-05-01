import { BellRing, Newspaper, Speech, Handshake, User } from 'lucide-react';
import { DISPLACED_ROUTES } from "../../../constants/routes";


export const displacedNavLinks = [
    { label: 'الملف الشخصي', href: DISPLACED_ROUTES.PROFILE, icon: User },
    { label: 'الإشعارات', href: DISPLACED_ROUTES.NOTIFICATIONS, icon: BellRing },
    { label: 'الإعلانات', href: DISPLACED_ROUTES.ADS, icon: Newspaper },
    { label: 'الإعانات المستلمة', href: DISPLACED_ROUTES.RECEIVED_AIDS, icon: Handshake },
    { label: 'الشكاوي', href: DISPLACED_ROUTES.COMPLAINTS, icon: Speech },
];

