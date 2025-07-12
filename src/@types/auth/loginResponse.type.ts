import { UserType, UserRank } from '@/constants/userTypes';
import { StaticImageData } from 'next/image';

export interface User {
    id: number;
    name: string;
    email: string;
    identity: number;
    phone_number: string;
    created_at: Date;
    updated_at?: Date;
    image?: string | StaticImageData | null;
    role: UserType; // used for auth-based routing
    rank?: UserRank; // used for permission/access levels
}

export interface loginResponse {
    status: number;
    message?: string;
    token: string;
    user: User;
    error?: string;
}
