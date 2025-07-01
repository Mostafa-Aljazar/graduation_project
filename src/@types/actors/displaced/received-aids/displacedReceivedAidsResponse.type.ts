import { DISPLACED_RECEIVED_AIDS_TABS } from "@/content/actor/displaced/received-aid";
import { TYPE_AIDS } from "@/content/actor/manager/aids-management";

export interface DisplacedReceivedAidsResponse {
    status: string;
    message?: string;
    error?: string;
    receivedAids: DisplacedReceivedAid[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface DisplacedReceivedAid {
    id: number;
    tabType: DISPLACED_RECEIVED_AIDS_TABS; // NEW: يحدد هل Received أو Provided

    aidName: string;
    aidType: TYPE_AIDS;
    aidContent: string;
    deliveryLocation: string;

    deliveryDate: Date; // تاريخ التسليم في كل الحالات
    receiptDate?: Date; // تاريخ الاستلام فقط إذا كان RECEIVED_AIDS

    aidGiver: {
        giverId: number;
        name: string;
        role: 'DELEGATE' | 'MANAGER';
    };
}
