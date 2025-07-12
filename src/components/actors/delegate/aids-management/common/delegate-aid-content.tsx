import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { Stack, Divider } from '@mantine/core';
import Delegate_Aid_Info from './delegate-aid-info';
import Delegate_Aid_Delivery_Displaced from '../aid/delivery-displaceds/delegate-aid-delivery-displaceds';
import { DESTINATION_AID } from './delegate-aid-page';
import {
  DISTRIBUTION_MECHANISM,
  TYPE_GROUP_AIDS,
} from '@/content/actor/manager/aids-management';
import Delegate_Aid_Add_Displaceds from '../add/aid-add-displaceds/aid-add-displaceds';

interface DelegateAidContentProps {
  aid_Data: Aid;
  destination: DESTINATION_AID;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
    | typeof USER_TYPE.SECURITY_OFFICER
  >;
}

export default function Delegate_Aid_Content({
  aid_Data,
  destination,
  actor_Id,
  role,
}: DelegateAidContentProps) {
  if (!aid_Data) {
    return <>NO aid_Data</>;
  }

  return (
    <Stack>
      {aid_Data && <Delegate_Aid_Info aid_Data={aid_Data} />}

      <Divider h={1} className='!bg-primary' />

      {aid_Data &&
        (aid_Data.aid_status == TYPE_GROUP_AIDS.COMING_AIDS &&
        aid_Data.distribution_mechanism ==
          DISTRIBUTION_MECHANISM.delegates_lists ? (
          <Delegate_Aid_Add_Displaceds
            aid_Data={aid_Data}
            actor_Id={actor_Id}
            role={role}
          />
        ) : (
          <Delegate_Aid_Delivery_Displaced
            actor_Id={actor_Id}
            aid_Data={aid_Data}
            role={role}
            destination={destination}
          />
        ))}
    </Stack>
  );
}
