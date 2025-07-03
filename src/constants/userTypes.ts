export const USER_TYPE = {
    DISPLACED: 'DISPLACED',
    DELEGATE: 'DELEGATE',
    MANAGER: 'MANAGER',
    SECURITY: 'SECURITY',
    SECURITY_OFFICER: 'SECURITY_OFFICER'
} as const;

export type UserType = keyof typeof USER_TYPE;


export const USER_TYPE_LABELS: Record<(typeof USER_TYPE)[UserType], string> = {
    [USER_TYPE.DISPLACED]: 'نازح',
    [USER_TYPE.DELEGATE]: 'مندوب',
    [USER_TYPE.MANAGER]: 'مدير',
    [USER_TYPE.SECURITY]: 'أمن',
    [USER_TYPE.SECURITY_OFFICER]: 'مسئول الأمن',
};