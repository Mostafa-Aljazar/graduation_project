import { GENDER, SOCIAL_STATUS } from "@/@types/actors/common-types/index.type";
import { ManagerProfile, ManagerProfileResponse } from "@/@types/actors/manager/profile/managerProfileResponse.type";
import { USER_TYPE } from "@/constants/userTypes";


export const fakeManagerProfile: ManagerProfile = {
    id: 1,
    email: "mostafa@gmail.com",
    name: 'مصطفى يوسف',
    gender: GENDER.MALE,
    profile_image: 'https://example.com/image.jpg',
    identity: '123456789',
    nationality: 'فلسطيني',
    phone_number: "0599999999",
    alternative_phone_number: "0597777777",
    social_status: SOCIAL_STATUS.MARRIED,
    rank: USER_TYPE.MANAGER,
    role: USER_TYPE.MANAGER,
}






export const fakeManagerProfileResponse = ({ manager_Id }: { manager_Id: number }): ManagerProfileResponse => {

    const managerProfile = fakeManagerProfile

    if (!managerProfile) {
        return {
            status: 404,
            message: 'المدير غير موجود',
            user: {} as ManagerProfile,
            error: 'Manager not found',
        };
    }

    return {
        status: 200,
        message: 'تم جلب بيانات الملف الشخصي بنجاح',
        user: managerProfile,
        error: undefined,
    };
};