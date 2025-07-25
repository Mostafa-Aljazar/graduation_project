
export const LANDING_ROUTES = {
  HOME: '/',
  ABOUT_US: '/#about-us',
  OUR_SERVICES: '/#our-service',
  CONTACT_US: '/#contact-us',
  // CONTACT_US: '#contact-us',
  BLOG: '/blog',
  SUCCESS_STORY: '/success-stories',
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  FORGET_PASSWORD: '/auth/forget-password',
  OTP: '/auth/otp',
  CREATE_NEW_PASSWORD: '/auth/create-new-password',
} as const;

export const GENERAL_ACTOR_ROUTES = {
  // GENERAL
  ADS: '/actor/ads',
  DELEGATES: '/actor/delegates',
  ADD_DELEGATES: '/actor/delegates/add',
  DISPLACEDS: '/actor/displaceds',
  ADD_DISPLACEDS: '/actor/displaceds/add',
  SECURITIES: '/actor/security-data',
  ADD_SECURITIES: '/actor/security/add',
  NOTIFICATIONS: '/actor/notifications',

} as const;

export const DISPLACED_ROUTES_fUNC = (
  displaced_Id: number
) => {
  return {
    PROFILE: `/actor/displaceds/${displaced_Id}/profile`,
    COMPLAINTS: `/actor/displaceds/${displaced_Id}/complaints`,
    RECEIVED_AIDS: `/actor/displaceds/${displaced_Id}/received-aids`,
  } as const;
};

export const DELEGATE_ROUTES_fUNC = (
  delegate_Id: number,
  aid_Id?: number
) => {
  return {
    PROFILE: `/actor/delegates/${delegate_Id}/profile`,
    COMPLAINTS: `/actor/delegates/${delegate_Id}/complaints`,
    REPORTS: `/actor/delegates/${delegate_Id}/reports`,

    // AIDS_MANAGEMENT
    AIDS_MANAGEMENT: `/actor/delegates/${delegate_Id}/aids-management`,
    ADD_AID_DISPLACEDS: `/actor/delegates/${delegate_Id}/aids-management/${aid_Id}/add-displaceds`,
    AID: `/actor/delegates/${delegate_Id}/aids-management/${aid_Id}`,
  } as const;
};


export const MANAGER_ROUTES_fUNC = (
  manager_Id: number,
  aid_Id?: number
) => {
  return {

    PROFILE: `/actor/manager/${manager_Id}/profile`,
    REPORTS: `/actor/manager/${manager_Id}/reports`,
    COMPLAINTS: `/actor/manager/${manager_Id}/complaints`,

    // ADS_BLOGS
    ADS_BLOGS: `/actor/manager/${manager_Id}/ads-blogs`,
    ADD_ADS_BLOGS: `/actor/manager/${manager_Id}/ads-blogs/add`,


    // AIDS_MANAGEMENT
    AIDS_MANAGEMENT: `/actor/manager/${manager_Id}/aids-management`,
    ADD_AID: `/actor/manager/${manager_Id}/aids-management/add`,
    AID: `/actor/manager/${manager_Id}/aids-management/${aid_Id}`,

  } as const;
};

export const SECURITY_ROUTES_fUNC = (
  security_Id: number,
) => {
  return {
    PROFILE: `/actor/security/${security_Id}/profile`,
    COMPLAINTS: `/actor/security/${security_Id}/complaints`,
    TASKS: `/actor/security/${security_Id}/tasks`,
  } as const;
};