export interface DisplacedsIDsResponse {
    status: string;
    message?: string;
    displacedsIDs: number[];
    error?: string;
}

export interface DisplacedsResponse {
    status: string;
    message?: string;
    displaceds: Displaced[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface Displaced {
    id: number;
    name: string;
    identity: string;
    tent: string;
    family_number: number;
    mobile_number: string;
    delegate: HisDelegate;
}

export interface HisDelegate {
    id: number;
    name: string;
}