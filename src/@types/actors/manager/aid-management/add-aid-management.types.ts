import {
    DELEGATE_PORTIONS,
    DISTRIBUTION_MECHANISM,
    DISTRIBUTION_METHOD,
    QUANTITY_AVAILABILITY,
    TYPE_AIDS,
    TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';

// category_range_type
export interface CategoryRangeType {
    id: string;
    label: string;
    min: number;
    max: number | null;
    is_default?: boolean;
    portion?: number;
}

export interface SelectedDelegatePortion {
    delegate_id: number;
    portion: number;
}

// add_aid_form_values
export interface AddAidFormValues {
    aid_name: string;
    aid_type: TYPE_AIDS;
    aid_content: string;
    delivery_date: Date | null;
    delivery_location: string;
    security_required: boolean;
    quantity_availability: QUANTITY_AVAILABILITY;
    existing_quantity: number;
    single_portion: number;
    distribution_method: DISTRIBUTION_METHOD;
    selected_categories: CategoryRangeType[];
    distribution_mechanism: DISTRIBUTION_MECHANISM;
    delegates_portions: DELEGATE_PORTIONS;
    delegate_single_portion: number;
    aid_accessories: string;
}

// aid
export interface Aid extends AddAidFormValues {
    id: number;
    selected_displaced_ids: number[];
    selected_delegates_portions: SelectedDelegatePortion[];
    received_displaced: {
        displaced_id: number;
        received_time: Date;
    }[];
    security_men?: number[];
    is_completed: boolean;
    aid_status: TYPE_GROUP_AIDS;
}

// aid_response
export interface AidResponse {
    status: string;
    message?: string;
    aid: Aid;
    error?: string;
}

// aids_response
export interface AidsResponse {
    status: string;
    message?: string;
    aids: Aid[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        total_items: number;
        total_pages: number;
    };
}
