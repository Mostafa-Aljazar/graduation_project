
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

export const MANAGER_ROUTES = {
  PROFILE: '/actor/manager',
  REPORTS: '/actor/manager/reports',

  // ADVERTISEMENTS_BLOGS
  ADVERTISEMENTS_BLOGS: '/actor/manager/advertisements-blogs',
  ADD_ADVERTISEMENTS_BLOGS: '/actor/manager/advertisements-blogs/add',
  // AIDS_MANAGEMENT
  AIDS_MANAGEMENT: '/actor/manager/aids-management',
  ADD_AID: '/actor/manager/aid-management/add',
  AID: '/actor/manager/aid-management/[aid_Id]',
  COMPLAINTS: '/actor/manager/complaints',
  // DELEGATES
  ALL_DELEGATE: '/actor/manager/delegates',
  DELEGATE_PROFILE: '/actor/manager/delegates/[delegate_Id]',
  DELEGATE_AIDS: '/actor/manager/delegates/[delegate_Id]/aids',
  DELEGATE_COMPLAINTS: '/actor/manager/delegates/[delegate_Id]/complaints',
  DELEGATE_DISPLACED: '/actor/manager/delegates/[delegate_Id]/displaced',
  DELEGATE_REPORTS: '/actor/manager/delegates/[delegate_Id]/reports',
  // DISPLACED
  ALL_DISPLACED: '/actor/manager/displaced',
  DISPLACED_PROFILE: '/actor/manager/displaced/[displaced_Id]',
  DISPLACED_RECEIVED_AIDS:
    '/actor/manager/displaced/[displaced_Id]/received-aids',
  DISPLACED_COMPLAINTS: '/actor/manager/displaced/[displaced_Id]/complaints',
  //TODO: ADD SECURITY ROUTES
  ALL_SECURITY: '/actor/manager/security',
  // SECURITY_AIDS: '/actor/manager/security/[security_Id]/aids',
  // SECURITY_COMPLAINTS: '/actor/manager/security/[security_Id]/complaints',
} as const;
