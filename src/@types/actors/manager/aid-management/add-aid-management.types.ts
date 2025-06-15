import { addAidFormValues } from "@/validation/manager/add-aid-form-schema";

// Category Range Type
export interface CategoryRangeType {
    id: string;
    label: string;
    min: number;
    max: number | null;
    isDefault?: boolean;
    portion?: number;
}

export interface SelectedDelegatePortion {
    delegate_id: string | number;
    portion: number;
}


export interface AddAidPayload extends addAidFormValues {
    selectedDisplacedIds: (string | number)[];
    selectedDelegatesPortions: SelectedDelegatePortion[];
}

