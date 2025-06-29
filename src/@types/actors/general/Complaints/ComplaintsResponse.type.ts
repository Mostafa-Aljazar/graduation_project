import { UserType } from "@/constants/userTypes";
import { COMPLAINTS_STATUS } from "@/content/actor/delegate/complaints";


export interface Complaint {
    id: number;
    date: string;
    time: string;
    from: { id: Number, name: string, image: string };
    title: string;
    body: string;
    status: COMPLAINTS_STATUS;
}

export interface ManagerComplaint extends Complaint {
    sender_type: UserType;
    delegate_id?: number; // Optional, only for DELEGATE
}


export interface ManagerComplaintResponse {
    status: string;
    message?: string;
    complaints: ManagerComplaint[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    error?: string;
}

export interface DelegateComplaintResponse {
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