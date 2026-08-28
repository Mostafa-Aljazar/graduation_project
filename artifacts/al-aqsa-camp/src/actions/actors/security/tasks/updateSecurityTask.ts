
import { TASKS_TABS } from "@/@types/actors/common-types/index.type";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface updateSecurityTaskProps {
    task_Id: number;
    security_Id: number;
    dateTime: Date;
    title: string;
    body: string;
    security_men: number[];
    type: TASKS_TABS;
}

export const updateSecurityTask = async ({
    task_Id,
    security_Id,
    dateTime,
    title,
    body,
    security_men,
    type,
}: updateSecurityTaskProps): Promise<commonActionResponse> => {
    try {
        const response = await AqsaAPI.patch(`/security-tasks/${task_Id}`, {
            title,
            description: body,
            assignedToId: security_men[0] ?? security_Id,
            dueAt: dateTime.toISOString(),
        });

        if (response.status === 200) {
            return {
                status: 200,
                message: `تم تعديل المهمة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء تعديل المهمة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تعديل المهمة";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
