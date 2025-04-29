export const ROUTES = {
  HOME: '/',
  ABOUT_US: '/#about-us',
  OUR_SERVICES: '/#our-service',
  CONTACT_US: '/#contact-us',
  BLOG: '/blog',
  SUCCESS_STORY: '/success-story',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  FORGET_PASSWORD: '/auth/forget-password',
  OTP: '/auth/otp',
  CREATE_NEW_PASSWORD: '/auth/create-new-password',
} as const;

export const ACTOR_ROUTES = {
  ACTOR: '/actor',
  DELEGATE: '/actor/delegate',
  DISPLACED: '/actor/displaced',
  MANAGER: '/actor/manager',
  SECURITY: '/actor/security',
} as const;
