import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { Stack, Divider, LoadingOverlay } from '@mantine/core';
import Delegate_Aid_Info from './delegate-aid-info';
import Delegate_Aid_Add_Displaceds from '../add/aid-add-displaceds/aid-add-displaceds';
import {
  DELEGATE_DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  TYPE_GROUP_AIDS,
} from '@/@types/actors/common-types/index.type';
import Delegate_Aid_Delivery_Displaceds from '../aid/delivery-displaceds/delegate-aid-delivery-displaceds';

interface DelegateAidContentProps {
  isLoading: boolean;
  aid_Data: Aid;
  destination: DELEGATE_DESTINATION_AID;
  delegate_Id: number;
}

export default function Delegate_Aid_Content({
  aid_Data,
  destination,
  delegate_Id,
  isLoading,
}: DelegateAidContentProps) {
  return (
    <Stack pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      {aid_Data && <Delegate_Aid_Info aid_Data={aid_Data} />}
      <Divider h={1} className='!bg-primary' />

      {aid_Data && destination == DELEGATE_DESTINATION_AID.DELIVERY_AID && (
        <Delegate_Aid_Delivery_Displaceds
          aid_Data={aid_Data}
          delegate_Id={delegate_Id}
        />
      )}

      {aid_Data &&
        aid_Data.aid_status == TYPE_GROUP_AIDS.COMING_AIDS &&
        aid_Data.distribution_mechanism ==
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
          <Delegate_Aid_Add_Displaceds
            aid_Data={aid_Data}
            delegate_Id={delegate_Id}
          />
        )}
    </Stack>
  );
}
