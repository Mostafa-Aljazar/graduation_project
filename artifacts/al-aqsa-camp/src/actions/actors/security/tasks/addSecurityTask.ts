
import { TASKS_TABS } from "@/@types/actors/common-types/index.type";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";


export interface addSecurityTaskProps {
    security_Id: number;
    dateTime: Date;
    title: string;
    body: string;
    security_men: number[]
    type: TASKS_TABS;
}

export const addSecurityTask = async ({
    security_Id,
    dateTime,
    title,
    body,
    security_men,
    type,
}: addSecurityTaskProps): Promise<commonActionResponse> => {

    try {
        const response = await AqsaAPI.post('/security-tasks', {
            title,
            description: body,
            assignedToId: security_men[0] ?? security_Id,
            dueAt: dateTime.toISOString(),
        });

        if (response.status === 201) {
            return {
                status: 201,
                message: `تم اضافة المهمة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء اضافة المهمة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء اضافة المهمة";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};