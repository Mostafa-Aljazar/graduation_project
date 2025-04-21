import { ROUTES } from '../routes';

export const NAVBAR_LINKS = [
    {
        key: 'HOME',
        label: 'الرئيسية',
        link: ROUTES.HOME,
    },
    {
        key: 'ABOUT_US',
        label: 'من نحن',
        link: ROUTES.ABOUT_US,
    },
    {
        key: 'OUR_SERVICES',
        label: 'خدماتنا',
        link: ROUTES.OUR_SERVICES,
    },
    {
        key: 'BLOG',
        label: 'المدونة',
        link: ROUTES.BLOG,
    },
    {
        key: 'CONTACT_US',
        label: 'تواصل معنا',
        link: ROUTES.CONTACT_US,
    },
] as const;