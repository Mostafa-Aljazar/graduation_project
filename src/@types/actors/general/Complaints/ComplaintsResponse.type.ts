import { UserType } from "@/constants/userTypes";


export interface Complaint {
    id: number;
    date: string;
    time: string;
    from: string;
    sender_type: UserType;
    delegate_id?: string; // Optional, only for DELEGATE
    title: string;
    body: string;
    status: 'read' | 'pending';
}


export interface ComplaintsResponse {
    status: string;
    message?: string;
    complaints: Complaint[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    error?: string;
}