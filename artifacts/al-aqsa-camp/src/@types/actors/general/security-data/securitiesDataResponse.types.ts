export interface Security {
    id: number;
    name: string;
    mobile_number: string;
    identity: string;
    job: "SECURITY" | "SECURITY_OFFICER"
    role: "SECURITY"
}

export interface SecuritiesResponse {
    status: number;
    message?: string;
    securities: Security[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        total_items: number;
        total_pages: number;
    };
}


export interface SecurityNamesResponse {
    status: number;
    message: string;
    security_names: {
        id: number;
        name: string
    }[];
    error?: string;
}


export interface SecurityIDsResponse {
    status: number;
    message: string;
    security_Ids: number[];
    error?: string;
}
