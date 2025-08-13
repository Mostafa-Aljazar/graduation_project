export const USER_TYPE = {
    DISPLACED: 'DISPLACED',
    DELEGATE: 'DELEGATE',
    MANAGER: 'MANAGER',
    SECURITY: 'SECURITY',
} as const;

export type UserType = keyof typeof USER_TYPE;

export const USER_RANK = {
    ...USER_TYPE,
    SECURITY_OFFICER: 'SECURITY_OFFICER',
} as const;

export type UserRank = keyof typeof USER_RANK;

export const USER_RANK_LABELS: Record<(typeof USER_RANK)[UserRank], string> = {
    [USER_RANK.DISPLACED]: 'نازح',
    [USER_RANK.DELEGATE]: 'مندوب',
    [USER_RANK.MANAGER]: 'مدير',
    [USER_RANK.SECURITY]: 'أمن',
    [USER_RANK.SECURITY_OFFICER]: 'مسؤول الأمن',
};

