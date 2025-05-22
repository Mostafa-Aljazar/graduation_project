export interface displacedResponse {
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
    id: string | number;
    name: string;
    identity: string;
    tent: string;
    family_number: number;
    mobile_number: string;
    delegate: Delegate;
}

export interface Delegate {
    id: string | number;
    name: string;
}