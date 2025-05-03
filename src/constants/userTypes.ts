export const USER_TYPE = {
    DISPLACED: 'DISPLACED',
    DELEGATE: 'DELEGATE',
    MANAGER: 'MANAGER',
    SECURITY: 'SECURITY',
    SECURITY_OFFICER: 'SECURITY_OFFICER'
} as const;

export type UserType = keyof typeof USER_TYPE;
