
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface changeDelegateProps {
    displaced_Ids: number[];
    delegateId: number;
}

export const changeDelegate = async ({
    displaced_Ids,
    delegateId,
}: changeDelegateProps): Promise<commonActionResponse> => {
    try {
        await Promise.all(displaced_Ids.map((id) => AqsaAPI.patch(`/displaced-persons/${id}/delegate`, { delegateId })));

        return {
            status: 200,
            message: `تم تغيبر المندوب لـ ${displaced_Ids.length} نازح بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إنشاء الاستدعاء";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};