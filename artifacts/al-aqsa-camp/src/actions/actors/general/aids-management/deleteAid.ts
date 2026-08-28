
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";

export interface deleteAidProps {
    aid_Id: number;
    manager_Id: number;
}

export const deleteAid = async ({
    aid_Id,
    manager_Id
}: deleteAidProps): Promise<commonActionResponse> => {
    // Foundation API has no delete endpoint; this deterministic legacy fallback
    // is intentionally non-persistent.
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم حذف المساعدة بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

};