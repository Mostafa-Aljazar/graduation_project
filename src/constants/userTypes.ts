export const USER_TYPE = {
    DISPLACED: 'DISPLACED',
    DELEGATE: 'DELEGATE',
    MANAGER: 'MANAGER',
    SECURITY: 'SECURITY',
} as const;
export type UserType = keyof typeof USER_TYPE;

// Full user ranks (used in roles, access control, etc.)
export const USER_RANK = {
    ...USER_TYPE,
    SECURITY_OFFICER: 'SECURITY_OFFICER',
} as const;
export type UserRank = keyof typeof USER_RANK;

// Arabic labels for all ranks
export const USER_RANK_LABELS: Record<(typeof USER_RANK)[UserRank], string> = {
    [USER_RANK.DISPLACED]: 'نازح',
    [USER_RANK.DELEGATE]: 'مندوب',
    [USER_RANK.MANAGER]: 'مدير',
    [USER_RANK.SECURITY]: 'أمن',
    [USER_RANK.SECURITY_OFFICER]: 'مسؤول الأمن',
};

// // Optional: restrict labels to USER_TYPE only (e.g. for login dropdowns)
// export const USER_TYPE_LABELS: Record<(typeof USER_TYPE)[UserType], string> = {
//     [USER_TYPE.DISPLACED]: USER_RANK_LABELS.DISPLACED,
//     [USER_TYPE.DELEGATE]: USER_RANK_LABELS.DELEGATE,
//     [USER_TYPE.MANAGER]: USER_RANK_LABELS.MANAGER,
//     [USER_TYPE.SECURITY]: USER_RANK_LABELS.SECURITY,
// };
