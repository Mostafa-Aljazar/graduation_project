export interface delegatesResponse {
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
    id: string | number;
    name: string;
    identity: string;
    displaced_number: number;
    family_number: number;
    mobile_number: string;
    tents_number: number;
}