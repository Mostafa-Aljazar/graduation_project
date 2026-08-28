
import { DisplacedProfile, DisplacedProfileResponse } from "@/@types/actors/displaced/profile/displacedProfileResponse.type";
import { AqsaAPI } from "@/services";
import { DisplacedProfileSchemaType } from "@/validation/actor/displaceds/profile/displaced-profile-schema";

export interface AddNewDisplacedProps {
    payload: DisplacedProfileSchemaType;
}

export const addNewDisplaced = async ({
    payload,
}: AddNewDisplacedProps): Promise<DisplacedProfileResponse> => {

    try {
        const response = await AqsaAPI.post("/displaced-persons", {
            name: payload.name, phone: payload.phone_number, nationalId: payload.identity,
            familySize: payload.social_status.total_family_members, location: payload.original_address,
        });
        if (response.data?.id !== undefined) {
            return { status: response.status, message: "تم إضافة النازح الجديد بنجاح", user: { ...payload, id: response.data.id } as DisplacedProfile };
        }

        throw new Error("فشل في إضافة النازح الجديد");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة النازح الجديد";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DisplacedProfile,
            error: errorMessage,
        };
    }
};