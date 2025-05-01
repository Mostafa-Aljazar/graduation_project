
export const LANDING_ROUTES = {
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

export const DISPLACED_ROUTES = {
  PROFILE: '/actor/displaced',
  ADS: '/actor/displaced/ads',
  COMPLAINTS: '/actor/displaced/complaints',
  NOTIFICATIONS: '/actor/displaced/notifications',
  RECEIVED_AIDS: '/actor/displaced/received-aids',
} as const;

export const DELEGATE_ROUTES = {
  // GENERAL
  PROFILE: '/actor/delegate',
  ADS: '/actor/delegate/ads',
  COMPLAINTS: '/actor/delegate/complaints',
  NOTIFICATIONS: '/actor/delegate/notifications',
  REPORTS: '/actor/delegate/reports',

  // AIDS_MANAGEMENT
  AIDS_MANAGEMENT: '/actor/delegate/aids-management',
  ADD_AID: '/actor/delegate/aid-management/add',
  AID: '/actor/delegate/aid-management/[aid_Id]',

  // DISPLACED
  ALL_DISPLACED: '/actor/delegate/displaced',
  DISPLACED_PROFILE: '/actor/delegate/displaced/[displaced_Id]',
  DISPLACED_RECEIVED_AIDS:
    '/actor/delegate/displaced/[displaced_Id]/received-aids',
  DISPLACED_COMPLAINTS: '/actor/delegate/displaced/[displaced_Id]/complaints',

} as const;;

export const SECURITY_ROUTES = {
  // GENERAL
  PROFILE: '/actor/security',
  SECURITY_DATA: '/actor/security/security-data',
  ADS: '/actor/security/ads',
  COMPLAINTS: '/actor/security/complaints',
  NOTIFICATIONS: '/actor/security/notifications',
  TASKS: '/actor/security/tasks',

  // DISPLACED
  ALL_DISPLACED: '/actor/delegate/displaced',
  DISPLACED_PROFILE: '/actor/delegate/displaced/[displaced_Id]',
  DISPLACED_COMPLAINTS: '/actor/delegate/displaced/[displaced_Id]/complaints',

  // DELEGATES
  ALL_DELEGATE: '/actor/delegate/delegates',
  DELEGATE_PROFILE: '/actor/delegate/delegates/[delegate_Id]',
  DELEGATE_COMPLAINTS: '/actor/delegate/delegates/[displaced_Id]/complaints',
} as const;;

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

  // SECURITY 
  ALL_SECURITY: '/actor/manager/security',
  SECURITY_PROFILE: '/actor/manager/security/[security_Id]',
  SECURITY_TASKS: '/actor/manager/security/tasks',
} as const;
