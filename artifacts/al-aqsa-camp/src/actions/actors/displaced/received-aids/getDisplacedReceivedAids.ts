
import { fakeDisplacedReceivedAidsResponse } from '@/content/actor/displaced/fake-data/fake-displaced-received-aids';
import { DisplacedReceivedAidsResponse } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/@types/actors/common-types/index.type';

export interface GetDisplacedReceivedAidsProps {
    displaced_Id: number;
    page?: number;
    limit?: number;
    tab_type?: DISPLACED_RECEIVED_AIDS_TABS;
}

export async function getDisplacedReceivedAids({
    displaced_Id,
    page = 1,
    limit = 10,
    tab_type,
}: GetDisplacedReceivedAidsProps): Promise<DisplacedReceivedAidsResponse> {
    // Foundation API records receipts but does not expose this legacy
    // per-person history query; this deterministic fallback is non-persistent.
    const fakeResponse = fakeDisplacedReceivedAidsResponse({ displaced_Id, page, limit, tab_type })

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));
}
