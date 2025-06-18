export interface DelegatesIDsResponse {
    status: string;
    message?: string;
    delegatesIDs: number[];
    error?: string;
}

export interface DelegatesResponse {
    status: string;
    message?: string;
    delegates: Delegate[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface Delegate {
    id: number;
    name: string;
    identity: string;
    displaced_number: number;
    family_number: number;
    mobile_number: string;
    tents_number: number;
}