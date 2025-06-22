import { DELEGATE_PORTIONS, DISTRIBUTION_MECHANISM, DISTRIBUTION_METHOD, QUANTITY_AVAILABILITY, TYPE_AIDS } from "@/content/actor/manager/aids-management";

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
    delegate_id: number;
    portion: number;
}



// Interface for AddAidForm
export interface AddAidFormValues {
    aidName: string;
    aidType: TYPE_AIDS;
    aidContent: string;
    deliveryDate: Date | null;
    deliveryLocation: string;
    securityRequired: boolean;
    quantityAvailability: QUANTITY_AVAILABILITY;
    existingQuantity: number;
    singlePortion: number;
    distributionMethod: DISTRIBUTION_METHOD;
    selectedCategories: CategoryRangeType[];
    distributionMechanism: DISTRIBUTION_MECHANISM;
    delegatesPortions: DELEGATE_PORTIONS;
    delegateSinglePortion: number;
    aidAccessories: string;
}


export interface Aid extends AddAidFormValues {
    id: number;
    selectedDisplacedIds: number[];
    selectedDelegatesPortions: SelectedDelegatePortion[];
    receivedDisplaced: {
        displaced_ID: number;
        receivedTime: Date;
    }[]
    security_men?: number[];
    isCompleted: boolean;
}


export interface AidResponse {
    status: string;
    message?: string;
    aid: Aid;
    error?: string;
}

// Define AidsResponse interface
export interface AidsResponse {
    status: string;
    message?: string;
    aids: Aid[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

