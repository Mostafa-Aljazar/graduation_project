export const USER_TYPE = {
    DISPLACED: 'DISPLACED',
    DELEGATOR: 'DELEGATOR',
    MANAGER: 'MANAGER',
    SECRETARY: 'SECRETARY',
    SECURITY_OFFICER: 'SECURITY_OFFICER'
} as const;

export type UserType = keyof typeof USER_TYPE;
