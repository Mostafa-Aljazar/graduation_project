// Category Range Type
export interface CategoryRangeType {
    id: string;
    label: string;
    min: number;
    max: number | null;
    isDefault?: boolean;
    portion?: number;
}